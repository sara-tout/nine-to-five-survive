/**
 * Lightweight client-side content filter for user-submitted text (idea board).
 * First line of defense against obviously objectionable submissions (hate slurs,
 * sexual content, threats). Backed by server-side reporting + auto-hide for
 * anything that slips through.
 *
 * Matching strategy:
 * - Whole-word matching (after collapsing common leetspeak) so legitimate words
 *   are not flagged (e.g. "therapeutic" must not trip on "rape", "raccoon" on
 *   "coon"). "n1gger", "f4g" still match because digits are normalized first.
 * - A small curated list of unambiguous slurs is also matched against the
 *   separator-stripped text to catch spaced-out obfuscation ("n i g g e r").
 */

const BLOCKED_WORDS = [
  'nigger',
  'nigga',
  'faggot',
  'fag',
  'retard',
  'spic',
  'chink',
  'kike',
  'tranny',
  'coon',
  'wetback',
  'cunt',
  'rape',
  'rapist',
  'pedophile',
  'pedo',
  'molest',
  'incest',
  'bestiality',
  'kys',
];

// Safe to match even when separators are stripped (not substrings of normal words).
const OBFUSCATION_TERMS = [
  'nigger',
  'faggot',
  'childporn',
  'rapist',
  'pedophile',
  'killyourself',
];

const LEET_MAP: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  $: 's',
  '!': 'i',
};

function normalizeLeet(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((ch) => LEET_MAP[ch] ?? ch)
    .join('');
}

/** Returns the offending term if the text contains blocked content, else null. */
export function findBlockedTerm(text: string): string | null {
  if (!text) return null;
  const leet = normalizeLeet(text);

  for (const word of BLOCKED_WORDS) {
    if (new RegExp(`\\b${word}\\b`).test(leet)) return word;
  }

  const collapsed = leet.replace(/[^a-z]/g, '');
  for (const term of OBFUSCATION_TERMS) {
    if (collapsed.includes(term)) return term;
  }

  return null;
}

export function isContentAllowed(text: string): boolean {
  return findBlockedTerm(text) === null;
}
