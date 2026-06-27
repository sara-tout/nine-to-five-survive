/** Lightweight checks for common grammar mistakes in player-facing copy. */

/**
 * Use "an" before vowel SOUNDS, not just vowel letters.
 * Examples: an FAQ (eff-ay-cue), an hour, an honest slice.
 * Use "a" before consonant sounds: a user, a European, a one-off.
 */
const VOWEL_SOUND_WORDS =
  'honest|hour|heir|honor|honorary|honorable|honour|honourable|mba|mvp|api|sql|elegant|awkward|email|error|incident|upgrade|umbrella|unusual|urgent|executive|empty|excellent|idea|office|only|other|outcome|ops|open|option|order|overview|update|upgrade|unfiltered|unofficial|under|understanding|unfortunate|unhappy|unhelpful|unknown|unlikely|unnecessary|unpaid|unplanned|unpleasant|unpopular|unprecedented|unpredictable|unprepared|unproductive|unprofessional|unqualified|unread|unreal|unreasonable|unrelated|unreliable|unsafe|unsolicited|unsolved|unsound|unspecified|unspoken|unstable|unsuitable|unsure|unsurprising|unsustainable|untitled|untouched|untrained|untrue|untrusted|unusual|unwanted|unwelcome|unwell|unwilling|unwise|unworkable|upcoming|update|upgrade|uphill|upset|urban|urge|urgency|urgent|utter|utterly|faq|fbi|html|http|https|hr|ai|llm|roi|okr|nda|rfp|sla|sop|eta|eod|asap|erp|crm|ide|ngo|nfl|nba|mp3|mp4|x-ray|xbox';

const CONSONANT_SOUND_WORDS =
  'user|unique|unified|union|unit|one|useful|useless|usual|ubiquitous|unicorn|uniform|university|european|European|ukulele|one-time|one-off|year|yacht|young|your|youth|ux|url|ui|euro|united|usage|usecase';

const GRAMMAR_PATTERNS: { label: string; pattern: RegExp }[] = [
  {
    label: 'use "an" before vowel sounds (including FAQ, API, HTML, etc.)',
    pattern: new RegExp(`\\ba (${VOWEL_SOUND_WORDS})\\b`, 'gi'),
  },
  {
    label: 'use "a" before consonant sounds',
    pattern: new RegExp(`\\ban (${CONSONANT_SOUND_WORDS})\\b`, 'gi'),
  },
  {
    label: 'avoid "could/would/should of"',
    pattern: /\b(could|would|should) of\b/gi,
  },
  {
    label: 'avoid common misspellings',
    pattern:
      /\b(recieve|seperate|occured|occurence|definately|defintely|alot|everytime|infront|untill|wierd|goverment|accomodate|occassion|priviledge|neccessary|succesful|sucess|thier|recieved|beleive|acheive|freind|occuring|maintainance|refered|transfered|enviroment|enviornment|recomend|reccomend|commited|commiting|arguement|liason|grammer|gramar|tommorow|tommorrow|begining|accross|adress|becuase|becasue|definitly|definatly)\b/gi,
  },
  {
    label: 'use "lose" not "loose" before nouns',
    pattern:
      /\bloose (your|the|a|an|this|that|face|momentum|control|track|sight|sleep|patience|credibility|job|mind|focus|ground|lead|count|change|end|steam|weight|time|money|data|progress|sanity|energy)\b/gi,
  },
  {
    label: 'use "than" in comparisons',
    pattern:
      /\b(better|worse|more|less|other|rather|sooner|later|faster|slower|higher|lower|harder|easier|longer|shorter|clearer|tougher|smoother|deeper|wider|brighter|darker|lighter|heavier|fuller|busier|calmer|sharper|fresher|funnier|healthier|safer|fairer|nicer|fewer|greater|lesser) then\b/gi,
  },
  {
    label: 'no em/en dashes in game copy; use commas instead',
    pattern: /[—–]/g,
  },
];

export function findGrammarIssues(text: string): string[] {
  const issues: string[] = [];
  for (const { label, pattern } of GRAMMAR_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text))) {
      issues.push(`${label}: "${match[0]}"`);
    }
  }
  return issues;
}
