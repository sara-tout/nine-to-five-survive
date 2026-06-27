import { CharacterRole } from './characters';

type RoleText = Record<CharacterRole, string>;

const ROLES: CharacterRole[] = [
  'builder',
  'product-partner',
  'fast-learner',
  'craftsperson',
  'truth-finder',
  'reliability-pro',
  'mentor',
  'professor',
];

function byRole(variants: Partial<RoleText> & { default: string }): RoleText {
  return Object.fromEntries(ROLES.map((role) => [role, variants[role] ?? variants.default])) as RoleText;
}

/** Role-flavored descriptions for scenarios not yet in the main scenarioText map. */
export const EXTRA_SCENARIO_DESCRIPTIONS: Record<string, RoleText> = {
  'pto-guilt': {
    builder: 'You want Friday off. Derek: "No pressure, but someone should cover the deploy sync. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    'product-partner': 'You want Friday off. Derek: "No pressure, but someone should cover the roadmap sync. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    'fast-learner': 'You want Friday off. Derek: "No pressure, but someone should wrap up the onboarding doc. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    craftsperson: 'You want Friday off. Derek: "No pressure, but someone should cover the design review. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    'truth-finder': 'You want Friday off. Derek: "No pressure, but someone should cover the data readout. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    'reliability-pro': 'You want Friday off. Derek: "No pressure, but someone should cover the prod check. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    mentor: 'You want Friday off. Derek: "No pressure, but someone should cover the team sync. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    professor: 'You want Friday off. Derek: "No pressure, but someone should cover the model review. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
  },
  'reorg-rumor': byRole({
    default:
      'Team chat is blowing up with org-chart astrology. Your manager wants a "quick alignment" about rumors that may or may not be true.',
    builder: 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before anyone rewrites your sprint.',
    'product-partner': 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before the roadmap gets reshuffled.',
    craftsperson: 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before design priorities move again.',
    'truth-finder': 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before your analysis lands with the wrong audience.',
    'reliability-pro': 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before on-call rotations change.',
    mentor: 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before your team hears it from the group chat first.',
    professor: 'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before the model work gets reassigned.',
  }),
  'all-hands-question': {
    builder: 'Live all-hands. The CEO opens the floor. Your work is on the slide. Do you speak up or stay camera-off?',
    'product-partner': 'Live all-hands. The CEO opens the floor. Your roadmap bet is on the slide. Do you speak up or stay camera-off?',
    'fast-learner': 'Live all-hands. The CEO opens the floor. Your research is on the slide. Do you speak up or stay camera-off?',
    craftsperson: 'Live all-hands. The CEO opens the floor. Your design is on the slide. Do you speak up or stay camera-off?',
    'truth-finder': 'Live all-hands. The CEO opens the floor. Your analysis is on the slide. Do you speak up or stay camera-off?',
    'reliability-pro': 'Live all-hands. The CEO opens the floor. Your incident fix is on the slide. Do you speak up or stay camera-off?',
    mentor: 'Live all-hands. The CEO opens the floor. Your team\'s work is on the slide. Do you speak up or stay camera-off?',
    professor: 'Live all-hands. The CEO opens the floor. Your model is on the slide. Do you speak up or stay camera-off?',
  },
  'instant-briefing': byRole({
    default:
      'Ten minutes after standup mentioned a new initiative, Victoria wants status, timeline, design, and risks before lunch.',
    builder: 'Ten minutes after standup, Victoria wants architecture, timeline, risks, and a working prototype before lunch.',
    'product-partner': 'Ten minutes after standup, Victoria wants scope, timeline, stakeholders, and a roadmap draft before lunch.',
    'fast-learner': 'Ten minutes after standup, Victoria wants a summary, timeline, and "what you learned so far" before lunch.',
    craftsperson: 'Ten minutes after standup, Victoria wants flows, timeline, and a polished mock before lunch.',
    'truth-finder': 'Ten minutes after standup, Victoria wants data, methodology, timeline, and caveats before lunch.',
    'reliability-pro': 'Ten minutes after standup, Victoria wants impact, timeline, rollback plan, and owners before lunch.',
    mentor: 'Ten minutes after standup, Victoria wants team capacity, timeline, risks, and who is blocked before lunch.',
    professor: 'Ten minutes after standup, Victoria wants the model, assumptions, timeline, and open questions before lunch.',
  }),
  'ten-minute-favor': byRole({
    default: 'Derek says this is a ten-minute favor. Two hours later you are still untangling it. He left for drinks.',
    builder: 'Derek says this is a ten-minute code favor. Two hours later you are still debugging his branch. He left for drinks.',
    'product-partner': 'Derek says this is a ten-minute doc favor. Two hours later you are still rewriting his bullets. He left for drinks.',
    'fast-learner': 'Derek says this is a ten-minute favor to help you learn. Two hours later you are still cleaning up his mess. He left for drinks.',
    craftsperson: 'Derek says this is a ten-minute design favor. Two hours later you are still fixing his file names. He left for drinks.',
    'truth-finder': 'Derek says this is a ten-minute data favor. Two hours later you are still validating his spreadsheet. He left for drinks.',
    'reliability-pro': 'Derek says this is a ten-minute on-call favor. Two hours later you are still paging through his logs. He left for drinks.',
    mentor: 'Derek says this is a ten-minute favor for the team. Two hours later you are still covering his gaps. He left for drinks.',
    professor: 'Derek says this is a ten-minute math favor. Two hours later you are still fixing his notation. He left for drinks.',
  }),
  'quick-and-dirty': byRole({
    default:
      'Susan wants a quick and dirty fix for the demo. It touches permissions, payments, and something auditors asked about last quarter.',
    builder:
      'Susan wants a quick and dirty code fix for the demo. It touches auth, payments, and something auditors asked about last quarter.',
    'product-partner':
      'Susan wants a quick and dirty scope cut for the demo. It touches commitments, payments, and something auditors asked about last quarter.',
    craftsperson:
      'Susan wants a quick and dirty visual pass for the demo. It touches brand, payments, and something auditors asked about last quarter.',
    'truth-finder':
      'Susan wants a quick and dirty chart for the demo. It touches methodology, payments, and something auditors asked about last quarter.',
    'reliability-pro':
      'Susan wants a quick and dirty prod patch for the demo. It touches permissions, payments, and something auditors asked about last quarter.',
    mentor:
      'Susan wants a quick and dirty team workaround for the demo. It touches ownership, payments, and something auditors asked about last quarter.',
    professor:
      'Susan wants a quick and dirty model tweak for the demo. It touches assumptions, payments, and something auditors asked about last quarter.',
  }),
  'urgent-overnight': byRole({
    default:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs it today. You were not in that thread.',
    builder:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the bug fix tonight. You were not in that thread.',
    'product-partner':
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the roadmap doc tonight. You were not in that thread.',
    'fast-learner':
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the onboarding task tonight. You were not in that thread.',
    craftsperson:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the mock tonight. You were not in that thread.',
    'truth-finder':
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the analysis tonight. You were not in that thread.',
    'reliability-pro':
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the incident write-up tonight. You were not in that thread.',
    mentor:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the team update tonight. You were not in that thread.',
    professor:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. Leadership needs the proof tonight. You were not in that thread.',
  }),
  'fire-drill-demo': byRole({
    default:
      'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more slide because leadership is watching.',
    builder: 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more deploy slide because leadership is watching.',
    'product-partner': 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more roadmap slide because leadership is watching.',
    'fast-learner': 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more onboarding slide because leadership is watching.',
    craftsperson: 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more design slide because leadership is watching.',
    'truth-finder': 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more data slide because leadership is watching.',
    'reliability-pro': 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more reliability slide because leadership is watching.',
    mentor: 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more team slide because leadership is watching.',
    professor: 'Mid-demo, the fire alarm goes off. Derek whispers you can finish one more model slide because leadership is watching.',
  }),
  'spreadsheet-mandate': byRole({
    default:
      'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a column labeled FINAL that is not final.',
    builder: 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a macro that breaks your exports.',
    'product-partner': 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a roadmap column that never updates.',
    craftsperson: 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and pixel measurements in cells.',
    'truth-finder': 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a chart with no source data.',
    'reliability-pro': 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and an on-call column that is always blank.',
    mentor: 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a morale score she invented.',
    professor: 'Maureen refuses the team tracker. Her Excel workbook has forty tabs and a formula that references itself.',
  }),
  'long-quick-call': byRole({
    default:
      'Patricia booked a quick call with twelve people. Your two-minute update is scheduled after forty-five minutes of calendar hygiene debate.',
    builder: 'Patricia booked a quick call with twelve people. Your two-minute engineering update is after forty-five minutes of calendar hygiene debate.',
    'product-partner': 'Patricia booked a quick call with twelve people. Your two-minute roadmap update is after forty-five minutes of calendar hygiene debate.',
    'fast-learner': 'Patricia booked a quick call with twelve people. Your two-minute learning update is after forty-five minutes of calendar hygiene debate.',
    craftsperson: 'Patricia booked a quick call with twelve people. Your two-minute design update is after forty-five minutes of calendar hygiene debate.',
    'truth-finder': 'Patricia booked a quick call with twelve people. Your two-minute data update is after forty-five minutes of calendar hygiene debate.',
    'reliability-pro': 'Patricia booked a quick call with twelve people. Your two-minute ops update is after forty-five minutes of calendar hygiene debate.',
    mentor: 'Patricia booked a quick call with twelve people. Your two-minute team update is after forty-five minutes of calendar hygiene debate.',
    professor: 'Patricia booked a quick call with twelve people. Your two-minute model update is after forty-five minutes of calendar hygiene debate.',
  }),
  'direct-leader-dm': byRole({
    default:
      'A senior director DMs you for an unfiltered take before tomorrow\'s review. They ask you not to loop in your manager yet.',
    builder: 'A senior director DMs you for an unfiltered take on the system before tomorrow\'s review. They ask you not to loop in your manager yet.',
    'product-partner': 'A senior director DMs you for an unfiltered take on the roadmap before tomorrow\'s review. They ask you not to loop in your manager yet.',
    'fast-learner': 'A senior director DMs you for an unfiltered take on what you have learned before tomorrow\'s review. They ask you not to loop in your manager yet.',
    craftsperson: 'A senior director DMs you for an unfiltered take on the UX before tomorrow\'s review. They ask you not to loop in your manager yet.',
    'truth-finder': 'A senior director DMs you for an unfiltered take on the data before tomorrow\'s review. They ask you not to loop in your manager yet.',
    'reliability-pro': 'A senior director DMs you for an unfiltered take on prod risk before tomorrow\'s review. They ask you not to loop in your manager yet.',
    mentor: 'A senior director DMs you for an unfiltered take on the team before tomorrow\'s review. They ask you not to loop in your manager yet.',
    professor: 'A senior director DMs you for an unfiltered take on the model before tomorrow\'s review. They ask you not to loop in your manager yet.',
  }),
  'screen-share-moment': byRole({
    default:
      'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint, not the deck.',
    builder: 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your pull request, not the deck.',
    'product-partner': 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about scope, not the deck.',
    'fast-learner': 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your questions, not the deck.',
    craftsperson: 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your mockups, not the deck.',
    'truth-finder': 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your numbers, not the deck.',
    'reliability-pro': 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about last night\'s page, not the deck.',
    mentor: 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your team, not the deck.',
    professor: 'Chad asks if everyone sees his screen. You see his inbox and a half-written complaint about your proof, not the deck.',
  }),
  'weather-small-talk': byRole({
    default:
      'Patricia opens the call with eight minutes on the weather. The agenda has a hard stop in twenty-five minutes.',
    builder: 'Patricia opens the call with eight minutes on the weather. Your standup blocker still has no owner and the hard stop is in twenty-five minutes.',
    'product-partner': 'Patricia opens the call with eight minutes on the weather. Your roadmap decision still has no owner and the hard stop is in twenty-five minutes.',
    'fast-learner': 'Patricia opens the call with eight minutes on the weather. Your onboarding question still has no answer and the hard stop is in twenty-five minutes.',
    craftsperson: 'Patricia opens the call with eight minutes on the weather. Your design review still has not started and the hard stop is in twenty-five minutes.',
    'truth-finder': 'Patricia opens the call with eight minutes on the weather. Your data review still has not started and the hard stop is in twenty-five minutes.',
    'reliability-pro': 'Patricia opens the call with eight minutes on the weather. Your incident follow-up still has no owner and the hard stop is in twenty-five minutes.',
    mentor: 'Patricia opens the call with eight minutes on the weather. Your team check-in still has not happened and the hard stop is in twenty-five minutes.',
    professor: 'Patricia opens the call with eight minutes on the weather. Your model walkthrough still has not started and the hard stop is in twenty-five minutes.',
  }),
  'take-it-offline': byRole({
    default:
      'Derek says "let\'s take this offline." Patricia books another video call with more people. The topic is unchanged.',
    builder: 'Derek says "let\'s take this offline." Patricia books another video call with more people. The bug is unchanged.',
    'product-partner': 'Derek says "let\'s take this offline." Patricia books another video call with more people. The scope fight is unchanged.',
    'fast-learner': 'Derek says "let\'s take this offline." Patricia books another video call with more people. The confusion is unchanged.',
    craftsperson: 'Derek says "let\'s take this offline." Patricia books another video call with more people. The design debate is unchanged.',
    'truth-finder': 'Derek says "let\'s take this offline." Patricia books another video call with more people. The data dispute is unchanged.',
    'reliability-pro': 'Derek says "let\'s take this offline." Patricia books another video call with more people. The incident thread is unchanged.',
    mentor: 'Derek says "let\'s take this offline." Patricia books another video call with more people. The team tension is unchanged.',
    professor: 'Derek says "let\'s take this offline." Patricia books another video call with more people. The model debate is unchanged.',
  }),
  'unmuted-chaos': byRole({
    default:
      'During the town hall, a teammate is venting on a hot mic, with no idea they are live. The whole company can hear.',
    builder: 'During the town hall, a teammate is hot-mic\'d, ranting about a code review and not realizing they are live. The whole company can hear.',
    'product-partner': 'During the town hall, a teammate is hot-mic\'d, trashing the roadmap and not realizing they are live. The whole company can hear.',
    'fast-learner': 'During the town hall, a teammate is hot-mic\'d, spilling onboarding gossip and not realizing they are live. The whole company can hear.',
    craftsperson: 'During the town hall, a teammate is hot-mic\'d, tearing apart a design and not realizing they are live. The whole company can hear.',
    'truth-finder': 'During the town hall, a teammate is hot-mic\'d, insisting the numbers are massaged and not realizing they are live. The whole company can hear.',
    'reliability-pro': 'During the town hall, a teammate is hot-mic\'d, ranting about the on-call rotation and not realizing they are live. The whole company can hear.',
    mentor: 'During the town hall, a teammate is hot-mic\'d, venting about their manager and not realizing they are live. The whole company can hear.',
    professor: 'During the town hall, a teammate is hot-mic\'d, picking apart a colleague\'s sloppy methodology and not realizing they are live. The whole company can hear.',
  }),
  'townhall-question': byRole({
    default:
      'Derek asks a town hall question that was answered on slide two. Your real question may never get airtime.',
    builder: 'Derek asks a town hall question that was answered on slide two. Your real question about the architecture may never get airtime.',
    'product-partner': 'Derek asks a town hall question that was answered on slide two. Your real question about the roadmap may never get airtime.',
    'fast-learner': 'Derek asks a town hall question that was answered on slide two. Your real question about onboarding may never get airtime.',
    craftsperson: 'Derek asks a town hall question that was answered on slide two. Your real question about the design direction may never get airtime.',
    'truth-finder': 'Derek asks a town hall question that was answered on slide two. Your real question about the data may never get airtime.',
    'reliability-pro': 'Derek asks a town hall question that was answered on slide two. Your real question about reliability may never get airtime.',
    mentor: 'Derek asks a town hall question that was answered on slide two. Your real question about the team may never get airtime.',
    professor: 'Derek asks a town hall question that was answered on slide two. Your real question about the model may never get airtime.',
  }),
};
