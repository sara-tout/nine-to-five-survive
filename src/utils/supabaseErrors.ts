/** Map Supabase/Postgres errors to safe player-facing copy. */
export function toUserFacingSyncError(raw?: string | null): string {
  if (!raw) return 'Cloud sync failed. Your run is still saved on this device.';

  const msg = raw.toLowerCase();
  if (msg.includes('invalid username')) return 'Badge name is not valid for cloud sync.';
  if (msg.includes('too many sync attempts')) return 'Please wait a moment before syncing again.';
  if (msg.includes('rate limit exceeded')) return 'Slow down. You can post more ideas in a bit.';
  if (msg.includes('invalid idea length')) return 'Keep ideas between 8 and 500 characters.';
  if (msg.includes('idea not found')) return 'That idea is no longer available.';
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Network issue. Your run is still saved on this device.';
  }

  return 'Cloud sync failed. Your run is still saved on this device.';
}
