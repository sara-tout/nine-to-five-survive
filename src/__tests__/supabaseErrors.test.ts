import { describe, expect, it } from 'vitest';
import { toUserFacingSyncError } from '../utils/supabaseErrors';

describe('toUserFacingSyncError', () => {
  it('maps known server errors to safe copy', () => {
    expect(toUserFacingSyncError('invalid username')).toContain('Badge name');
    expect(toUserFacingSyncError('too many sync attempts')).toContain('wait');
    expect(toUserFacingSyncError('rate limit exceeded')).toContain('Slow down');
  });

  it('does not echo raw postgres details', () => {
    const msg = toUserFacingSyncError('relation "players" does not exist at character 15');
    expect(msg).not.toContain('relation');
    expect(msg).not.toContain('character');
  });
});
