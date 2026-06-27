import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSupabase, isBackendConfigured } from './supabase';

const ANON_ID_KEY = '@telemetry/anon_id_v1';
const MAX_BUFFER = 50;
const FLUSH_AT = 20;
const FLUSH_INTERVAL_MS = 15000;

export type TelemetryLevel = 'info' | 'warning' | 'error';

export interface TelemetryEvent {
  name: string;
  level: TelemetryLevel;
  props?: Record<string, unknown>;
  ts: string;
}

interface TelemetryConfig {
  appVersion: string;
  platform: string;
  remote: boolean;
}

const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

let anonId: string | null = null;
let buffer: TelemetryEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let initialized = false;
let remoteAvailable = true;
let config: TelemetryConfig = { appVersion: 'unknown', platform: 'unknown', remote: true };

function generateAnonId(): string {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function loadAnonId(): Promise<string> {
  if (anonId) return anonId;
  try {
    const stored = await AsyncStorage.getItem(ANON_ID_KEY);
    if (stored) {
      anonId = stored;
      return stored;
    }
  } catch {
    // ignore storage read failures; fall through to a fresh id
  }
  const fresh = generateAnonId();
  anonId = fresh;
  try {
    await AsyncStorage.setItem(ANON_ID_KEY, fresh);
  } catch {
    // ignore storage write failures; id stays in-memory for the session
  }
  return fresh;
}

function sanitizeProps(props?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!props) return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'string') out[key] = value.slice(0, 1000);
    else if (typeof value === 'number' || typeof value === 'boolean') out[key] = value;
    else out[key] = String(value).slice(0, 1000);
  }
  return out;
}

export function initTelemetry(options?: Partial<TelemetryConfig>): void {
  if (initialized) return;
  initialized = true;
  config = {
    appVersion: options?.appVersion ?? config.appVersion,
    platform: options?.platform ?? config.platform,
    remote: options?.remote ?? true,
  };

  void loadAnonId();
  installGlobalHandlers();

  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(() => {
    void flush();
  }, FLUSH_INTERVAL_MS);
}

export function trackEvent(
  name: string,
  props?: Record<string, unknown>,
  level: TelemetryLevel = 'info',
): void {
  enqueue({ name, level, props: sanitizeProps(props), ts: new Date().toISOString() });
}

export function captureError(error: unknown, context?: Record<string, unknown>): void {
  const err = error instanceof Error ? error : new Error(String(error));
  enqueue({
    name: 'app_error',
    level: 'error',
    props: sanitizeProps({ message: err.message, stack: err.stack, ...context }),
    ts: new Date().toISOString(),
  });
  void flush();
}

function enqueue(event: TelemetryEvent): void {
  if (isDev) {
    const logger = event.level === 'error' ? console.error : console.log;
    logger(`[telemetry] ${event.name}`, event.props ?? {});
  }
  buffer.push(event);
  if (buffer.length > MAX_BUFFER) buffer = buffer.slice(-MAX_BUFFER);
  if (buffer.length >= FLUSH_AT) void flush();
}

export async function flush(): Promise<void> {
  if (!config.remote || !remoteAvailable) return;
  if (buffer.length === 0) return;
  if (!isBackendConfigured()) return;
  const supabase = getSupabase();
  if (!supabase) return;

  const batch = buffer;
  buffer = [];
  const id = await loadAnonId();

  const { error } = await supabase.rpc('log_telemetry_batch', {
    p_anon_id: id,
    p_app_version: config.appVersion,
    p_platform: config.platform,
    p_events: batch.map((e) => ({ name: e.name, level: e.level, props: e.props ?? {}, ts: e.ts })),
  });

  if (error) {
    const missingRpc =
      error.message?.includes('log_telemetry_batch') ||
      error.code === 'PGRST202' ||
      error.code === '42883';
    if (missingRpc) {
      // Telemetry backend not provisioned yet; stop trying for this session.
      remoteAvailable = false;
      return;
    }
    // Transient failure: requeue (bounded) and retry on the next flush.
    buffer = [...batch, ...buffer].slice(0, MAX_BUFFER);
  }
}

function installGlobalHandlers(): void {
  const globalScope = globalThis as Record<string, any>;

  const errorUtils = globalScope.ErrorUtils;
  if (errorUtils?.getGlobalHandler && errorUtils?.setGlobalHandler) {
    const previous = errorUtils.getGlobalHandler();
    errorUtils.setGlobalHandler((error: unknown, isFatal?: boolean) => {
      captureError(error, { fatal: Boolean(isFatal), source: 'global' });
      previous?.(error, isFatal);
    });
  }

  if (typeof globalScope.addEventListener === 'function') {
    globalScope.addEventListener('unhandledrejection', (event: any) => {
      captureError(event?.reason ?? 'unhandledrejection', { source: 'promise' });
    });
  }
}

/** Test-only helpers. */
export function __resetTelemetryForTests(): void {
  anonId = null;
  buffer = [];
  initialized = false;
  remoteAvailable = true;
  config = { appVersion: 'unknown', platform: 'unknown', remote: true };
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

export function getBufferedEventCount(): number {
  return buffer.length;
}

export function __getBufferedEventsForTests(): TelemetryEvent[] {
  return [...buffer];
}
