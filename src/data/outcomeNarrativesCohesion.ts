import { CharacterRole } from './characters';
import {
  OMA_MARGA_EMAIL_QUOTES as MARGA,
  OMA_MARGA_EMAIL_TRANSLATIONS as MARGA_EN,
} from '../constants/tributes';

type RoleText = Record<CharacterRole, string>;

/** Role-specific outcome copy aligned with scenario setup hooks. */
export const COHESION_OUTCOME_NARRATIVES: Record<string, Partial<RoleText>> = {
  'late-night-task:yes:0': {
    builder:
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your gym membership weeps silently.',
    'product-partner':
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your dinner reservation weeps silently.',
    'fast-learner':
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your evening study plan weeps silently.',
    craftsperson:
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your yoga class weeps silently.',
    'truth-finder':
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. The evening you protected weeps silently.',
    'reliability-pro':
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your climbing session weeps silently.',
    mentor:
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. Your family group chat went quiet.',
    professor:
      'You stayed. The "small task" took 3 hours and was not reviewed until next Thursday. The chess game you promised to walk through with your grandson never happened.',
  },
  'late-night-task:no:1': {
    builder:
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the whole workout wondering if you are getting fired. Gains: zero.',
    'product-partner':
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent dinner replaying his tone instead of tasting the food. Appetite: zero.',
    'fast-learner':
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the evening re-reading his message instead of your study notes. Focus: zero.',
    craftsperson:
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent yoga class mentally drafting resignation emails. Zen: zero.',
    'truth-finder':
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the walk home replaying his tone instead of decompressing. Relief: zero.',
    'reliability-pro':
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the climbing session wondering if you are getting fired. Sends: zero.',
    mentor:
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. His message hung over family dinner all evening. Peace: zero.',
    professor:
      'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You sat down to review a chess game with your grandson, but your mind stayed at the office. Focus: zero.',
  },
  'meeting-marathon:yes:0': {
    builder:
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. The hotfix you needed to ship is still an unsaved draft.',
    'product-partner':
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. Your roadmap doc still has three TODO slides.',
    'fast-learner':
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. Your notebook is full of acronyms and zero clarity.',
    craftsperson:
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. The design system is still half a library.',
    'truth-finder':
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. The analysis is still half-baked.',
    'reliability-pro':
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. The deploy pipeline is still flaky.',
    mentor:
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. You coached nobody and synced about syncing.',
    professor:
      'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. The proof is still where you left it Friday.',
  },
  'meeting-marathon:yes:1': {
    builder:
      'You accepted the 7th sync. Meeting #4 turned into an architecture riff. You said one sharp thing. A senior director DM\'d "good point." Six other meetings were still nonsense, but that one landed.',
    'product-partner':
      'You accepted the 7th sync. Meeting #4 turned into a scope debate. You cut through it with one clean slide. Patricia looked annoyed. Leadership noticed.',
    'fast-learner':
      'You accepted the 7th sync. Meeting #4 was the only one where someone explained how three teams connect. You asked one good question. Your manager nodded. Still seven meetings.',
    craftsperson:
      'You accepted the 7th sync. Meeting #4 opened Figma on the big screen. Your spacing call became the reference. The other six were still circular.',
    'truth-finder':
      'You accepted the 7th sync. Meeting #4 finally used real numbers. You corrected the chart. The director in the corner wrote your name down.',
    'reliability-pro':
      'You accepted the 7th sync. Meeting #4 became an incident recap. Your timeline was the only coherent part. On-call stopped pinging for ten minutes.',
    mentor:
      'You accepted the 7th sync. Meeting #4 turned into a team tension airing. You reframed it in one sentence. A report messaged "thank you" afterward.',
    professor:
      'You accepted the 7th sync. Meeting #4 drifted into your model assumptions. You clarified the notation. The visiting director said "elegant."',
  },
  'meeting-marathon:no:0': {
    builder:
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and merged a PR before Patricia could book an 8th. Your status said "Deep Work" and people actually respected it.',
    'product-partner':
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and rewrote half the roadmap before Patricia could book an 8th. Your status said "Deep Work" and people actually respected it.',
    'fast-learner':
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and finally mapped how three teams fit together. Your status said "Deep Work" and people actually respected it.',
    craftsperson:
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and finished two design system components. Your status said "Deep Work" and people actually respected it.',
    'truth-finder':
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and finished the experiment analysis. Your status said "Deep Work" and people actually respected it.',
    'reliability-pro':
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and stabilized the deploy pipeline. Your status said "Deep Work" and people actually respected it.',
    mentor:
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and had two real 1:1s over DMs. Your status said "Deep Work" and people actually respected it.',
    professor:
      'You declined the 7th sync. Six meetings still happened, but you kept the open block and made real progress on the proof. Your status said "Deep Work" and people actually respected it.',
  },
  'meeting-marathon:no:1': {
    builder:
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the org restructure readout. Welcome to Synergy Ops. You found out from the wiki.',
    'product-partner':
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the roadmap reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
    'fast-learner':
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the team reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
    craftsperson:
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the design org readout. Welcome to Synergy Ops. You found out from the wiki.',
    'truth-finder':
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the analytics reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
    'reliability-pro':
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the platform reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
    mentor:
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the people reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
    professor:
      'You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the research reorg readout. Welcome to Synergy Ops. You found out from the wiki.',
  },
  'pto-guilt:yes:0': {
    builder:
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. You are also a rock. An inanimate one.',
    'product-partner':
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. Your roadmap doc can wait until never.',
    'fast-learner':
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. Your learning plan collected dust.',
    craftsperson:
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. Your Figma file did not thank you.',
    'truth-finder':
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. The data will outlive you.',
    'reliability-pro':
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. The pager stayed quiet. Suspiciously quiet.',
    mentor:
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. Your team got the weekend. You got guilt.',
    professor:
      'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. The proof advanced. Your soul did not.',
  },
  'pto-guilt:yes:1': {
    builder:
      'You cancelled PTO and used Friday to finish the deploy check early. Your manager called it "proactive." Your soul called it "a cry for help."',
    'product-partner':
      'You cancelled PTO and used Friday to finish the roadmap tweak early. Your manager called it "proactive." Your soul called it "a cry for help."',
    'fast-learner':
      'You cancelled PTO and used Friday to finish the onboarding doc early. Your manager called it "proactive." Your soul called it "a cry for help."',
    craftsperson:
      'You cancelled PTO and used Friday to finish the mockup pass early. Your manager called it "proactive." Your soul called it "a cry for help."',
    'truth-finder':
      'You cancelled PTO and used Friday to finish the data pull early. Your manager called it "proactive." Your soul called it "a cry for help."',
    'reliability-pro':
      'You cancelled PTO and used Friday to finish the prod check early. Your manager called it "proactive." Your soul called it "a cry for help."',
    mentor:
      'You cancelled PTO and used Friday to finish the team note early. Your manager called it "proactive." Your soul called it "a cry for help."',
    professor:
      'You cancelled PTO and used Friday to finish the model review early. Your manager called it "proactive." Your soul called it "a cry for help."',
  },
  'pto-guilt:no:0': {
    builder:
      'You took Friday off. The deploy sync was cancelled anyway. You spent the day at the gym and remembered what sunlight feels like.',
    'product-partner':
      'You took Friday off. The roadmap sync was cancelled anyway. You spent the day offline and remembered what sunlight feels like.',
    'fast-learner':
      'You took Friday off. The onboarding doc could wait. You spent the day reading and remembered what sunlight feels like.',
    craftsperson:
      'You took Friday off. The mockup pass could wait. You spent the day away from screens and remembered what sunlight feels like.',
    'truth-finder':
      'You took Friday off. The data pull could wait. You spent the day with a book and remembered what sunlight feels like.',
    'reliability-pro':
      'You took Friday off. The prod check was handled by someone else. You spent the day unplugged and remembered what sunlight feels like.',
    mentor:
      'You took Friday off. The team note could wait. You spent the day with family and remembered what sunlight feels like.',
    professor:
      'You took Friday off. The model review could wait. You spent the day with your grandson and remembered what sunlight feels like.',
  },
  'pto-guilt:no:1': {
    builder:
      'You took PTO. Derek cc\'d you on 14 emails with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    'product-partner':
      'You took PTO. Derek cc\'d you on 14 roadmap threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    'fast-learner':
      'You took PTO. Derek cc\'d you on 14 onboarding threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    craftsperson:
      'You took PTO. Derek cc\'d you on 14 design threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    'truth-finder':
      'You took PTO. Derek cc\'d you on 14 data requests with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    'reliability-pro':
      'You took PTO. Derek cc\'d you on 14 incident threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    mentor:
      'You took PTO. Derek cc\'d you on 14 team threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
    professor:
      'You took PTO. Derek cc\'d you on 14 model threads with "for when you\'re back." You checked three from the couch. The boundary was decorative.',
  },
  'reorg-rumor:yes:0': {
    builder:
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The group chat kept spiraling anyway.',
    'product-partner':
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The roadmap rumors kept spiraling anyway.',
    'fast-learner':
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The group chat kept spiraling anyway.',
    craftsperson:
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The design-org rumors kept spiraling anyway.',
    'truth-finder':
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The group chat kept spiraling anyway.',
    'reliability-pro':
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The on-call rumors kept spiraling anyway.',
    mentor:
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." Your team heard the rumors in chat first anyway.',
    professor:
      'You asked in the alignment. Your manager gave the corporate smile and said "nothing to worry about." The group chat kept spiraling anyway.',
  },
  'reorg-rumor:yes:1': {
    builder:
      'You asked calmly in the alignment. Your manager gave you a straight answer: your sprint is safe for now. You are now the person who "knows things."',
    'product-partner':
      'You asked calmly in the alignment. Your manager gave you a straight answer: your roadmap lane is safe for now. You are now the person who "knows things."',
    'fast-learner':
      'You asked calmly in the alignment. Your manager gave you a straight answer: your role is safe for now. You are now the person who "knows things."',
    craftsperson:
      'You asked calmly in the alignment. Your manager gave you a straight answer: design priorities are safe for now. You are now the person who "knows things."',
    'truth-finder':
      'You asked calmly in the alignment. Your manager gave you a straight answer: your workstream is safe for now. You are now the person who "knows things."',
    'reliability-pro':
      'You asked calmly in the alignment. Your manager gave you a straight answer: on-call rotation is safe for now. You are now the person who "knows things."',
    mentor:
      'You asked calmly in the alignment. Your manager gave you a straight answer: your team is safe for now. You are now the person who "knows things."',
    professor:
      'You asked calmly in the alignment. Your manager gave you a straight answer: the model work is safe for now. You are now the person who "knows things."',
  },
  'reorg-rumor:no:0': {
    builder:
      'You skipped the alignment and watched the rumors multiply in group chat. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    'product-partner':
      'You played it cool in chat. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    'fast-learner':
      'You stayed vague in chat. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    craftsperson:
      'You played it cool and kept sketching. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    'truth-finder':
      'You played it cool and kept gathering signals. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    'reliability-pro':
      'You played it cool and watched alerts. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
    mentor:
      'You listened in on chat but said nothing. The reorg happened anyway. Your team found out from a calendar invite titled "New Chapter."',
    professor:
      'You played it cool and inferred later. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
  },
  'reorg-rumor:no:1': {
    builder:
      'You stayed vague in chat. Later a veteran coworker pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    'product-partner':
      'You stayed vague in chat. Later someone pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    'fast-learner':
      'You observed quietly in chat. Later a buddy pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    craftsperson:
      'You stayed vague in chat. Later a design lead pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    'truth-finder':
      'You gathered data quietly. Later a peer pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    'reliability-pro':
      'You watched alerts and stayed quiet. Later someone pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    mentor:
      'You listened in without adding fuel. Later a fellow veteran pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
    professor:
      'You inferred from the chatter. Later a colleague pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
  },
  'all-hands-question:yes:0': {
    builder:
      'You unmuted and answered about your work. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    'product-partner':
      'You unmuted and answered about the roadmap bet. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    'fast-learner':
      'You unmuted and answered from your notes. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    craftsperson:
      'You unmuted and answered about the design. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    'truth-finder':
      'You unmuted and answered about the analysis. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    'reliability-pro':
      'You unmuted and answered about the incident fix. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    mentor:
      'You unmuted and answered about your team\'s work. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
    professor:
      'You unmuted and answered about the model. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
  },
  'all-hands-question:yes:1': {
    builder:
      'You spoke up with a sharper technical take than expected. The CEO said "love the ownership." Derek said "great synergy."',
    'product-partner':
      'You spoke up with a sharper roadmap take than expected. The CEO said "love the ownership." Derek said "great synergy."',
    'fast-learner':
      'You spoke up with a sharper answer than expected. The CEO said "love the ownership." Derek said "great synergy."',
    craftsperson:
      'You spoke up with a sharper UX take than expected. The CEO said "love the ownership." Derek said "great synergy."',
    'truth-finder':
      'You spoke up with a sharper data take than expected. The CEO said "love the ownership." Derek said "great synergy."',
    'reliability-pro':
      'You spoke up with a sharper ops take than expected. The CEO said "love the ownership." Derek said "great synergy."',
    mentor:
      'You spoke up with a sharper team story than expected. The CEO said "love the ownership." Derek said "great synergy."',
    professor:
      'You spoke up with a sharper model explanation than expected. The CEO said "love the ownership." Derek said "great synergy."',
  },
  'all-hands-question:no:0': {
    builder:
      'You stayed camera-off. Someone else answered for your work. Leadership nodded along. Your contribution stayed invisible.',
    'product-partner':
      'You stayed camera-off. Derek answered for the roadmap slide. Leadership nodded along. Your contribution stayed invisible.',
    'fast-learner':
      'You stayed camera-off. Someone else answered for your research. Leadership nodded along. Your contribution stayed invisible.',
    craftsperson:
      'You stayed camera-off. Someone else answered for your design. Leadership nodded along. Your contribution stayed invisible.',
    'truth-finder':
      'You stayed camera-off. Someone else answered for your analysis. Leadership nodded along. Your contribution stayed invisible.',
    'reliability-pro':
      'You stayed camera-off. Someone else answered for your incident fix. Leadership nodded along. Your contribution stayed invisible.',
    mentor:
      'You stayed camera-off. Derek answered for your team\'s work. Leadership nodded along. Your team\'s credit stayed invisible.',
    professor:
      'You stayed camera-off. Someone else answered for your model. Leadership nodded along. Your contribution stayed invisible.',
  },
  'all-hands-question:no:1': {
    builder:
      'You stayed camera-off. The CEO moved on. A teammate pinged you after: "Why didn\'t you say anything?" Fair question.',
    'product-partner':
      'You stayed camera-off. The CEO moved on. A stakeholder pinged you after: "Why didn\'t you say anything?" Fair question.',
    'fast-learner':
      'You stayed camera-off. The CEO moved on. Your buddy pinged you after: "Why didn\'t you say anything?" Fair question.',
    craftsperson:
      'You stayed camera-off. The CEO moved on. A designer pinged you after: "Why didn\'t you say anything?" Fair question.',
    'truth-finder':
      'You stayed camera-off. The CEO moved on. A peer pinged you after: "Why didn\'t you say anything?" Fair question.',
    'reliability-pro':
      'You stayed camera-off. The CEO moved on. Your on-call partner pinged you after: "Why didn\'t you say anything?" Fair question.',
    mentor:
      'You stayed camera-off. The CEO moved on. A report pinged you after: "Why didn\'t you speak up for us?" Fair question.',
    professor:
      'You stayed camera-off. The CEO moved on. A colleague pinged you after: "Why didn\'t you say anything?" Fair question.',
  },
  'ten-minute-favor:yes:0': {
    builder:
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The fix held, and your manager quietly noted who saved the release. You missed the gym, but the competence landed.',
    'product-partner':
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The doc held, and your manager quietly noted who saved the launch. You missed dinner, but the competence landed.',
    'fast-learner':
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The cleanup held, and your manager quietly noted how fast you ramped. You missed your study block, but the competence landed.',
    craftsperson:
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The file names are fixed, and your manager quietly noted who saved the handoff. You missed your evening, but the craft landed.',
    'truth-finder':
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The spreadsheet validated, and your manager quietly noted who caught it. You missed your evening, but the rigor landed.',
    'reliability-pro':
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The logs cleared, and your manager quietly noted who kept it stable. You missed your climbing session, but the reliability landed.',
    mentor:
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The team gap was covered, and your manager quietly noted who steadied it. You missed family time, but the leadership landed.',
    professor:
      'You finished at 8 PM. Derek thanked you in a voice note from a bar. The notation is fixed, and your manager quietly noted the precision. You missed chess homework time, but the rigor landed.',
  },
  'unmuted-chaos:yes:1': {
    builder:
      'You unmuted and asked politely. The noise was a standup argument in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    'product-partner':
      'You unmuted and asked politely. The noise was a roadmap debate in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    'fast-learner':
      'You unmuted and asked politely. The noise was onboarding gossip in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    craftsperson:
      'You unmuted and asked politely. The noise was a design critique in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    'truth-finder':
      'You unmuted and asked politely. The noise was someone arguing about numbers in the background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    'reliability-pro':
      'You unmuted and asked politely. The noise was pager chatter in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    mentor:
      'You unmuted and asked politely. The noise was your team venting in someone\'s background. Half the company heard it. HR will have feelings. The mic finally went dead.',
    professor:
      'You unmuted and asked politely. The noise was someone botching a dinner-bill split in the background. Half the company heard it. HR will have feelings. The mic finally went dead.',
  },
  'unmuted-chaos:no:0': {
    builder:
      'You white-knuckled through it. The standup argument in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    'product-partner':
      'You white-knuckled through it. The roadmap debate in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    'fast-learner':
      'You white-knuckled through it. The onboarding gossip in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    craftsperson:
      'You white-knuckled through it. The design critique in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    'truth-finder':
      'You white-knuckled through it. The numbers argument in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    'reliability-pro':
      'You white-knuckled through it. The pager chatter in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    mentor:
      'You white-knuckled through it. Your team venting in the background was somehow more compelling than the town hall. You learned nothing about budget.',
    professor:
      'You white-knuckled through it. The dinner-bill arithmetic in the background was wrong, and resisting the urge to correct it took everything you had. You learned nothing about budget.',
  },
  'demo-day:no:1': {
    builder:
      'You asked to reschedule but the slot went to Chad. He demoed a button that turns blue when you click it. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your architecture never got the room.',
    'product-partner':
      'You asked to reschedule but the slot went to Chad. He demoed one animated roadmap arrow. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your north-star vision never got the room.',
    'fast-learner':
      'You asked to reschedule but the slot went to Chad. He demoed a clickable prototype with one working button. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your project never got the room.',
    craftsperson:
      'You asked to reschedule but the slot went to Chad. He demoed a hover state that changes color. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your design never got the room.',
    'truth-finder':
      'You asked to reschedule but the slot went to Chad. He demoed a chart with one conditional-format rule. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your analysis never got the room.',
    'reliability-pro':
      'You asked to reschedule but the slot went to Chad. He demoed a dashboard tile that turns green. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your incident fix never got the room.',
    mentor:
      'You asked to reschedule but the slot went to Chad. He demoed a team slide with one morale metric. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your team\'s work never got the room.',
    professor:
      'You asked to reschedule but the slot went to Chad. He demoed a slide with one highlighted equation. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your model never got the room.',
  },
  'ai-wrapper-demo:yes:0': {
    builder:
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "engineering is still ironing out the bugs." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    'product-partner':
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still ironing out the roadmap." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    'fast-learner':
      'You let Derek run the demo. He oversold what the tool was supposed to do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still ironing out the pilot." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    craftsperson:
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "design is still ironing out the flow." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    'truth-finder':
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still ironing out the data." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    'reliability-pro':
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still ironing out the rollout." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    mentor:
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "your team is still ironing out the bugs." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
    professor:
      'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still validating the model." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
  },
  'lunch-steal:no:0': {
    builder:
      'You ordered delivery and ate at your desk while refreshing GitHub trending. The food was mid. You missed the window to fix the bug you promised before standup.',
    'product-partner':
      'You grabbed a sad desk salad before the roadmap review and ate it staring at three TODO slides. The review went badly. Your resentment, however, was perfectly seasoned.',
    'fast-learner':
      'You ordered cheap delivery and ate at your desk while rereading the process doc. Still hungry for clarity. The afternoon stayed fuzzy.',
    craftsperson:
      'You ordered delivery and ate at your desk while fixing file names. The food was mid. The mockups did not move. Your resentment, however, was perfectly seasoned.',
    'truth-finder':
      'You ordered delivery and ran the numbers on how much this job costs you. The answer was depressing. You ate at your desk anyway and got nothing else done.',
    'reliability-pro':
      'You ate protein bars between incident pages and called it lunch. The pager owned your afternoon. Delivery would at least have felt like a choice.',
    mentor:
      'You ordered delivery and ate at your desk while modeling grace for the team. Nobody noticed the grace. You were still starving and behind on feedback notes.',
    professor:
      'You ordered a faculty-club sandwich and ate at your desk while pondering entropy. The notes for your afternoon block stayed blank.',
  },
  'lunch-steal:no:1': {
    builder:
      'You ordered delivery and walked while you waited. You came back, fixed one bug, and made standup without sounding bitter. Small win. Jessica who?',
    'product-partner':
      'You ordered delivery and walked while you waited. You made the roadmap review on time, calmer if not brilliant. Nobody asked about your lunch. Jessica who?',
    'fast-learner':
      'You ordered delivery and walked while you waited. One process doc finally clicked on the walk back. Not a feast, but your head cleared. Jessica who?',
    craftsperson:
      'You ordered delivery and walked while you waited. You came back and finished one screen without rage-updating the padding. Jessica who?',
    'truth-finder':
      'You ordered delivery and walked while you waited. You came back, logged the lunch cost in your personal spreadsheet, and closed one real chart. Jessica who?',
    'reliability-pro':
      'You ordered delivery and walked while you waited. You came back, cleared one alert, and did not snap in the war room. Jessica who?',
    mentor:
      'You ordered delivery and walked while you waited. You came back and sent two thoughtful DMs instead of one passive-aggressive thread. Jessica who?',
    professor:
      'You ordered delivery and walked while you waited. You came back and finished one lemma without drafting a resignation letter. Jessica who?',
  },
  'peer-callout:yes:0': {
    builder:
      'You replied in the thread with the bug\'s root cause and the fix. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    'product-partner':
      'You replied in the thread explaining the scope miss and the recovery plan. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    'fast-learner':
      'You replied in the thread fixing the onboarding doc line by line. It read like a junior panicking. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    craftsperson:
      'You replied in the thread with before/after screenshots of the UI fix. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    'truth-finder':
      'You replied in the thread tracing the data discrepancy to its source. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    'reliability-pro':
      'You replied in the thread explaining the missed deploy step and the patch. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    mentor:
      'You replied in the thread filling the gap in the team update. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
    professor:
      'You replied in the thread defending the model assumption with three citations. It read defensive anyway. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
  },
  'peer-callout:yes:1': {
    builder:
      'You owned the bug cleanly, linked the fix, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    'product-partner':
      'You owned the scope miss cleanly, outlined the adjustment, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    'fast-learner':
      'You owned the doc mistake cleanly, posted the corrected version, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    craftsperson:
      'You owned the UI inconsistency cleanly, shipped the corrected screens, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    'truth-finder':
      'You owned the discrepancy cleanly, posted the corrected numbers, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    'reliability-pro':
      'You owned the missed step cleanly, updated the runbook, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    mentor:
      'You owned the gap cleanly, credited the team\'s actual wins, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
    professor:
      'You owned the shaky assumption cleanly, posted the corrected derivation, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
  },
  'peer-callout:no:0': {
    builder:
      'You DM\'d Blake and fixed the bug quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    'product-partner':
      'You DM\'d Blake and patched the scope quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    'fast-learner':
      'You DM\'d Blake and corrected the onboarding doc quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    craftsperson:
      'You DM\'d Blake and fixed the UI inconsistency quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    'truth-finder':
      'You DM\'d Blake and corrected the numbers quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    'reliability-pro':
      'You DM\'d Blake and patched the deploy gap quietly. Mature, professional, done. Your boss never knew. Blake paged them anyway an hour later.',
    mentor:
      'You DM\'d Blake and updated the team summary quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
    professor:
      'You DM\'d Blake and tightened the assumption quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
  },
  'peer-callout:no:1': {
    builder:
      'You took it offline. Blake apologized for the public flag. You fixed the bug together before the morning meeting. Your boss only saw the solution.',
    'product-partner':
      'You took it offline. Blake apologized for the public flag. You reworked the scope together before the morning meeting. Your boss only saw the solution.',
    'fast-learner':
      'You took it offline. Blake apologized for the public flag. You fixed the onboarding doc together before the morning meeting. Your boss only saw the corrected version.',
    craftsperson:
      'You took it offline. Blake apologized for the public flag. You aligned the screens together before the morning meeting. Your boss only saw the solution.',
    'truth-finder':
      'You took it offline. Blake apologized for the public flag. You reconciled the numbers together before the morning meeting. Your boss only saw the solution.',
    'reliability-pro':
      'You took it offline. Blake apologized for the public flag. You closed the deploy gap together before the morning meeting. Your boss only saw the solution.',
    mentor:
      'You took it offline. Blake apologized for the public flag. You completed the team update together before the morning meeting. Your boss only saw the solution.',
    professor:
      'You took it offline. Blake apologized for the public flag. You reworked the assumption together before the morning meeting. Your boss only saw the solution.',
  },
  'townhall-question:yes:0': {
    builder:
      'You asked a sharp question about the architecture after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    'product-partner':
      'You asked a sharp question about the roadmap after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    'fast-learner':
      'You asked a sharp question about onboarding after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    craftsperson:
      'You asked a sharp question about the design direction after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    'truth-finder':
      'You asked a sharp, data-backed question after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    'reliability-pro':
      'You asked a sharp question about reliability after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    mentor:
      'You asked a sharp question about the team after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
    professor:
      'You asked a sharp question about the model after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
  },
  'townhall-question:yes:1': {
    builder:
      'You tried to jump in with your architecture question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a wiki page that does not exist.',
    'product-partner':
      'You tried to jump in with your roadmap question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried on a slide that does not exist.',
    'fast-learner':
      'You tried to jump in with your onboarding question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a doc that does not exist.',
    craftsperson:
      'You tried to jump in with your design question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a Figma comment that does not exist.',
    'truth-finder':
      'You tried to jump in with your data question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a dataset that does not exist.',
    'reliability-pro':
      'You tried to jump in with your on-call question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a runbook that does not exist.',
    mentor:
      'You tried to jump in with your team question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a 1:1 note that does not exist.',
    professor:
      'You tried to jump in with your model question, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a proof appendix that does not exist.',
  },
  'townhall-question:no:0': {
    builder:
      'You let it go. The town hall ended on time. You never got a straight answer on the architecture. Someone will tell you eventually. Probably in a meeting.',
    'product-partner':
      'You let it go. The town hall ended on time. You never got a straight answer on the roadmap. Someone will tell you eventually. Probably in a meeting.',
    'fast-learner':
      'You let it go. The town hall ended on time. You never got a straight answer on onboarding. Someone will tell you eventually. Probably in a meeting.',
    craftsperson:
      'You let it go. The town hall ended on time. You never got a straight answer on the design direction. Someone will tell you eventually. Probably in a meeting.',
    'truth-finder':
      'You let it go. The town hall ended on time. You never got a straight answer on the data. Someone will tell you eventually. Probably in a meeting.',
    'reliability-pro':
      'You let it go. The town hall ended on time. You never got a straight answer about the on-call changes. Someone will tell you eventually. Probably in a meeting.',
    mentor:
      'You let it go. The town hall ended on time. You never got a straight answer about the team. Someone will tell you eventually. Probably in a meeting.',
    professor:
      'You let it go. The town hall ended on time. You never got a straight answer on the model. Someone will tell you eventually. Probably in a meeting.',
  },
  'townhall-question:no:1': {
    builder:
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your architecture question is still unanswered.',
    'product-partner':
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your roadmap question is still unanswered.',
    'fast-learner':
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your onboarding question is still unanswered.',
    craftsperson:
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your design question is still unanswered.',
    'truth-finder':
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your data question is still unanswered.',
    'reliability-pro':
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your reliability question is still unanswered.',
    mentor:
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your team question is still unanswered.',
    professor:
      'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. Your model question is still unanswered.',
  },
  // Fast Learner is junior: Ryan is a fellow newcomer, not "your junior".
  'performance-review:yes:0': {
    'fast-learner':
      'You walked your manager through the project: which parts you carried, what you figured out alone at 9 PM. They nodded along. Calibration still crowned Ryan, because leadership already knew his name. Yours got "promising." Promising does not pay rent.',
  },
  'performance-review:yes:1': {
    'fast-learner':
      'You laid out your work with receipts. Your manager added a paragraph about your potential and the late nights you put in. Better on paper. Calibration has to read what is written.',
  },
  'performance-review:no:1': {
    'fast-learner':
      'You stayed humble. Your manager corrected the draft after calibration and got your paragraph added. Half the team uses your notes. This time the document said so.',
  },
  'performance-review:no:0': {
    'fast-learner':
      'You let the work speak. It did not have a microphone. Calibration called Ryan "the standout new joiner." You got "solid." You did most of the work. The review read like you watched.',
  },
  'exec-roundtable:yes:0': {
    'fast-learner':
      'You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing Ryan. You spoke up anyway and answered what you could. Afterwards someone said you "seemed eager." You are new, so eager is survivable.',
  },
  'exec-roundtable:yes:1': {
    'fast-learner':
      'You asked to join as the person actually doing the work. They made space. You walked through what you had built without overselling it. Leadership finally learned your name. Not bad for the newest person in the room.',
  },
  'exec-roundtable:no:0': {
    'fast-learner':
      'You handed Ryan your notes and he shone upstairs. The recap email credited "the team" and named him twice. Nobody mentioned the prep was yours. You are new enough that nobody thought to ask.',
  },
  'exec-roundtable:no:1': {
    'fast-learner':
      'You briefed him on the key points. He repeated them upstairs and leadership replied "great energy." Your manager made sure your name was on the recap email too.',
  },
  'oma-marga-call:yes:0': {
    builder:
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any standup this week had managed.`,
    'product-partner':
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any roadmap review this week had managed.`,
    'fast-learner':
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any onboarding session this week had managed.`,
    craftsperson:
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any design review this week had managed.`,
    'truth-finder':
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any readout this week had managed.`,
    'reliability-pro':
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any postmortem this week had managed.`,
    mentor:
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any one-on-one this week had managed.`,
    professor:
      `You picked up. "Did you get my email?" Not hello. You said you had, and that one line in it stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any faculty meeting this week had managed.`,
  },
  'oma-marga-call:yes:1': {
    builder:
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your tickets went faster than they had any right to, and the first thing you did after was reply to her email.`,
    'product-partner':
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your reviews went faster than they had any right to, and the first thing you did after was reply to her email.`,
    'fast-learner':
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your tasks went faster than they had any right to, and the first thing you did after was reply to her email.`,
    craftsperson:
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your mockups went faster than they had any right to, and the first thing you did after was reply to her email.`,
    'truth-finder':
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your analysis went faster than it had any right to, and the first thing you did after was reply to her email.`,
    'reliability-pro':
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your checks went faster than they had any right to, and the first thing you did after was reply to her email.`,
    mentor:
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your 1:1s went faster than they had any right to, and the first thing you did after was reply to her email.`,
    professor:
      `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your proofs went faster than they had any right to, and the first thing you did after was reply to her email.`,
  },
  'oma-marga-call:no:0': {
    builder:
      `You sent it to voicemail and finished the thread. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    'product-partner':
      `You sent it to voicemail and finished the deck. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    'fast-learner':
      `You sent it to voicemail and finished the task. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    craftsperson:
      `You sent it to voicemail and finished the screen. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    'truth-finder':
      `You sent it to voicemail and finished the chart. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    'reliability-pro':
      `You sent it to voicemail and closed the ticket. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    mentor:
      `You sent it to voicemail and finished the sync. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
    professor:
      `You sent it to voicemail and finished the proof. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" You opened it on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
  },
  'oma-marga-call:no:1': {
    builder:
      `You silenced the call and pushed through the deploy. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    'product-partner':
      `You silenced the call and pushed through the review. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    'fast-learner':
      `You silenced the call and pushed through the module. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    craftsperson:
      `You silenced the call and pushed through the handoff. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    'truth-finder':
      `You silenced the call and pushed through the analysis. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    'reliability-pro':
      `You silenced the call and pushed through the checklist. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    mentor:
      `You silenced the call and pushed through the team fire. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
    professor:
      `You silenced the call and pushed through the draft. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
  },
};
