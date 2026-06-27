import { describe, expect, it } from 'vitest';
import { findGrammarIssues } from '../utils/grammarLint';

describe('grammarLint', () => {
  it('flags "a" before vowel-sound words and acronyms', () => {
    expect(findGrammarIssues('You shipped a honest slice.')).toContain(
      'use "an" before vowel sounds (including FAQ, API, HTML, etc.): "a honest"',
    );
    expect(findGrammarIssues('Check a FAQ for details.')).toContain(
      'use "an" before vowel sounds (including FAQ, API, HTML, etc.): "a FAQ"',
    );
    expect(findGrammarIssues('File an API ticket.')).toEqual([]);
  });

  it('flags "an" before consonant-sound words', () => {
    expect(findGrammarIssues('That is an user error.')).toContain(
      'use "a" before consonant sounds: "an user"',
    );
    expect(findGrammarIssues('That is a user error.')).toEqual([]);
  });
});
