import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  __getBufferedEventsForTests,
  __resetTelemetryForTests,
  captureError,
  flush,
  getBufferedEventCount,
  initTelemetry,
  trackEvent,
} from '../services/telemetry';

beforeEach(() => {
  __resetTelemetryForTests();
  // Keep test output clean; telemetry mirrors events to the console in dev.
  vi.spyOn(console, 'log').mockImplementation(() => undefined);
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  __resetTelemetryForTests();
  vi.restoreAllMocks();
});

describe('telemetry', () => {
  it('buffers tracked events', () => {
    trackEvent('run_started', { role: 'builder' });
    const events = __getBufferedEventsForTests();
    expect(events).toHaveLength(1);
    expect(events[0].name).toBe('run_started');
    expect(events[0].props).toEqual({ role: 'builder' });
  });

  it('drops null/undefined props and truncates long strings', () => {
    trackEvent('noisy', { keep: 'ok', drop: null, gone: undefined, long: 'x'.repeat(2000) });
    const [event] = __getBufferedEventsForTests();
    expect(event.props).toHaveProperty('keep', 'ok');
    expect(event.props).not.toHaveProperty('drop');
    expect(event.props).not.toHaveProperty('gone');
    expect(String(event.props?.long)).toHaveLength(1000);
  });

  it('captures errors as error-level events', () => {
    captureError(new Error('boom'), { source: 'test' });
    const [event] = __getBufferedEventsForTests();
    expect(event.name).toBe('app_error');
    expect(event.level).toBe('error');
    expect(event.props?.message).toBe('boom');
    expect(event.props?.source).toBe('test');
  });

  it('coerces non-Error throwables', () => {
    captureError('just a string');
    expect(__getBufferedEventsForTests()[0].props?.message).toBe('just a string');
  });

  it('no-ops flush when no backend is configured (keeps events buffered)', async () => {
    trackEvent('a');
    trackEvent('b');
    await flush();
    expect(getBufferedEventCount()).toBe(2);
  });

  it('initTelemetry is idempotent and safe to call without a backend', () => {
    expect(() => {
      initTelemetry({ appVersion: '1.0.0', platform: 'test' });
      initTelemetry({ appVersion: '1.0.0', platform: 'test' });
    }).not.toThrow();
  });

  it('installs a global error handler that captures uncaught errors', () => {
    const globalScope = globalThis as Record<string, any>;
    let registered: ((error: unknown, isFatal?: boolean) => void) | null = null;
    globalScope.ErrorUtils = {
      getGlobalHandler: () => null,
      setGlobalHandler: (handler: (error: unknown, isFatal?: boolean) => void) => {
        registered = handler;
      },
    };

    initTelemetry({ appVersion: '1.0.0', platform: 'test' });
    expect(registered).toBeTypeOf('function');

    registered!(new Error('uncaught'), true);
    const errorEvent = __getBufferedEventsForTests().find((e) => e.name === 'app_error');
    expect(errorEvent?.props?.fatal).toBe(true);

    delete globalScope.ErrorUtils;
  });
});
