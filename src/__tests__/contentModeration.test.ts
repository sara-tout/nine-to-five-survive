import { describe, expect, it } from 'vitest';
import { findBlockedTerm, isContentAllowed } from '../utils/contentModeration';

describe('content moderation filter', () => {
  it('allows legitimate words that merely contain slur substrings', () => {
    const safe = [
      'Scenario: a therapeutic offsite that scrapes the budget',
      'The raccoon mascot tycoon is suspicious of the grape juice',
      'Please add an escape-the-meeting feature for analysis paralysis',
      'Character: the manager who is a control freak about Slack threads',
    ];
    for (const text of safe) {
      expect(isContentAllowed(text)).toBe(true);
    }
  });

  it('blocks clear slurs and threats', () => {
    expect(findBlockedTerm('you are a faggot')).not.toBeNull();
    expect(findBlockedTerm('kys loser')).not.toBeNull();
    expect(findBlockedTerm('this is rape culture commentary')).not.toBeNull();
  });

  it('catches leetspeak and spaced-out obfuscation', () => {
    expect(findBlockedTerm('f4g')).not.toBeNull();
    expect(findBlockedTerm('n1gger')).not.toBeNull();
    expect(findBlockedTerm('n i g g e r')).not.toBeNull();
  });

  it('returns null for empty input', () => {
    expect(findBlockedTerm('')).toBeNull();
  });
});
