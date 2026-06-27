import { CharacterRole } from './characters';

export type FlavorPair = readonly [from: string, to: string];
export type ScenarioFlavorMap = Partial<Record<CharacterRole, readonly FlavorPair[]>>;

export const OUTCOME_SCENARIO_FLAVOR: Record<string, ScenarioFlavorMap> = {
  'late-night-task': {
    'builder': [
      ['commit', 'PR merge at 8 PM'],
      ['small task', 'one-line config change'],
      ['task', 'ticket'],
      ['reviewed until next Thursday', 'code-reviewed next sprint'],
      ['tryhard', '10x engineer'],
    ],
    'product-partner': [
      ['task', 'roadmap item'],
      ['small task', 'tiny scope addition'],
      ['The task took 20 minutes', 'The scope cut took 20 minutes'],
      ['all-hands', 'Q3 priority'],
    ],
    'fast-learner': [
      ['gym membership', 'Udemy subscription'],
      ['leg day', 'tutorial binge'],
      ['workout', 'onboarding module'],
      ['Gains: zero', 'Progress: zero'],
    ],
    'craftsperson': [
      ['task', 'pixel tweak'],
      ['fresh eyes', 'fresh Figma eyes'],
      ['back still hurts', 'RSI still hurts'],
    ],
    'truth-finder': [
      ['reviewed until next Thursday', 'validated until next sprint'],
      ['task', 'data pull'],
      ['commit', 'dataset commit'],
    ],
    'reliability-pro': [
      ['commit', 'hotfix deploy at 8 PM'],
      ['task', 'incident ticket'],
      ['reviewed until next Thursday', 'queued until next on-call handoff'],
    ],
    'mentor': [
      ['tryhard', 'team player'],
      ['gym membership', 'team morale budget'],
      ['all-hands', 'team standup shoutout'],
    ],
    'professor': [
      ['commit', 'formal proof submission'],
      ['task', 'lemma'],
      ['tryhard', 'publish-or-perish tryhard'],
    ],
  },
  // Note: outcomes keep the generic word "meetings" so they match the setup,
  // which only promises six back-to-backs plus a "sync to align on alignment".
  'meeting-marathon': {
    'builder': [
      ['finished more real work', 'merged more PRs'],
      ['Deep Work', 'Merge Queue'],
      ['action items', 'Jira tickets'],
      ['a brainstorm', 'an architecture review'],
    ],
    'product-partner': [
      ['action items', 'scope items'],
      ['org restructuring', 'roadmap restructuring'],
    ],
    'fast-learner': [
      ['Deep Work', 'Tutorial Time'],
      ['brainstorm', 'knowledge share'],
    ],
    'craftsperson': [
      ['finished more real work', 'shipped more mockups'],
      ['Deep Work', 'Figma Focus Time'],
    ],
    'truth-finder': [
      ['action items', 'data requests'],
      ['brainstorm', 'hypothesis session'],
    ],
    'reliability-pro': [
      ['Synergy Ops', 'PagerDuty Ops'],
      ['action items', 'runbook updates'],
    ],
    'mentor': [
      ['brainstorm', 'team brainstorm'],
      ['You are the meeting', 'You are the calendar'],
    ],
    'professor': [
      ['brainstorm', 'whiteboard proof session'],
      ['Deep Work', 'Theorem Time'],
    ],
  },
  'lunch-steal': {
    'builder': [
      ['HR got involved', 'Security got involved'],
      ['LinkedIn', 'GitHub trending'],
      ['afternoon tasks', 'afternoon PRs'],
      ['accounting', 'engineering'],
    ],
    'product-partner': [
      ['conflict resolution plan', 'stakeholder alignment plan'],
      ['pad thai', 'expensed lunch'],
      ['knows things', 'knows the roadmap'],
    ],
    'fast-learner': [
      ['LinkedIn', 'Glassdoor'],
      ['bonded over leftover pizza', 'bonded over onboarding tips'],
      ['Jessica who?', 'Who?'],
    ],
    'craftsperson': [
      ['pad thai', 'clearly-labeled mockup'],
      ['afternoon tasks', 'afternoon wireframes'],
      ['Fresh air', 'Fresh design air'],
    ],
    'truth-finder': [
      ['denied everything', 'denied the receipt evidence'],
      ['knows things', 'knows the numbers'],
      ['HR got involved', 'Audit got involved'],
    ],
    'reliability-pro': [
      ['HR got involved', 'Facilities got involved'],
      ['afternoon tasks', 'afternoon on-call checks'],
      ['a "conflict resolution plan', 'an "incident postmortem plan'],
    ],
    'mentor': [
      ['bonded over leftover pizza', 'bonded over team lunch trauma'],
      ['ally in accounting', 'ally in people ops'],
      ['conflict resolution plan', 'team norms doc'],
    ],
    'professor': [
      ['HR got involved', 'Ethics board got involved'],
      ['$22 pad thai', 'a $22 faculty-club sandwich'],
      ['The pad thai was mid', 'The sandwich was mid'],
      ['sriracha on her blouse', 'red-pen on her proof'],
    ],
  },
  'slack-fire': {
    'builder': [
      ['office centrist', 'tabs-and-spaces centrist'],
      ['update got approved', 'PR got merged'],
      ['thoughtful, balanced take', 'lint-config take'],
    ],
    'product-partner': [
      ['Both sides hated it', 'Both PMs hated it'],
      ['off-topic chat', 'product off-topic chat'],
    ],
    'fast-learner': [
      ['legendary meme', 'legendary Stack Overflow link'],
      ['thoughtful, balanced take', 'junior-dev humble take'],
      ['inner peace', 'tutorial-induced inner peace'],
    ],
    'craftsperson': [
      ['office centrist', 'Figma or Sketch'],
      ['senior director', 'VP of Design'],
      ['thoughtful, balanced take', 'thoughtful, balanced design take'],
    ],
    'truth-finder': [
      ['thoughtful, balanced take', 'data-backed take'],
      ['Both sides hated it', 'Both datasets contradicted it'],
      ['off-topic chat', 'data off-topic chat'],
    ],
    'reliability-pro': [
      ['update got approved', 'deploy got approved'],
      ['company chat', 'incidents chat'],
    ],
    'mentor': [
      ['office diplomat', 'team diplomat'],
      ['legendary meme', 'legendary team-building meme'],
    ],
    'professor': [
      ['office centrist', 'proof by induction or contradiction'],
      ['thoughtful, balanced take', 'peer-reviewed take'],
      ['legendary meme', 'legendary proof meme'],
    ],
  },
  'demo-day': {
    'builder': [
      ['presented', 'shipped a broken build'],
      ['slides froze', 'CI pipeline crashed'],
      ['shortcuts', 'TODO comments'],
      ['happy path', 'golden-path demo'],
      ['delivered something polished', 'shipped something tested'],
    ],
    'product-partner': [
      ['presented', 'presented half the roadmap'],
      ['Leadership loved it', 'Leadership loved the vision'],
      ['reschedule', 'push the launch date'],
      ['Chad the Innovator', 'Chad the Product Visionary'],
    ],
    'fast-learner': [
      ['shortcuts', 'copy-pasted Stack Overflow'],
      ['known issue', 'learning-in-progress issue'],
      ['Q3 innovation', 'Q3 onboarding milestone'],
    ],
    'craftsperson': [
      ['presented', 'walked through mockups'],
      ['slides froze', 'prototype froze'],
      ['happy path', 'designed happy path'],
      ['delivered something polished', 'shipped something pixel-perfect'],
    ],
    'truth-finder': [
      ['presented', 'presented draft metrics'],
      ['known issue', 'unvalidated assumption'],
      ['transparency', 'statistical honesty'],
    ],
    'reliability-pro': [
      ['slides froze', 'staging env crashed'],
      ['presented', 'demoed on prod by accident'],
      ['known issue', 'known SEV-2'],
    ],
    'mentor': [
      ['Leadership loved it', 'The team loved your prep'],
      ['Chad the Innovator', 'Chad the Slide-Deck Hero'],
      ['reschedule', 'buy the team prep time'],
    ],
    'professor': [
      ['shortcuts', 'hand-wavy lemmas'],
      ['known issue', 'unproven conjecture'],
      ['Q3 innovation', 'Q3 publication'],
    ],
  },
  'pto-guilt': {
    'builder': [
      ['cancelled PTO', 'cancelled your long weekend deploy window'],
      ['sync', 'standup'],
      ['cc\'d you on 14 emails', 'cc\'d you on 14 PR threads'],
      ['project early', 'sprint early'],
    ],
    'product-partner': [
      ['cancelled PTO', 'cancelled your roadmap offsite'],
      ['sync', 'planning sync'],
      ['beach photos', 'roadmap screenshots'],
      ['boundary was decorative', 'scope boundary was decorative'],
    ],
    'fast-learner': [
      ['cancelled PTO', 'cancelled your study day'],
      ['sync was cancelled anyway', 'training was cancelled anyway'],
      ['checked three of them from the couch', 'checked three chat threads from the couch'],
    ],
    'craftsperson': [
      ['cancelled PTO', 'cancelled your design review day'],
      ['sunlight', 'natural light for color calibration'],
      ['beach photos', 'Dribbble inspiration boards'],
    ],
    'truth-finder': [
      ['sync was cancelled anyway', 'the report deadline moved anyway'],
      ['cc\'d you on 14 emails', 'cc\'d you on 14 data requests'],
      ['boundary was decorative', 'data boundary was decorative'],
    ],
    'reliability-pro': [
      ['cancelled PTO', 'cancelled your pager-off day'],
      ['sync', 'incident sync'],
      ['You are also a rock', 'You are also on-call'],
    ],
    'mentor': [
      ['cancelled PTO', 'cancelled your coaching offsite'],
      ['rock', 'team anchor'],
      ['proactive', 'self-sacrificing'],
    ],
    'professor': [
      ['cancelled PTO', 'cancelled your sabbatical day'],
      ['project early', 'paper early'],
      ['cry for help', 'peer review cry for help'],
    ],
  },
  'reorg-rumor': {
    'builder': [
      ['reorg', 'team split'],
      ['knows things', 'knows the org chart and the git blame'],
      ['New Chapter', 'New Monorepo Chapter'],
    ],
    'product-partner': [
      ['reorg', 'roadmap shuffle'],
      ['nothing to worry about', 'roadmap is stable'],
      ['corporate smile', 'roadmap smile'],
    ],
    'fast-learner': [
      ['reorg', 'role change'],
      ['mentor pulled you aside', 'buddy pulled you aside'],
      ['neutral office ghost', 'neutral intern ghost'],
    ],
    'craftsperson': [
      ['reorg', 'design system reorg'],
      ['calendar invite titled', 'Figma invite titled'],
      ['neutral office ghost', 'neutral design ghost'],
    ],
    'truth-finder': [
      ['reorg', 'headcount reorg'],
      ['knows things', 'knows the attrition data'],
      ['nothing to worry about', 'the numbers say otherwise'],
    ],
    'reliability-pro': [
      ['reorg', 'on-call rotation reorg'],
      ['New Chapter', 'New Incident Chapter'],
      ['nothing to worry about', 'no pager changes to worry about'],
    ],
    'mentor': [
      ['your mentor pulled you aside', 'a fellow veteran pulled you aside'],
      ['knows things', 'knows who survives reorgs'],
      ['corporate smile', 'supportive smile'],
    ],
    'professor': [
      ['reorg', 'department reorg'],
      ['spiritually', 'academically'],
      ['New Chapter', 'New Department Chapter'],
    ],
  },
  'all-hands-question': {
    'builder': [
      ['You unmuted and answered', 'You unmuted and answered about the architecture'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper technical take'],
      ['Leadership nodded', 'The VP of Eng nodded'],
    ],
    'product-partner': [
      ['You unmuted and answered', 'You unmuted and answered about the roadmap'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper roadmap take'],
      ['love the ownership', 'CEO said "love the prioritization"'],
    ],
    'fast-learner': [
      ['You unmuted and answered', 'You unmuted and answered from your notes'],
      ['no memory of what you said', 'no memory of which wiki page you cited'],
      ['You stayed camera-off', 'You stayed camera-off and kept taking notes'],
    ],
    'craftsperson': [
      ['You unmuted and answered', 'You unmuted and answered about the design'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper UX take'],
      ['Leadership nodded', 'Design leadership nodded'],
    ],
    'truth-finder': [
      ['You unmuted and answered', 'You unmuted and answered about the analysis'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper data take'],
      ['no memory of what you said', 'no memory of which stats you cited'],
    ],
    'reliability-pro': [
      ['You unmuted and answered', 'You unmuted and answered about the incident fix'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper ops take'],
      ['Your contribution stayed invisible', 'Your incident fix stayed invisible'],
    ],
    'mentor': [
      ['You unmuted and answered', 'You unmuted and answered for your team'],
      ['Someone else answered for your work', 'Derek answered for your team\'s work'],
      ['A teammate pinged you after', 'A report pinged you after'],
    ],
    'professor': [
      ['You unmuted and answered', 'You unmuted and answered about the model'],
      ['You spoke up with a sharper take', 'You spoke up with a sharper model explanation'],
      ['coherent', 'mathematically coherent'],
    ],
  },
  'peer-callout': {
    'builder': [
      ['replied with context and fixes', 'replied with commit links and fixes'],
      ['DM\'d Blake', 'messaged Blake in chat'],
      ['owned the mistake cleanly', 'owned the bug report cleanly'],
      ['The thread is now literature', 'the thread is now a RFC'],
    ],
    'product-partner': [
      ['replied with context and fixes', 'replied with scope context and fixes'],
      ['let\'s discuss', 'let\'s re-scope'],
      ['fixed it quietly', 'descoped it quietly'],
    ],
    'fast-learner': [
      ['replied with context and fixes', 'replied with what you learned and fixes'],
      ['read defensive', 'read like a junior panicking'],
      ['fixed it together before standup', 'pair-debugged before standup'],
    ],
    'craftsperson': [
      ['replied with context and fixes', 'replied with mockup context and fixes'],
      ['The thread is now literature', 'the thread is now a design critique doc'],
      ['let\'s discuss', 'let\'s design-review'],
    ],
    'truth-finder': [
      ['replied with context and fixes', 'replied with data context and fixes'],
      ['accountability', 'statistical accountability'],
      ['let\'s discuss', 'let\'s audit the numbers'],
    ],
    'reliability-pro': [
      ['replied with context and fixes', 'replied with incident context and fixes'],
      ['fixed it quietly', 'patched prod quietly'],
      ['CC\'d them anyway', 'paged them anyway'],
    ],
    'mentor': [
      ['owned the mistake cleanly', 'modeled accountability cleanly'],
      ['Blake apologized', 'Blake learned something'],
      ['took it offline', 'coach offline'],
    ],
    'professor': [
      ['replied with context and fixes', 'replied with proof and corrections'],
      ['The thread is now literature', 'the thread is now a preprint'],
      ['took it offline', 'took it to office hours'],
    ],
  },
  'hourly-checkins': {
    'builder': [
      ['answered every hour', 'status-pinged every hour'],
      ['deep work', 'merge-queue work'],
      ['finished real work', 'finished real code'],
      ['easy to manage', 'easy to micromanage'],
    ],
    'product-partner': [
      ['hourly updates', 'hourly roadmap pings'],
      ['finished real work', 'finished the actual roadmap work'],
      ['hard to reach', 'hard to pin down on dates'],
    ],
    'fast-learner': [
      ['cheerful precision', 'cheerful learning updates'],
      ['deep work', 'tutorial deep work'],
      ['Victoria escalated', 'Victoria escalated anyway'],
    ],
    'craftsperson': [
      ['deep work', 'Figma deep work'],
      ['finished real work', 'finished real design work'],
      ['timeline of being available', 'timeline of being in critique'],
    ],
    'truth-finder': [
      ['hourly updates', 'hourly metric pings'],
      ['finished real work', 'finished the real analysis'],
      ['great communication', 'great chart communication'],
    ],
    'reliability-pro': [
      ['hourly updates', 'hourly incident pings'],
      ['deep work', 'on-call deep work'],
      ['doing your job', 'firefighting your job'],
    ],
    'mentor': [
      ['easy to manage', 'easy to over-manage'],
      ['Victoria forwarded one to leadership', 'Victoria forwarded your team update to leadership'],
      ['busy doing your job', 'busy coaching while doing your job'],
    ],
    'professor': [
      ['hourly updates', 'hourly proof-status pings'],
      ['deep work', 'theorem deep work'],
      ['being available', 'being available for peer review'],
    ],
  },
  'performance-review': {
    'builder': [
      ['coaching your junior', 'pair-programming your junior'],
      ['the joint effort', 'the big refactor'],
      ['reliable', 'merge-bot reliable'],
      ['receipts', 'commit receipts'],
    ],
    'product-partner': [
      ['joint effort', 'shared roadmap effort'],
      ['strategic', 'product vision'],
      ['Calibration', 'Roadmap calibration'],
      ['rating grid', 'OKR grid'],
    ],
    'craftsperson': [
      ['joint effort', 'joint design effort'],
      ['delightful at the executive coffee chat', 'delightful at the design critique'],
      ['invisible visible', 'invisible design visible'],
    ],
    'truth-finder': [
      ['receipts', 'data receipts'],
      ['Calibration', 'Metrics calibration'],
      ['the work speak', 'the numbers speak'],
      ['strategic', 'statistically strategic'],
    ],
    'reliability-pro': [
      ['reliable', 'uptime reliable'],
      ['unblocking them', 'keeping prod up for them'],
      ['the front seat', 'the on-call seat'],
    ],
    'mentor': [
      ['coaching your junior', 'mentoring your junior'],
      ['Mentoring does not fit', 'Coaching does not fit'],
      ['a strong support', 'strong mentor energy'],
    ],
    'professor': [
      ['problem-solving', 'proof work'],
      ['the brains behind the project', 'the actual author behind the project'],
      ['rating grid', 'tenure grid'],
    ],
  },
  'exec-roundtable': {
    'builder': [
      ['answered the hard questions', 'answered the hard technical questions'],
      ['project lead', 'technical lead'],
      ['talking points', 'architecture talking points'],
    ],
    'product-partner': [
      ['project lead', 'roadmap lead'],
      ['recap email credited "the team"', 'recap credited "the roadmap team"'],
      ['great energy', 'great product energy'],
    ],
    'craftsperson': [
      ['project lead', 'design lead'],
      ['leadership kept addressing him', 'leadership kept praising his slides'],
      ['seemed intense', 'seemed precious about pixels'],
    ],
    'truth-finder': [
      ['answered the hard questions', 'answered with the hard numbers'],
      ['real story', 'real data story'],
      ['visibility', 'analytical visibility'],
    ],
    'reliability-pro': [
      ['project lead', 'reliability lead'],
      ['The work was yours', 'The uptime was yours'],
      ['seemed intense', 'seemed intense about prod'],
    ],
    'mentor': [
      ['prepped him generously', 'mentored him generously'],
      ['coached him hard on the real story', 'coached him hard on giving credit'],
      ['private thanks from your manager', 'private thanks for developing him'],
    ],
    'professor': [
      ['project lead', 'research lead'],
      ['talking points', 'theorem talking points'],
      ['great energy', 'great academic energy'],
    ],
  },
  'borrowed-vision': {
    'builder': [
      ['scale the vision', 'scale the architecture'],
      ['smooth talker', 'slide-deck guy'],
      ['with specifics', 'with commit history'],
    ],
    'product-partner': [
      ['scale the vision', 'scale the roadmap'],
      ['smooth talker', 'smooth PM'],
      ['The credit stuck.', 'The roadmap credit stuck.'],
    ],
    'fast-learner': [
      ['smooth talker', 'smooth senior'],
      ['passionate', 'over-eager'],
      ['receipts', 'learning journal receipts'],
    ],
    'craftsperson': [
      ['scale the vision', 'scale the design system'],
      ['smooth talker', 'slide polisher'],
      ['with specifics', 'with the UX thinking'],
    ],
    'truth-finder': [
      ['with specifics', 'with data specifics'],
      ['receipts', 'spreadsheet receipts'],
      ['smooth talker', 'chart cherry-picker'],
    ],
    'reliability-pro': [
      ['scale the vision', 'scale the runbook'],
      ['scale the actual work', 'scale the actual on-call work'],
      ['The credit stuck.', 'The runbook credit stuck.'],
    ],
    'mentor': [
      ['Your manager backed you up', 'Your manager backed your team up'],
      ['made an enemy', 'made a political enemy'],
      ['keep the peace', 'keep the team peace'],
    ],
    'professor': [
      ['scale the vision', 'scale the proof sketch'],
      ['with specifics', 'with the formal derivation'],
      ['smooth talker', 'smooth department chair'],
    ],
  },
  'team-shoutout': {
    'builder': [
      ['joint effort', 'heroic pair-programming'],
      ['late-night blocker', 'midnight hotfix'],
      ['fixed the crisis', 'fixed prod at midnight'],
      ['team drama', 'PR drama'],
    ],
    'product-partner': [
      ['joint effort', 'heroic scope management'],
      ['late-night blocker you solved', 'launch risk you cleared'],
      ['team win', 'roadmap win'],
    ],
    'fast-learner': [
      ['Your junior', 'Ryan'],
      ['read petty', 'read like a sore learner'],
      ['peers you helped', 'seniors you bothered with questions'],
    ],
    'craftsperson': [
      ['joint effort', 'heroic pixel-pushing'],
      ['late-night blocker', 'late-night design blocker'],
      ['emojis piled up', 'design-heart emojis piled up'],
    ],
    'truth-finder': [
      ['added context', 'added data context'],
      ['who fixed the crisis', 'who fixed the metrics pipeline'],
      ['screenshot', 'dashboard screenshot'],
    ],
    'reliability-pro': [
      ['late-night blocker you solved', 'midnight page you cleared'],
      ['fixed the crisis', 'fixed prod again'],
    ],
    'mentor': [
      ['Your junior', 'Your mentee'],
      ['joint effort', 'mentorship effort'],
      ['Classy. Invisible.', 'Classy mentor move. Invisible.'],
    ],
    'professor': [
      ['joint effort', 'heroic co-authorship'],
      ['shoutout', 'citation'],
      ['a team drama', 'an academic drama'],
    ],
  },
  'precommitted-deadline': {
    'builder': [
      ['real estimate', 'real sprint estimate'],
      ['blocked momentum', 'blocked the sprint'],
      ['scoped-down version landed', 'scoped-down PR shipped'],
    ],
    'product-partner': [
      ['deadline', 'roadmap date'],
      ['deadline born in a vacuum', 'pre-committed roadmap date'],
      ['company values', 'company OKRs'],
    ],
    'fast-learner': [
      ['45-minute debate', '45-minute learning debate'],
      ['tools you do not use', 'frameworks you barely know'],
      ['The team learned about it from the planning deck', 'You learned about it from the planning deck, mid-onboarding'],
    ],
    'craftsperson': [
      ['real estimate', 'real design estimate'],
      ['scoped-down version', 'scoped-down mockups'],
      ['Susan took a bow', 'Susan took a bow for your pixels'],
    ],
    'truth-finder': [
      ['real estimate', 'real data-backed estimate'],
      ['timelines she will not explain', 'metrics she will not explain'],
      ['planning deck', 'forecast PDF'],
    ],
    'reliability-pro': [
      ['deadline', 'prod launch date'],
      ['scoped-down version landed on time', 'scoped-down deploy shipped on time'],
      ['antacids', 'pager fatigue'],
    ],
    'mentor': [
      ['Your manager backed you up', 'Your manager backed the team up'],
      ['own a deadline', 'own a team deadline'],
      ['You took the win.', 'The team took the win.'],
    ],
    'professor': [
      ['real estimate', 'real complexity estimate'],
      ['45-minute debate', '45-minute proof debate'],
      ['company values', 'department bylaws'],
    ],
  },
  'missing-blocker': {
    'builder': [
      ['Friday stayed alive', 'The deploy stayed alive'],
      ['tiny favor', 'two-line code ask'],
      ['worked around him', 'shipped a workaround branch'],
      ['bypass', 'hotfix bypass'],
    ],
    'product-partner': [
      ['You escalated', 'You escalated the dependency'],
      ['Friday is still Friday', 'The launch date is still Friday'],
      ['tiny favor', 'tiny roadmap favor'],
    ],
    'fast-learner': [
      ['tiny favor', 'tiny onboarding favor'],
    ],
    'craftsperson': [
      ['Friday stayed alive', 'The handoff stayed alive'],
      ['worked around him', 'worked around his review'],
      ['workaround', 'UX workaround'],
    ],
    'truth-finder': [
      ['documented the gap', 'documented the data gap'],
      ['tight summary', 'tight data summary'],
      ['retro focused on your bypass', 'retro focused on your workaround metrics'],
    ],
    'reliability-pro': [
      ['Friday stayed alive', 'Prod stayed alive'],
      ['caused a mess at 6 PM', 'broke prod at 6 PM anyway'],
      ['worked around him', 'failovered around him'],
    ],
    'mentor': [
      ['cc\'d your manager', 'looped in your manager'],
      ['be more collaborative', 'be more team-oriented'],
      ['why he was not consulted', 'why the team was not consulted'],
    ],
    'professor': [
      ['Friday stayed alive', 'The submission stayed alive'],
      ['tiny favor', 'two-minute proof check'],
      ['documented the gap', 'documented the lemma gap'],
      ['Leadership loved the demo', 'Leadership loved the draft'],
    ],
  },
  'visibility-pack': {
    'builder': [
      ['prettify Excel', 'prettify the sprint tracker'],
      ['invisible firefighting', 'invisible prod firefighting'],
      ['Color-coded tabs', 'Color-coded sprint tabs'],
    ],
    'product-partner': [
      ['framework', 'planning framework'],
      ['your wins', 'your roadmap wins'],
      ['invisible firefighting', 'invisible unblocking'],
      ['cross-functional alignment', 'cross-functional roadmap alignment'],
    ],
    'fast-learner': [
      ['framework', 'onboarding framework'],
      ['invisible firefighting', 'quiet ramp-up work'],
      ['person behind the numbers', 'person behind the learning curve'],
    ],
    'craftsperson': [
      ['prettify Excel', 'prettify the design tracker'],
      ['framework deck', 'design-system deck'],
      ['invisible firefighting', 'invisible polish work'],
      ['your wins', 'your UX wins'],
    ],
    'truth-finder': [
      ['person behind the numbers', 'person who actually ran the numbers'],
      ['framework alignment', 'metrics alignment'],
      ['invisible firefighting', 'invisible analysis work'],
      ['executive summary', 'executive data summary'],
    ],
    'reliability-pro': [
      ['invisible firefighting', 'invisible incident firefighting'],
      ['launch stayed alive', 'prod stayed alive'],
    ],
    'mentor': [
      ['your wins', 'your mentees\' wins'],
      ['framework', 'coaching style'],
      ['invisible firefighting', 'invisible team glue'],
      ['the team', 'your actual team'],
    ],
    'professor': [
      ['framework', 'formal framework'],
      ['best practice', 'peer-reviewed best practice'],
      ['invisible firefighting', 'invisible groundwork'],
      ['rigor', 'mathematical rigor'],
    ],
  },
  'ai-wrapper-demo': {
    'builder': [
      ['actual work', 'prompt templates in code'],
      ['real scope', 'real system architecture'],
      ['initiative workstream', 'cron job with a chat UI'],
    ],
    'product-partner': [
      ['team win', 'roadmap win'],
      ['leverage', 'synergize'],
      ['initiative workstream', 'AI roadmap workstream'],
    ],
    'fast-learner': [
      ['team win', 'learning win'],
      ['leverage', 'synergize'],
      ['initiative workstream', 'pilot workstream'],
    ],
    'craftsperson': [
      ['real scope', 'real UX flow'],
      ['LinkedIn thought leadership', 'LinkedIn design thought leadership'],
    ],
    'truth-finder': [
      ['risks', 'actual eval metrics'],
      ['limits', 'statistical limits'],
      ['what was real vs hype', 'what was real vs vanity metrics'],
    ],
    'reliability-pro': [
      ['demo broke', 'staging wrapper broke'],
      ['real scope, limits, and risks', 'real prod limits, failure modes, and risks'],
      ['live question', 'live prod question'],
    ],
    'mentor': [
      ['team win', 'team learning win'],
      ['Thanks for having his back on the hard questions.', 'Thanks for having the team\'s back on the hard questions.'],
    ],
    'professor': [
      ['initiative workstream', '"stochastic parrot" task force'],
      ['real scope', 'real mathematical architecture'],
      ['actual work', 'real modeling work'],
    ],
  },
  'instant-briefing': {
    'builder': [
      ['placeholder deck', 'placeholder sprint deck'],
      ['invented bureaucracy', 'invented engineering process'],
      ['actually accurate', 'actually compile-ready'],
    ],
    'product-partner': [
      ['placeholder deck', 'product direction'],
      ['Scope shrank before anyone read page two.', 'Roadmap scope shrank before anyone read page two.'],
      ['real assessment landed the next day', 'real roadmap assessment landed the next day'],
    ],
    'fast-learner': [
      ['not responsive', 'still onboarding, somehow already behind'],
      ['faked a plan', 'faked a plan from wiki snippets'],
      ['confident vagueness', 'confident ramp-up vagueness'],
    ],
    'craftsperson': [
      ['placeholder deck', 'Figma direction'],
      ['confident vagueness', 'confident wireframe vagueness'],
      ['jargon', 'design jargon'],
    ],
    'truth-finder': [
      ['placeholder deck', 'placeholder data deck'],
      ['actually accurate', 'statistically accurate'],
      ['unwinding fiction', 'unwinding forecast fiction'],
    ],
    'reliability-pro': [
      ['placeholder deck', 'placeholder ops deck'],
      ['assessment window', 'incident assessment window'],
      ['not responsive', 'not incident-responsive'],
    ],
    'mentor': [
      ['Your manager backed you', 'Your manager backed your team'],
      ['placeholder deck', 'placeholder team deck'],
      ['Lunch stayed lunch', 'Team lunch stayed lunch'],
    ],
    'professor': [
      ['placeholder deck', 'research direction'],
      ['confident vagueness', 'confident theorem vagueness'],
      ['jargon', 'academic jargon'],
    ],
  },
  'ten-minute-favor': {
    'builder': [
      ['ten-minute" favors', 'ten-minute debug favor'],
      ['setting Derek could have changed', 'env var Derek could have toggled'],
      ['clear handoff', 'clear PR handoff'],
    ],
    'product-partner': [
      ['small ask', 'tiny scope thing'],
      ['absorbs "ten-minute" favors', 'absorbs "ten-minute" scope dumps'],
      ['a setting Derek could have changed himself', 'a doc permission Derek could have fixed himself'],
      ['dropped the ball', 'dropped the roadmap ball'],
    ],
    'fast-learner': [
      ['a "learning moment."', 'an "onboarding moment."'],
      ['a small ask', 'a tiny starter task'],
      ['a setting Derek could have changed himself', 'a setting Derek could have looked up himself'],
      ['twenty minutes the next morning', 'twenty minutes after coffee'],
    ],
    'craftsperson': [
      ['small ask', 'tiny pixel thing'],
      ['missed dinner', 'missed design review dinner'],
      ['a setting Derek could have changed himself', 'a file permission Derek could have fixed himself'],
      ['handoff', 'Figma handoff'],
    ],
    'truth-finder': [
      ['The doc proved otherwise', 'The spreadsheet proved otherwise'],
      ['cleaning up narrative', 'cleaning up data narrative'],
      ['a setting Derek could have changed himself', 'a dashboard filter Derek could have changed himself'],
      ['small ask', 'small data ask'],
    ],
    'reliability-pro': [
      ['The fix held', 'The hotfix held'],
      ['setting Derek could have changed', 'feature flag Derek could have toggled'],
      ['voice note from a bar', 'page from a bar'],
    ],
    'mentor': [
      ['reputation as the person who absorbs', 'reputation as the team sponge'],
      ['boundary was fair', 'mentorship boundary was fair'],
      ['a setting Derek could have changed himself', 'a calendar setting Derek could have changed himself'],
      ['a "learning moment."', 'a "growth opportunity."'],
    ],
    'professor': [
      ['ten-minute" favors', 'ten-minute proof check'],
      ['theft', 'intellectual theft'],
      ['a setting Derek could have changed himself', 'a definition Derek could have looked up himself'],
      ['learning moment', 'teachable proof moment'],
    ],
  },
  'quick-and-dirty': {
    'builder': [
      ['dirty', 'quick and hacky'],
      ['a whiteboard', 'an architecture whiteboard'],
      ['demo path', 'demo code path'],
      ['landmine', 'production landmine'],
    ],
    'product-partner': [
      ['real scope', 'real product scope'],
      ['bias to action', 'bias to roadmap theater'],
      ['cleanup ticket', 'tech-debt ticket'],
    ],
    'fast-learner': [
      ['real scope', 'actual size of the ask'],
      ['not solution-oriented', 'not ramped-up yet'],
      ['honest slice', 'honest MVP slice'],
    ],
    'craftsperson': [
      ['looked fine on stage', 'looked fine in the mockup'],
      ['dirty', 'design-debt dirty'],
      ['quick version', 'UI button'],
    ],
    'truth-finder': [
      ['real scope', 'audit exposure'],
      ['cleanup ticket', 'compliance cleanup ticket'],
      ['honest slice', 'honest data slice'],
    ],
    'reliability-pro': [
      ['Reality reminded everyone', 'Prod reminded everyone at 2 AM'],
      ['quick version', 'quick prod patch'],
      ['hacked together the demo path', 'hacked the patch straight into prod'],
      ['landmine', 'SEV-1 landmine'],
    ],
    'mentor': [
      ['real scope', 'team impact'],
      ['post-demo cleanup', 'post-demo team cleanup'],
      ['whiteboard', 'team whiteboard'],
    ],
    'professor': [
      ['dirty', 'quick and non-rigorous'],
      ['whiteboard', 'proof whiteboard'],
      ['real scope', 'hidden complexity'],
    ],
  },
  'urgent-overnight': {
    'builder': [
      ['timestamps', 'commit timestamps'],
      ['deliverable', 'code deliverable'],
      ['a mistake surfaced', 'a bug surfaced in the live app'],
    ],
    'product-partner': [
      ['sane plan', 'sane roadmap plan'],
      ['cross-team work', 'cross-team roadmap work'],
      ['our deliverable', 'our roadmap deliverable'],
      ['actual priorities', 'actual roadmap priorities'],
    ],
    'fast-learner': [
      ['assumed you had context', 'assumed you had tribal knowledge'],
      ['Urgent is a lifestyle', 'Context-switching is a lifestyle'],
      ['Classic', 'Classic onboarding trap'],
    ],
    'craftsperson': [
      ['rearranged your whole day', 'rearranged your whole design day'],
      ['deliverable', 'design deliverable'],
      ['a mistake surfaced', 'a flaw surfaced in the mockups'],
    ],
    'truth-finder': [
      ['timestamps', 'data timestamps'],
      ['assumed you had context', 'assumed you had the data context'],
      ['a mistake surfaced', 'an error surfaced in the numbers'],
    ],
    'reliability-pro': [
      ['delivered', 'delivered the write-up'],
      ['deliverable', 'incident deliverable'],
      ['Urgent is a lifestyle', 'PagerDuty is a lifestyle'],
      ['redoing your own rush job', 'patching your own rush job'],
    ],
    'mentor': [
      ['Blake acted wounded', 'Blake acted personally wounded'],
      ['looking difficult', 'looking like a bad team player'],
      ['Leadership cared about the date', 'Leadership cared about the deadline'],
    ],
    'professor': [
      ['timestamps', 'experiment timestamps'],
      ['deliverable', 'proof deliverable'],
      ['your own rush job', 'your own rushed proof'],
    ],
  },
  'fire-drill-demo': {
    'builder': [
      ['demo resumed tomorrow', 'deploy demo resumed tomorrow'],
      ['unfinished deck', 'unfinished architecture deck'],
      ['lost momentum', 'lost deploy momentum'],
      ['important chart', 'important metrics chart'],
    ],
    'product-partner': [
      ['unfinished deck', 'unfinished roadmap deck'],
      ['important chart', 'real forecast numbers'],
      ['commitment', 'roadmap commitment'],
    ],
    'fast-learner': [
      ['evacuated like a professional', 'evacuated like a seasoned professional'],
      ['misread the one chart you had not reached', 'misread the one slide you had explained twice'],
    ],
    'craftsperson': [
      ['demo', 'design demo'],
      ['unfinished deck', 'unfinished Figma deck'],
      ['dedicated', 'pixel-flawless'],
    ],
    'truth-finder': [
      ['important chart', 'real dataset numbers'],
      ['misread the one chart', 'misread the one data viz'],
      ['another lap', 'another metrics lap'],
    ],
    'reliability-pro': [
      ['gentle reminder about alarms', 'gentle reminder about evacuation SLAs'],
      ['evacuated like a professional', 'evacuated like a professional on-call'],
      ['Security appeared', 'Security appeared like a SEV-1'],
    ],
    'mentor': [
      ['Leadership respected the calm', 'Leadership respected your team-first calm'],
      ['dedicated', 'dedicated to the team demo'],
      ['gentle reminder', 'gentle team-safety reminder'],
    ],
    'professor': [
      ['important chart', 'real proof numbers'],
      ['demo', 'theorem demo'],
      ['HR sent a gentle reminder', 'Faculty sent a gentle reminder'],
    ],
  },
  'spreadsheet-mandate': {
    'builder': [
      ['trackers', 'sprint trackers'],
      ['single source of truth', 'single source of git truth'],
      ['macros', 'cursed macros'],
      ['spreadsheet whisperer', 'Jira whisperer'],
    ],
    'product-partner': [
      ['trackers', 'roadmap trackers'],
      ['workbook', 'forty roadmap tabs'],
      ['official format', 'official roadmap format'],
      ['You turned a chore into a win.', 'You turned a roadmap chore into a win.'],
    ],
    'fast-learner': [
      ['workbook', 'workbook Maureen swears everyone knows'],
      ['ninety minutes to understand tab naming', 'ninety minutes to understand her logic'],
      ['tab naming', 'tab naming convention'],
    ],
    'craftsperson': [
      ['color-coded tabs', 'color-coded design tabs'],
      ['workbook', 'design debt workbook'],
      ['official format', 'official design tracker format'],
    ],
    'truth-finder': [
      ['single source of truth', 'single source of data truth'],
      ['visibility', 'FINAL (probably)'],
      ['weekly export', 'weekly data export'],
    ],
    'reliability-pro': [
      ['macros', 'broken automation macros'],
      ['workbook', 'on-call workbook'],
      ['official format', 'official ops tracker format'],
    ],
    'mentor': [
      ['not collaborative', 'not team-oriented'],
      ['lifesaver', 'team lifesaver'],
      ['monthly meeting', 'monthly alignment meeting'],
    ],
    'professor': [
      ['You inherited the workbook.', 'You inherited the workbook Maureen calls "elegant."'],
      ['single source of truth', 'single source of axiomatic truth'],
    ],
  },
  'long-quick-call': {
    'builder': [
      ['crisp update', 'two-minute PR update'],
      ['async note was clearer', 'async PR summary was clearer'],
      ['follow-up with you directly', 'follow-up on your PR directly'],
    ],
    'product-partner': [
      ['we are aligned', 'we are roadmap-aligned'],
      ['disengaged', 'not roadmap-aligned'],
      ['async note was clearer', 'async roadmap note was clearer'],
    ],
    'fast-learner': [
      ['minute fifty-one', 'forty-seven minutes of context you lack'],
      ['mispronounced half of it', 'mispronounced half your project name'],
      ['attendance credit', 'onboarding attendance credit'],
    ],
    'craftsperson': [
      ['crisp update', 'two-minute design update'],
      ['we are aligned', 'we are pixel-aligned'],
      ['mispronounced half of it', 'mispronounced half your design terms'],
    ],
    'truth-finder': [
      ['crisp update', 'crisp metrics update'],
      ['async note', 'async data note'],
      ['correct three facts', 'correct three data points'],
    ],
    'reliability-pro': [
      ['attendance credit', 'on-call attendance credit'],
      ['we are aligned', 'we are incident-aligned'],
      ['minute fifty-one', 'minute fifty-one of your life'],
    ],
    'mentor': [
      ['great, we are aligned', 'great, we are team-aligned'],
      ['disengaged', 'not team-spirited enough'],
      ['follow-up with you directly', 'follow-up with your team directly'],
    ],
    'professor': [
      ['crisp update', 'two-minute proof update'],
      ['we are aligned', 'we are citation-aligned'],
      ['attendance credit', 'seminar attendance credit'],
    ],
  },
  'direct-leader-dm': {
    'builder': [
      ['answered directly with receipts', 'answered with commit receipts'],
      ['unfiltered take', 'unfiltered technical take'],
      ['felt bypassed', 'felt bypassed on the architecture thread'],
      ['exactly what they needed for tomorrow', 'exactly the technical clarity they needed for tomorrow'],
    ],
    'product-partner': [
      ['receipts', 'roadmap receipts'],
      ['unfiltered take', 'unfiltered roadmap take'],
      ['exactly what they needed for tomorrow', 'exactly the roadmap clarity they needed for tomorrow'],
      ['short list', 'roadmap short list'],
      ['asked a peer the same question', 'asked a PM peer the same roadmap question'],
      ['Your name was not on the slide', 'Your roadmap bet was not on the slide'],
    ],
    'fast-learner': [
      ['receipts', 'notes-app receipts'],
      ['short list', 'learning-track short list'],
      ['did the right thing', 'did the right thing for your onboarding track'],
    ],
    'craftsperson': [
      ['receipts', 'design receipts'],
      ['exactly what I needed for tomorrow', 'exactly the UX honesty I needed for tomorrow'],
      ['felt bypassed', 'felt bypassed on the design review thread'],
    ],
    'truth-finder': [
      ['receipts', 'data receipts'],
      ['exactly what they needed for tomorrow', 'exactly the data clarity they needed for tomorrow'],
      ['short list', 'analytics short list'],
    ],
    'reliability-pro': [
      ['receipts', 'incident receipts'],
      ['answered in the DM', 'answered in the DM about prod risk'],
      ['felt bypassed', 'felt bypassed on the on-call chain'],
    ],
    'mentor': [
      ['backed you up', 'backed you up with the team'],
      ['did the right thing', 'modeled exactly what you tell your reports to do'],
      ['asked a peer the same question', 'asked another team lead the same question'],
      ['Your name was not on the slide', 'Your team\'s name was not on the slide'],
    ],
    'professor': [
      ['receipts and diplomacy', 'citations and diplomacy'],
      ['asked a peer the same question', 'asked another researcher the same question'],
    ],
  },
  'screen-share-moment': {
    'builder': [
      ['fixed the share', 'fixed the screen share'],
      ['complaint tab', 'sprint complaint tab'],
      ['permissions issue', 'Zoom permissions issue'],
      ['demo still ran long', 'standup still ran long'],
    ],
    'product-partner': [
      ['complaint tab', 'roadmap complaint tab'],
      ['deck', 'actual roadmap deck'],
      ['demo still ran long', 'roadmap demo still ran long'],
    ],
    'fast-learner': [
      ['Zoom lag', 'new-hire Zoom lag'],
      ['carry this memory forever', 'carry this memory through your entire onboarding'],
      ['screenshots in your soul', 'screenshots in your onboarding journal'],
    ],
    'craftsperson': [
      ['complaint tab', 'mockup complaint tab'],
      ['deck', 'actual Figma deck'],
      ['flawless', 'visually flawless'],
    ],
    'truth-finder': [
      ['complaint tab', 'numbers complaint tab'],
      ['screenshots in your soul', 'receipts in your soul'],
      ['complaint draft', 'numbers complaint draft'],
    ],
    'reliability-pro': [
      ['permissions issue', 'prod permissions issue'],
    ],
    'mentor': [
      ['thanked you afterwards', 'thanked you for saving him'],
      ['Chad acts like nothing happened', 'Chad acts like mentorship never happened'],
      ['Chad thanked you afterwards', 'Chad thanked you for saving his demo'],
    ],
    'professor': [
      ['complaint tab', 'research complaint tab'],
      ['complaint draft', 'grant complaint draft'],
      ['Zoom lag', 'network lag, obviously'],
    ],
  },
  'weather-small-talk': {
    'builder': [
      ['commute', 'VPN commute'],
      ['real work', 'real coding work'],
      ['hard stop', 'sprint hard stop'],
      ['culture fit', 'remote culture fit'],
    ],
    'product-partner': [
      ['agenda', 'roadmap agenda'],
      ['decision', 'scope decision'],
      ['psychological safety', 'roadmap psychological safety'],
    ],
    'fast-learner': [
      ['weather talk', 'eight minutes on weather you just moved here'],
      ['warming up', 'icebreaker warming up'],
      ['frostbite', 'onboarding frostbite'],
    ],
    'craftsperson': [
      ['a comment about your commute', 'a take on patio furniture'],
      ['"great culture fit"', '"a great hang"'],
      ['hates fun', 'hates design fun'],
    ],
    'truth-finder': [
      ['a comment about your commute', 'an observation that the chat contained zero data'],
      ['decision', 'data-driven decision'],
      ['action items', 'metric action items'],
      ['frostbite', 'analysis paralysis frostbite'],
    ],
    'reliability-pro': [
      ['a comment about your commute', 'a bit about the server room heat'],
      ['real work', 'real incident work'],
      ['hard stop', 'pager hard stop'],
    ],
    'mentor': [
      ['great culture fit', 'great team culture fit'],
      ['hates fun', 'hates team fun'],
      ['psychological safety', 'team psychological safety'],
    ],
    'professor': [
      ['a comment about your commute', 'a tangent about atmospheric pressure'],
      ['"great culture fit"', '"surprisingly fun for an academic"'],
      ['weather talk', 'climate model talk'],
      ['agenda', 'research agenda'],
    ],
  },
  'take-it-offline': {
    'builder': [
      ['let\'s circle back', 'take this to a PR comment'],
      ['follow-up call', 'follow-up architecture call'],
      ['shared doc', 'shared RFC doc'],
      ['circle back', 'circle back in standup'],
    ],
    'product-partner': [
      ['let\'s circle back', 'take this to the roadmap doc'],
      ['Same argument', 'Same scope argument'],
      ['async comments', 'async roadmap comments'],
    ],
    'fast-learner': [
      ['higher headcount', 'higher headcount, lower clarity'],
      ['Miracles happen', 'Onboarding miracles happen'],
    ],
    'craftsperson': [
      ['follow-up call', 'follow-up design call'],
      ['shared doc', 'shared Figma doc'],
      ['Offline" remains a lie', 'Async" remains a lie'],
    ],
    'truth-finder': [
      ['shared doc', 'shared data doc'],
      ['resolved nothing', 'resolved no metrics'],
      ['thread solved it', 'spreadsheet solved it'],
    ],
    'reliability-pro': [
      ['follow-up call', 'follow-up incident call'],
      ['Same argument', 'Same prod argument'],
      ['great alignment', 'great incident alignment'],
    ],
    'mentor': [
      ['let\'s circle back', 'take this to a 1:1'],
      ['three hours on one question', 'three hours coaching one question'],
      ['great alignment', 'great team alignment'],
    ],
    'professor': [
      ['let\'s circle back', 'take this to office hours'],
      ['shared doc', 'shared proof doc'],
      ['Offline" remains a lie', 'Office hours" remain a lie'],
    ],
  },
  'unmuted-chaos': {
    'builder': [
      ['strategic pivot', 'quarterly sprint priorities'],
      ['please check mute', 'please check mute and your IDE sounds'],
      ['headcount', 'headcount and hiring freeze'],
    ],
    'product-partner': [
      ['strategic pivot', 'roadmap pivot'],
      ['budget', 'roadmap budget'],
      ['town hall', 'roadmap town hall'],
    ],
    'fast-learner': [
      ['strategic pivot', 'synergy pivot'],
      ['what did they say about headcount', 'what did they say about your team'],
    ],
    'craftsperson': [
      ['laminate flooring', 'design-system laminate flooring'],
      ['background conversation', 'Figma-comment background conversation'],
      ['strategic pivot', 'design-system pivot'],
    ],
    'truth-finder': [
      ['budget', 'actual budget numbers'],
      ['strategic pivot', 'data-backed pivot'],
      ['learned nothing about budget', 'learned nothing about headcount data'],
    ],
    'reliability-pro': [
      ['strategic pivot', 'quarterly uptime priorities'],
      ['messages you', 'pages you'],
    ],
    'mentor': [
      ['HR will have feelings', 'People Ops will have feelings'],
      ['teammate messages you', 'mentee messages you'],
      ['please check mute', 'please check mute and your coaching tone'],
      ['headcount', 'team headcount'],
    ],
    'professor': [
      ['strategic pivot', 'research pivot'],
      ['laminate flooring', 'axiom of laminate flooring'],
      ['town hall', 'faculty town hall'],
    ],
  },
  'townhall-question': {
    'builder': [
      ['trying to show off', 'architecture concern'],
      ['FAQ that does not exist', 'internal wiki that does not exist'],
    ],
    'product-partner': [
      ['trying to show off', 'roadmap concern'],
      ['FAQ that does not exist', 'roadmap slide two'],
      ['take it offline', 'take it to the roadmap review'],
    ],
    'fast-learner': [
      ['trying to show off', 'trying to show you read the wiki'],
      ['the only good one', 'the only non-Derek one'],
    ],
    'craftsperson': [
      ['trying to show off', 'design-system concern'],
      ['the only good one', 'the only design-literate one'],
      ['secondhand embarrassment', 'secondhand design embarrassment'],
    ],
    'truth-finder': [
      ['out of time', 'out of time for facts'],
    ],
    'reliability-pro': [
      ['trying to show off', 'on-call concern'],
    ],
    'mentor': [
      ['Derek told someone', 'Derek told someone you upstaged him'],
      ['saved your dignity', 'saved your team\'s dignity'],
      ['take it offline', 'take it to a 1:1'],
    ],
    'professor': [
      ['trying to show off', 'methodological concern'],
      ['FAQ that does not exist', 'theorem slide two'],
      ['show off', 'show off your proof'],
    ],
  },
};
