import { CharacterRole } from './characters';

type RoleText = Record<CharacterRole, string>;

/**
 * Role-specific outcome copy, keyed by `scenarioId:choice:outcomeIndex`.
 *
 * Single source of truth: every entry is a complete, authored string. There is no
 * runtime substring substitution, so edits here cannot introduce grammar artifacts.
 * To personalize an outcome for a role, edit (or add) that role's full sentence below.
 */
export const COHESION_OUTCOME_NARRATIVES: Record<string, Partial<RoleText>> = {
  "late-night-task:yes:0": {
    "builder": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your gym membership weeps silently.",
    "product-partner": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your dinner reservation weeps silently.",
    "fast-learner": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your evening study plan weeps silently.",
    "craftsperson": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your yoga class weeps silently.",
    "truth-finder": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. The evening you protected weeps silently.",
    "reliability-pro": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your climbing session weeps silently.",
    "mentor": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. Your family group chat went quiet.",
    "professor": "You stayed. The \"small task\" took 3 hours and was not reviewed until next Thursday. The chess game you promised to walk through with your grandson never happened."
  },
  "late-night-task:yes:1": {
    "builder": "Plot twist: the CEO saw your commit at 8 PM and mentioned it in the all-hands. Derek reacted with a thumbs-up in the channel. Exhausting, but vindicated.",
    "product-partner": "Plot twist: the CEO loved your late-night roadmap update and mentioned it in the all-hands. Patricia DM'd: \"Good hustle.\" Your dinner was late, not lost.",
    "fast-learner": "Plot twist: leadership noticed your thorough research doc and mentioned it in the all-hands. Your manager said \"good initiative.\" The stack makes more sense now.",
    "craftsperson": "Plot twist: the CEO loved the midnight mockup polish and mentioned it in the all-hands. The design lead DM'd thanks. Worth skipping one yoga class.",
    "truth-finder": "Plot twist: the CEO cited your late-night analysis in the all-hands. The deck actually used your numbers. The evening cost you sleep, not credibility.",
    "reliability-pro": "Plot twist: leadership saw the health check you ran at 8 PM and mentioned it in the all-hands. On-call respects you more today. Climbing can wait until Saturday.",
    "mentor": "Plot twist: leadership loved the growth plan you refined at 8 PM and mentioned it in the all-hands. A report replied: \"Glad you are steering us.\" You made it home before everyone was asleep.",
    "professor": "Plot twist: leadership cited your model revision in the all-hands. You got home late, but your grandson was still up. He wanted to hear about \"the forecast lady\" before the chess board came out."
  },
  "late-night-task:no:0": {
    "builder": "You crushed leg day, slept like a baby, and came in the next morning with fresh eyes. The task took 20 minutes.",
    "product-partner": "You made your dinner reservation, slept well, and knocked out the roadmap update in 20 minutes the next morning.",
    "fast-learner": "You logged off on time, slept well, and finished the research task in 20 minutes with a clear head.",
    "craftsperson": "You made yoga, slept well, and fixed the mockups in 20 minutes the next morning.",
    "truth-finder": "You left on time, slept well, and pulled the data in 20 minutes before your first coffee.",
    "reliability-pro": "You hit the climbing gym, slept well, and ran the health check in 20 minutes the next morning.",
    "mentor": "You made it home for dinner, slept well, and refined the growth plan in 20 minutes before standup.",
    "professor": "You reviewed the chess game with your grandson, slept well, and fixed the lemma in 20 minutes over morning tea."
  },
  "late-night-task:no:1": {
    "builder": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent the whole workout wondering if you are getting fired. Gains: zero.",
    "product-partner": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent dinner replaying his tone instead of tasting the food. Appetite: zero.",
    "fast-learner": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent the evening re-reading his message instead of your study notes. Focus: zero.",
    "craftsperson": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent yoga class mentally drafting resignation emails. Zen: zero.",
    "truth-finder": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent the walk home replaying his tone instead of decompressing. Relief: zero.",
    "reliability-pro": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You spent the climbing session wondering if you are getting fired. Sends: zero.",
    "mentor": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. His message hung over family dinner all evening. Peace: zero.",
    "professor": "You left, but Derek sent a passive-aggressive \"no worries!\" at 5:17 PM. You sat down to review a chess game with your grandson, but your mind stayed at the office. Focus: zero."
  },
  "meeting-marathon:yes:0": {
    "builder": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. The hotfix you needed to ship is still an unsaved draft.",
    "product-partner": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. Your roadmap doc still has three TODO slides.",
    "fast-learner": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. Your notebook is full of acronyms and zero clarity.",
    "craftsperson": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. The design system is still half a library.",
    "truth-finder": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. The analysis is still half-baked.",
    "reliability-pro": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. The deploy pipeline is still flaky.",
    "mentor": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. You coached nobody and synced about syncing.",
    "professor": "You accepted the 7th sync. Seven meetings deep, five ended with \"let's take this offline\" and another calendar invite. The proof is still where you left it Friday."
  },
  "meeting-marathon:yes:1": {
    "builder": "You accepted the 7th sync. Meeting #4 turned into an architecture riff. You said one sharp thing. A senior director DM'd \"good point.\" Six other meetings were still nonsense, but that one landed.",
    "product-partner": "You accepted the 7th sync. Meeting #4 turned into a scope debate. You cut through it with one clean slide. Patricia looked annoyed. Leadership noticed.",
    "fast-learner": "You accepted the 7th sync. Meeting #4 was the only one where someone explained how three teams connect. You asked one good question. Your manager nodded. Still seven meetings.",
    "craftsperson": "You accepted the 7th sync. Meeting #4 opened Figma on the big screen. Your spacing call became the reference. The other six were still circular.",
    "truth-finder": "You accepted the 7th sync. Meeting #4 finally used real numbers. You corrected the chart. The director in the corner wrote your name down.",
    "reliability-pro": "You accepted the 7th sync. Meeting #4 became an incident recap. Your timeline was the only coherent part. On-call stopped pinging for ten minutes.",
    "mentor": "You accepted the 7th sync. Meeting #4 turned into a team tension airing. You reframed it in one sentence. A report messaged \"thank you\" afterward.",
    "professor": "You accepted the 7th sync. Meeting #4 drifted into your model assumptions. You clarified the notation. The visiting director said \"elegant.\""
  },
  "meeting-marathon:no:0": {
    "builder": "You declined the 7th sync. Six meetings still happened, but you kept the open block and merged a PR before Patricia could book an 8th. Your status said \"Deep Work\" and people actually respected it.",
    "product-partner": "You declined the 7th sync. Six meetings still happened, but you kept the open block and rewrote half the roadmap before Patricia could book an 8th. Your status said \"Deep Work\" and people actually respected it.",
    "fast-learner": "You declined the 7th sync. Six meetings still happened, but you kept the open block and finally mapped how three teams fit together. Your status said \"Deep Work\" and people actually respected it.",
    "craftsperson": "You declined the 7th sync. Six meetings still happened, but you kept the open block and finished two design system components. Your status said \"Deep Work\" and people actually respected it.",
    "truth-finder": "You declined the 7th sync. Six meetings still happened, but you kept the open block and finished the experiment analysis. Your status said \"Deep Work\" and people actually respected it.",
    "reliability-pro": "You declined the 7th sync. Six meetings still happened, but you kept the open block and stabilized the deploy pipeline. Your status said \"Deep Work\" and people actually respected it.",
    "mentor": "You declined the 7th sync. Six meetings still happened, but you kept the open block and had two real 1:1s over DMs. Your status said \"Deep Work\" and people actually respected it.",
    "professor": "You declined the 7th sync. Six meetings still happened, but you kept the open block and made real progress on the proof. Your status said \"Deep Work\" and people actually respected it."
  },
  "meeting-marathon:no:1": {
    "builder": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the org restructure readout. Welcome to Synergy Ops. You found out from the wiki.",
    "product-partner": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the roadmap reorg readout. Welcome to Synergy Ops. You found out from the wiki.",
    "fast-learner": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the team reorg readout. Welcome to Synergy Ops. You found out from the wiki.",
    "craftsperson": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the design org readout. Welcome to Synergy Ops. You found out from the wiki.",
    "truth-finder": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the analytics reorg readout. Welcome to Synergy Ops. You found out from the wiki.",
    "reliability-pro": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the platform reorg readout. Welcome to Synergy Ops. You found out from the wiki.",
    "mentor": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the people reorg readout. Welcome to Synergy Ops. You found out from the wiki.",
    "professor": "You declined the 7th sync. Six brutal meetings still wrecked your morning. Then you learned the 7th was the research reorg readout. Welcome to Synergy Ops. You found out from the wiki."
  },
  "lunch-steal:yes:0": {
    "builder": "You confronted Jessica. She denied everything despite having sriracha on her blouse. Security got involved. You now have a \"conflict resolution plan.\" Your lunch is still gone.",
    "product-partner": "You confronted Jessica. She denied everything despite having sriracha on her blouse. HR got involved. You now have a \"stakeholder alignment plan.\" Your lunch is still gone.",
    "truth-finder": "You confronted Jessica. She denied the receipt evidence despite having sriracha on her blouse. Audit got involved. You now have a \"conflict resolution plan.\" Your lunch is still gone.",
    "reliability-pro": "You confronted Jessica. She denied everything despite having sriracha on her blouse. Facilities got involved. You now have an \"incident postmortem plan.\" Your lunch is still gone.",
    "mentor": "You confronted Jessica. She denied everything despite having sriracha on her blouse. HR got involved. You now have a \"team norms doc.\" Your lunch is still gone.",
    "professor": "You confronted Jessica. She denied everything despite having red-pen on her proof. Ethics board got involved. You now have a \"conflict resolution plan.\" Your lunch is still gone."
  },
  "lunch-steal:yes:1": {
    "builder": "You confronted Jessica politely and she broke down crying. Turns out she's going through stuff. You bonded over leftover pizza. You now have an ally in engineering who \"knows things.\" Your 2 PM went better because of it.",
    "product-partner": "You confronted Jessica politely and she broke down crying. Turns out she's going through stuff. You bonded over leftover pizza. You now have an ally in accounting who \"knows the roadmap.\" Your 2 PM went better because of it.",
    "fast-learner": "You confronted Jessica politely and she broke down crying. Turns out she's going through stuff. You bonded over onboarding tips. You now have an ally in accounting who \"knows things.\" Your 2 PM went better because of it.",
    "truth-finder": "You confronted Jessica politely and she broke down crying. Turns out she's going through stuff. You bonded over leftover pizza. You now have an ally in accounting who \"knows the numbers.\" Your 2 PM went better because of it.",
    "mentor": "You confronted Jessica politely and she broke down crying. Turns out she's going through stuff. You bonded over team lunch trauma. You now have an ally in people ops who \"knows things.\" Your 2 PM went better because of it."
  },
  "lunch-steal:no:0": {
    "builder": "You ordered delivery and ate at your desk while refreshing GitHub trending. The food was mid. You missed the window to fix the bug you promised before standup.",
    "product-partner": "You grabbed a sad desk salad before the roadmap review and ate it staring at three TODO slides. The review went badly. Your resentment, however, was perfectly seasoned.",
    "fast-learner": "You ordered cheap delivery and ate at your desk while rereading the process doc. Still hungry for clarity. The afternoon stayed fuzzy.",
    "craftsperson": "You ordered delivery and ate at your desk while fixing file names. The food was mid. The mockups did not move. Your resentment, however, was perfectly seasoned.",
    "truth-finder": "You ordered delivery and ran the numbers on how much this job costs you. The answer was depressing. You ate at your desk anyway and got nothing else done.",
    "reliability-pro": "You ate protein bars between incident pages and called it lunch. The pager owned your afternoon. Delivery would at least have felt like a choice.",
    "mentor": "You ordered delivery and ate at your desk while modeling grace for the team. Nobody noticed the grace. You were still starving and behind on feedback notes.",
    "professor": "You ordered a faculty-club sandwich and ate at your desk while pondering entropy. The notes for your afternoon block stayed blank."
  },
  "lunch-steal:no:1": {
    "builder": "You ordered delivery and walked while you waited. You came back, fixed one bug, and made standup without sounding bitter. Small win. Jessica who?",
    "product-partner": "You ordered delivery and walked while you waited. You made the roadmap review on time, calmer if not brilliant. Nobody asked about your lunch. Jessica who?",
    "fast-learner": "You ordered delivery and walked while you waited. One process doc finally clicked on the walk back. Not a feast, but your head cleared. Jessica who?",
    "craftsperson": "You ordered delivery and walked while you waited. You came back and finished one screen without rage-updating the padding. Jessica who?",
    "truth-finder": "You ordered delivery and walked while you waited. You came back, logged the lunch cost in your personal spreadsheet, and closed one real chart. Jessica who?",
    "reliability-pro": "You ordered delivery and walked while you waited. You came back, cleared one alert, and did not snap in the war room. Jessica who?",
    "mentor": "You ordered delivery and walked while you waited. You came back and sent two thoughtful DMs instead of one passive-aggressive thread. Jessica who?",
    "professor": "You ordered delivery and walked while you waited. You came back and finished one lemma without drafting a resignation letter. Jessica who?"
  },
  "slack-fire:yes:0": {
    "builder": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you a \"centrist coder.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "product-partner": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"the roadmap centrist.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "fast-learner": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"process-pilled.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "craftsperson": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"the padding moderate.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "truth-finder": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"statistically naive.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "reliability-pro": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"the deploy coward.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "mentor": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"the culture centrist.\" You've been subtweeted in off-topic chat for 3 days straight.",
    "professor": "You posted a thoughtful, balanced take. Both sides hated it. Someone called you \"a frequentist dinosaur.\" You've been subtweeted in off-topic chat for 3 days straight."
  },
  "slack-fire:yes:1": {
    "fast-learner": "You dropped an absolutely legendary Stack Overflow link that unified both factions in laughter. A senior director reacted with 🏆. You are now the unofficial office diplomat.",
    "craftsperson": "You dropped an absolutely legendary meme that unified both factions in laughter. A VP of Design reacted with 🏆. You are now the unofficial office diplomat.",
    "mentor": "You dropped an absolutely legendary team-building meme that unified both factions in laughter. A senior director reacted with 🏆. You are now the unofficial team diplomat.",
    "professor": "You dropped an absolutely legendary proof meme that unified both factions in laughter. A senior director reacted with 🏆. You are now the unofficial office diplomat."
  },
  "slack-fire:no:0": {
    "builder": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your PR got approved while you were gone.",
    "product-partner": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your roadmap doc got approved while you were gone.",
    "fast-learner": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your onboarding doc got a thumbs up while you were gone.",
    "craftsperson": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your design review got approved while you were gone.",
    "truth-finder": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your analysis got signed off while you were gone.",
    "reliability-pro": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your incident postmortem got approved while you were gone.",
    "mentor": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your team feedback summary got praise while you were gone.",
    "professor": "You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your model review got approved while you were gone."
  },
  "demo-day:yes:0": {
    "builder": "You winged it. The app crashed live, then a VP asked the one thing your 40% could not do. \"That's a known issue\" only stretches so far. Leadership left unconvinced, and the missing half was now on record as yours.",
    "product-partner": "You winged it. The roadmap had obvious holes, and a VP asked about the 40% you had not built yet. \"That's on the roadmap\" only stretches so far. Leadership left unconvinced, and the gaps were now on record as yours.",
    "fast-learner": "You winged it. A VP asked the one question your 40% could not answer, and \"still ramping up\" only stretches so far. Leadership left unconvinced. As the new hire, the shaky demo became the thing they remembered about you.",
    "craftsperson": "You winged it. The prototype froze, then a VP poked at the 40% of flows that did not exist yet. \"That's a known issue\" only stretches so far. Leadership left unconvinced, and the half-built flows were now on record as yours.",
    "truth-finder": "You winged it. A chart loaded with placeholder numbers, then a VP asked about the 40% you had not validated. \"That's the exploratory view\" only stretches so far. Leadership left unconvinced, and the unbacked claims were now on record as yours.",
    "reliability-pro": "You winged it. The dashboard showed N/A live, then a VP asked about the 40% you had not instrumented. \"That's expected in staging\" only stretches so far. Leadership left unconvinced, and the blind spots were now on record as yours.",
    "mentor": "You winged it. Half the team-health slides were still templates, and a VP asked about the 40% you had not gathered. \"We're still collecting signal\" only stretches so far. Leadership left unconvinced, and the gaps were now on record as yours.",
    "professor": "You winged it. A slide had a notation error, then a VP pressed on the 40% of the proof you had not finished. \"That's a draft lemma\" only stretches so far. Leadership left unconvinced, and the holes were now on record as yours."
  },
  "demo-day:yes:1": {
    "builder": "Murphy's Law went on vacation. The demo worked PERFECTLY on the happy path you showed. Leadership loved it. You are now the face of Q3 innovation. The console.logs are your little secret.",
    "product-partner": "Murphy's Law went on vacation. The roadmap review landed perfectly. Leadership loved it. You are now the face of Q3 strategy. The TODO slides are your little secret.",
    "fast-learner": "Murphy's Law went on vacation. Your onboarding findings presentation was sharp and curious. Leadership loved it. You are now \"the thoughtful new hire.\"",
    "craftsperson": "Murphy's Law went on vacation. The flow walkthrough was flawless on the big screen. Leadership loved it. You are now the face of Q3 design. final_final_v2 is your little secret.",
    "truth-finder": "Murphy's Law went on vacation. The experiment readout was crisp and convincing. Leadership loved it. You are now the face of Q3 insights. The loading confidence intervals are your little secret.",
    "reliability-pro": "Murphy's Law went on vacation. The reliability dashboard behaved on the big screen. Leadership loved it. You are now the face of Q3 stability. The one working chart carried the room.",
    "mentor": "Murphy's Law went on vacation. Your team health update was warm and credible. Leadership loved it. You are now the face of Q3 people leadership. \"Insert wins here\" never showed.",
    "professor": "Murphy's Law went on vacation. The model overview was elegant and clear. Leadership loved it. You are now the face of Q3 research. The missing lemma is your little secret."
  },
  "demo-day:no:0": {
    "builder": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You shipped something polished and got genuine applause. Integrity: 1, Panic: 0.",
    "product-partner": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You delivered a tight roadmap review and got genuine applause. Integrity: 1, Panic: 0.",
    "fast-learner": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You gave a sharp presentation and got genuine applause. Integrity: 1, Panic: 0.",
    "craftsperson": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You walked through polished flows and got genuine applause. Integrity: 1, Panic: 0.",
    "truth-finder": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You delivered a rigorous readout and got genuine applause. Integrity: 1, Panic: 0.",
    "reliability-pro": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You demoed a solid reliability update and got genuine applause. Integrity: 1, Panic: 0.",
    "mentor": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You gave a thoughtful team update and got genuine applause. Integrity: 1, Panic: 0.",
    "professor": "You asked to reschedule. Your manager respected the honesty and gave you two more days. You presented the complete proof and got genuine applause. Integrity: 1, Panic: 0."
  },
  "demo-day:no:1": {
    "builder": "You asked to reschedule but the slot went to Chad. He demoed a button that turns blue when you click it. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your architecture never got the room.",
    "product-partner": "You asked to reschedule but the slot went to Chad. He demoed one animated roadmap arrow. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your north-star vision never got the room.",
    "fast-learner": "You asked to reschedule but the slot went to Chad. He demoed a clickable prototype with one working button. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your project never got the room.",
    "craftsperson": "You asked to reschedule but the slot went to Chad. He demoed a hover state that changes color. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your design never got the room.",
    "truth-finder": "You asked to reschedule but the slot went to Chad. He demoed a chart with one conditional-format rule. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your analysis never got the room.",
    "reliability-pro": "You asked to reschedule but the slot went to Chad. He demoed a dashboard tile that turns green. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your incident fix never got the room.",
    "mentor": "You asked to reschedule but the slot went to Chad. He demoed a team slide with one morale metric. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your team's work never got the room.",
    "professor": "You asked to reschedule but the slot went to Chad. He demoed a slide with one highlighted equation. That was the whole pitch. Leadership LOVED it. Chad is now \"Chad the Innovator.\" Your model never got the room."
  },
  "pto-guilt:yes:0": {
    "product-partner": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. Your roadmap doc can wait until never.",
    "fast-learner": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. Your learning plan collected dust.",
    "craftsperson": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. Your Figma file did not thank you.",
    "truth-finder": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. The data will outlive you.",
    "reliability-pro": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. The pager stayed quiet. Suspiciously quiet.",
    "mentor": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. Your team got the weekend. You got guilt.",
    "professor": "You cancelled PTO. Derek said \"thanks, you're a rock.\" You worked Friday while everyone else posted beach photos. The proof advanced. Your soul did not."
  },
  "pto-guilt:yes:1": {
    "builder": "You cancelled PTO and used Friday to finish the deploy check early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "product-partner": "You cancelled PTO and used Friday to finish the roadmap tweak early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "fast-learner": "You cancelled PTO and used Friday to finish the onboarding doc early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "craftsperson": "You cancelled PTO and used Friday to finish the mockup pass early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "truth-finder": "You cancelled PTO and used Friday to finish the data pull early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "reliability-pro": "You cancelled PTO and used Friday to finish the prod check early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "mentor": "You cancelled PTO and used Friday to finish the team note early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\"",
    "professor": "You cancelled PTO and used Friday to finish the model review early. Your manager called it \"proactive.\" Your soul called it \"a cry for help.\""
  },
  "pto-guilt:no:0": {
    "builder": "You took Friday off. The deploy sync was cancelled anyway. You spent the day at the gym and remembered what sunlight feels like.",
    "product-partner": "You took Friday off. The roadmap sync was cancelled anyway. You spent the day offline and remembered what sunlight feels like.",
    "fast-learner": "You took Friday off. The onboarding doc could wait. You spent the day reading and remembered what sunlight feels like.",
    "craftsperson": "You took Friday off. The mockup pass could wait. You spent the day away from screens and remembered what sunlight feels like.",
    "truth-finder": "You took Friday off. The data pull could wait. You spent the day with a book and remembered what sunlight feels like.",
    "reliability-pro": "You took Friday off. The prod check was handled by someone else. You spent the day unplugged and remembered what sunlight feels like.",
    "mentor": "You took Friday off. The team note could wait. You spent the day with family and remembered what sunlight feels like.",
    "professor": "You took Friday off. The model review could wait. You spent the day with your grandson and remembered what sunlight feels like."
  },
  "pto-guilt:no:1": {
    "builder": "You took PTO. Derek cc'd you on 14 emails with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "product-partner": "You took PTO. Derek cc'd you on 14 roadmap threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "fast-learner": "You took PTO. Derek cc'd you on 14 onboarding threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "craftsperson": "You took PTO. Derek cc'd you on 14 design threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "truth-finder": "You took PTO. Derek cc'd you on 14 data requests with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "reliability-pro": "You took PTO. Derek cc'd you on 14 incident threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "mentor": "You took PTO. Derek cc'd you on 14 team threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative.",
    "professor": "You took PTO. Derek cc'd you on 14 model threads with \"for when you're back.\" You checked three from the couch. The boundary was decorative."
  },
  "reorg-rumor:yes:0": {
    "builder": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The group chat kept spiraling anyway.",
    "product-partner": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The roadmap rumors kept spiraling anyway.",
    "fast-learner": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The group chat kept spiraling anyway.",
    "craftsperson": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The design-org rumors kept spiraling anyway.",
    "truth-finder": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The group chat kept spiraling anyway.",
    "reliability-pro": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The on-call rumors kept spiraling anyway.",
    "mentor": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" Your team heard the rumors in chat first anyway.",
    "professor": "You asked in the alignment. Your manager gave the corporate smile and said \"nothing to worry about.\" The group chat kept spiraling anyway."
  },
  "reorg-rumor:yes:1": {
    "builder": "You asked calmly in the alignment. Your manager gave you a straight answer: your sprint is safe for now. You are now the person who \"knows things.\"",
    "product-partner": "You asked calmly in the alignment. Your manager gave you a straight answer: your roadmap lane is safe for now. You are now the person who \"knows things.\"",
    "fast-learner": "You asked calmly in the alignment. Your manager gave you a straight answer: your role is safe for now. You are now the person who \"knows things.\"",
    "craftsperson": "You asked calmly in the alignment. Your manager gave you a straight answer: design priorities are safe for now. You are now the person who \"knows things.\"",
    "truth-finder": "You asked calmly in the alignment. Your manager gave you a straight answer: your workstream is safe for now. You are now the person who \"knows things.\"",
    "reliability-pro": "You asked calmly in the alignment. Your manager gave you a straight answer: on-call rotation is safe for now. You are now the person who \"knows things.\"",
    "mentor": "You asked calmly in the alignment. Your manager gave you a straight answer: your team is safe for now. You are now the person who \"knows things.\"",
    "professor": "You asked calmly in the alignment. Your manager gave you a straight answer: the model work is safe for now. You are now the person who \"knows things.\""
  },
  "reorg-rumor:no:0": {
    "builder": "You skipped the alignment and watched the rumors multiply in group chat. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "product-partner": "You played it cool in chat. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "fast-learner": "You stayed vague in chat. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "craftsperson": "You played it cool and kept sketching. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "truth-finder": "You played it cool and kept gathering signals. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "reliability-pro": "You played it cool and watched alerts. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\"",
    "mentor": "You listened in on chat but said nothing. The reorg happened anyway. Your team found out from a calendar invite titled \"New Chapter.\"",
    "professor": "You played it cool and inferred later. The reorg happened anyway. You found out from a calendar invite titled \"New Chapter.\""
  },
  "reorg-rumor:no:1": {
    "builder": "You stayed vague in chat. Later a veteran coworker pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "product-partner": "You stayed vague in chat. Later someone pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "fast-learner": "You observed quietly in chat. Later a buddy pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "craftsperson": "You stayed vague in chat. Later a design lead pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "truth-finder": "You gathered data quietly. Later a peer pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "reliability-pro": "You watched alerts and stayed quiet. Later someone pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "mentor": "You listened in without adding fuel. Later a fellow veteran pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.",
    "professor": "You inferred from the chatter. Later a colleague pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed."
  },
  "all-hands-question:yes:0": {
    "builder": "You unmuted and answered about your work. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "product-partner": "You unmuted and answered about the roadmap bet. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "fast-learner": "You unmuted and answered from your notes. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "craftsperson": "You unmuted and answered about the design. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "truth-finder": "You unmuted and answered about the analysis. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "reliability-pro": "You unmuted and answered about the incident fix. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "mentor": "You unmuted and answered about your team's work. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.",
    "professor": "You unmuted and answered about the model. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording."
  },
  "all-hands-question:yes:1": {
    "builder": "You spoke up with a sharper technical take than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "product-partner": "You spoke up with a sharper roadmap take than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "fast-learner": "You spoke up with a sharper answer than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "craftsperson": "You spoke up with a sharper UX take than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "truth-finder": "You spoke up with a sharper data take than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "reliability-pro": "You spoke up with a sharper ops take than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "mentor": "You spoke up with a sharper team story than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\"",
    "professor": "You spoke up with a sharper model explanation than expected. The CEO said \"love the ownership.\" Derek said \"great synergy.\""
  },
  "all-hands-question:no:0": {
    "product-partner": "You stayed camera-off. Derek answered for the roadmap slide. Leadership nodded along. Your contribution stayed invisible.",
    "fast-learner": "You stayed camera-off. Someone else answered for your research. Leadership nodded along. Your contribution stayed invisible.",
    "craftsperson": "You stayed camera-off. Someone else answered for your design. Leadership nodded along. Your contribution stayed invisible.",
    "truth-finder": "You stayed camera-off. Someone else answered for your analysis. Leadership nodded along. Your contribution stayed invisible.",
    "reliability-pro": "You stayed camera-off. Someone else answered for your incident fix. Leadership nodded along. Your contribution stayed invisible.",
    "mentor": "You stayed camera-off. Derek answered for your team's work. Leadership nodded along. Your team's credit stayed invisible.",
    "professor": "You stayed camera-off. Someone else answered for your model. Leadership nodded along. Your contribution stayed invisible."
  },
  "all-hands-question:no:1": {
    "builder": "You stayed camera-off. The CEO moved on. A teammate pinged you after: \"Why didn't you say anything?\" Fair question.",
    "product-partner": "You stayed camera-off. The CEO moved on. A stakeholder pinged you after: \"Why didn't you say anything?\" Fair question.",
    "fast-learner": "You stayed camera-off. The CEO moved on. Your buddy pinged you after: \"Why didn't you say anything?\" Fair question.",
    "craftsperson": "You stayed camera-off. The CEO moved on. A designer pinged you after: \"Why didn't you say anything?\" Fair question.",
    "truth-finder": "You stayed camera-off. The CEO moved on. A peer pinged you after: \"Why didn't you say anything?\" Fair question.",
    "reliability-pro": "You stayed camera-off. The CEO moved on. Your on-call partner pinged you after: \"Why didn't you say anything?\" Fair question.",
    "mentor": "You stayed camera-off. The CEO moved on. A report pinged you after: \"Why didn't you speak up for us?\" Fair question.",
    "professor": "You stayed camera-off. The CEO moved on. A colleague pinged you after: \"Why didn't you say anything?\" Fair question."
  },
  "peer-callout:yes:0": {
    "builder": "You replied in the thread with the bug's root cause and the fix. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "product-partner": "You replied in the thread explaining the scope miss and the recovery plan. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "fast-learner": "You replied in the thread fixing the onboarding doc line by line. It read like a junior panicking. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "craftsperson": "You replied in the thread with before/after screenshots of the UI fix. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "truth-finder": "You replied in the thread tracing the data discrepancy to its source. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "reliability-pro": "You replied in the thread explaining the missed deploy step and the patch. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "mentor": "You replied in the thread filling the gap in the team update. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature.",
    "professor": "You replied in the thread defending the model assumption with three citations. It read defensive anyway. Blake added a thumbs-up. Your boss added \"let's discuss.\" The thread is now literature."
  },
  "peer-callout:yes:1": {
    "builder": "You owned the bug cleanly, linked the fix, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "product-partner": "You owned the scope miss cleanly, outlined the adjustment, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "fast-learner": "You owned the doc mistake cleanly, posted the corrected version, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "craftsperson": "You owned the UI inconsistency cleanly, shipped the corrected screens, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "truth-finder": "You owned the discrepancy cleanly, posted the corrected numbers, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "reliability-pro": "You owned the missed step cleanly, updated the runbook, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "mentor": "You owned the gap cleanly, credited the team's actual wins, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add.",
    "professor": "You owned the shaky assumption cleanly, posted the corrected derivation, and kept it brief. Your boss said \"appreciate the accountability.\" Blake had nothing left to add."
  },
  "peer-callout:no:0": {
    "builder": "You DM'd Blake and fixed the bug quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "product-partner": "You DM'd Blake and patched the scope quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "fast-learner": "You DM'd Blake and corrected the onboarding doc quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "craftsperson": "You DM'd Blake and fixed the UI inconsistency quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "truth-finder": "You DM'd Blake and corrected the numbers quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "reliability-pro": "You DM'd Blake and patched the deploy gap quietly. Mature, professional, done. Your boss never knew. Blake paged them anyway an hour later.",
    "mentor": "You DM'd Blake and updated the team summary quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later.",
    "professor": "You DM'd Blake and tightened the assumption quietly. Mature, professional, done. Your boss never knew. Blake CC'd them anyway an hour later."
  },
  "peer-callout:no:1": {
    "builder": "You took it offline. Blake apologized for the public flag. You fixed the bug together before the morning meeting. Your boss only saw the solution.",
    "product-partner": "You took it offline. Blake apologized for the public flag. You reworked the scope together before the morning meeting. Your boss only saw the solution.",
    "fast-learner": "You took it offline. Blake apologized for the public flag. You fixed the onboarding doc together before the morning meeting. Your boss only saw the corrected version.",
    "craftsperson": "You took it offline. Blake apologized for the public flag. You aligned the screens together before the morning meeting. Your boss only saw the solution.",
    "truth-finder": "You took it offline. Blake apologized for the public flag. You reconciled the numbers together before the morning meeting. Your boss only saw the solution.",
    "reliability-pro": "You took it offline. Blake apologized for the public flag. You closed the deploy gap together before the morning meeting. Your boss only saw the solution.",
    "mentor": "You took it offline. Blake apologized for the public flag. You completed the team update together before the morning meeting. Your boss only saw the solution.",
    "professor": "You took it offline. Blake apologized for the public flag. You reworked the assumption together before the morning meeting. Your boss only saw the solution."
  },
  "hourly-checkins:yes:0": {
    "builder": "You status-pinged every hour with cheerful precision. Victoria called you \"easy to micromanage.\" You managed zero merge-queue work. Your output is a timeline of being available.",
    "fast-learner": "You answered every hour with cheerful learning updates. Victoria called you \"easy to manage.\" You managed zero tutorial deep work. Your output is a timeline of being available.",
    "craftsperson": "You answered every hour with cheerful precision. Victoria called you \"easy to manage.\" You managed zero Figma deep work. Your output is a timeline of being in critique.",
    "reliability-pro": "You answered every hour with cheerful precision. Victoria called you \"easy to manage.\" You managed zero on-call deep work. Your output is a timeline of being available.",
    "mentor": "You answered every hour with cheerful precision. Victoria called you \"easy to over-manage.\" You managed zero deep work. Your output is a timeline of being available.",
    "professor": "You answered every hour with cheerful precision. Victoria called you \"easy to manage.\" You managed zero theorem deep work. Your output is a timeline of being available for peer review."
  },
  "hourly-checkins:yes:1": {
    "product-partner": "Your hourly roadmap pings were crisp. Victoria forwarded one to leadership as \"great communication.\" You got visibility and still shipped the one thing that mattered today.",
    "truth-finder": "Your hourly metric pings were crisp. Victoria forwarded one to leadership as \"great chart communication.\" You got visibility and still shipped the one thing that mattered today.",
    "reliability-pro": "Your hourly incident pings were crisp. Victoria forwarded one to leadership as \"great communication.\" You got visibility and still shipped the one thing that mattered today.",
    "mentor": "Your hourly updates were crisp. Victoria forwarded your team update to leadership as \"great communication.\" You got visibility and still shipped the one thing that mattered today.",
    "professor": "Your hourly proof-status pings were crisp. Victoria forwarded one to leadership as \"great communication.\" You got visibility and still shipped the one thing that mattered today."
  },
  "hourly-checkins:no:0": {
    "builder": "You batched updates at lunch and 4 PM. You finished real code. Victoria told your manager you were \"hard to reach.\" Your manager said \"results looked good though.\"",
    "product-partner": "You batched updates at lunch and 4 PM. You finished the actual roadmap work. Victoria told your manager you were \"hard to pin down on dates.\" Your manager said \"results looked good though.\"",
    "craftsperson": "You batched updates at lunch and 4 PM. You finished real design work. Victoria told your manager you were \"hard to reach.\" Your manager said \"results looked good though.\"",
    "truth-finder": "You batched updates at lunch and 4 PM. You finished the real analysis. Victoria told your manager you were \"hard to reach.\" Your manager said \"results looked good though.\""
  },
  "performance-review:yes:0": {
    "builder": "You walked your manager through the big refactor: your direction, your problem-solving, your months pair-programming your junior through it. They agreed. Calibration still crowned the person leadership already liked and called you \"a strong support.\" Mentoring does not fit in the rating grid.",
    "product-partner": "You walked your manager through the shared roadmap effort: your direction, your problem-solving, your months coaching your junior through it. They agreed. Roadmap calibration still crowned the person leadership already liked and called you \"a strong support.\" Mentoring does not fit in the OKR grid.",
    "fast-learner": "You walked your manager through the project: which parts you carried, what you figured out alone at 9 PM. They nodded along. Calibration still crowned Ryan, because leadership already knew his name. Yours got \"promising.\" Promising does not pay rent.",
    "craftsperson": "You walked your manager through the joint design effort: your direction, your problem-solving, your months coaching your junior through it. They agreed. Calibration still crowned the person leadership already liked and called you \"a strong support.\" Mentoring does not fit in the rating grid.",
    "truth-finder": "You walked your manager through the joint effort: your direction, your problem-solving, your months coaching your junior through it. They agreed. Metrics calibration still crowned the person leadership already liked and called you \"a strong support.\" Mentoring does not fit in the rating grid.",
    "mentor": "You walked your manager through the joint effort: your direction, your problem-solving, your months mentoring your junior through it. They agreed. Calibration still crowned the person leadership already liked and called you \"strong mentor energy.\" Coaching does not fit in the rating grid.",
    "professor": "You walked your manager through the joint effort: your direction, your proof work, your months coaching your junior through it. They agreed. Calibration still crowned the person leadership already liked and called you \"a strong support.\" Mentoring does not fit in the tenure grid."
  },
  "performance-review:yes:1": {
    "builder": "You made the invisible visible with commit receipts. Your manager added a paragraph about your leadership and the months you spent pair-programming your junior through the project. Calibration cannot ignore what is on paper now.",
    "product-partner": "You made the invisible visible with receipts. Your manager added a paragraph about your leadership and the months you spent coaching your junior through the project. Roadmap calibration cannot ignore what is on paper now.",
    "fast-learner": "You laid out your work with receipts. Your manager added a paragraph about your potential and the late nights you put in. Better on paper. Calibration has to read what is written.",
    "craftsperson": "You made the invisible design visible with receipts. Your manager added a paragraph about your leadership and the months you spent coaching your junior through the project. Calibration cannot ignore what is on paper now.",
    "truth-finder": "You made the invisible visible with data receipts. Your manager added a paragraph about your leadership and the months you spent coaching your junior through the project. Metrics calibration cannot ignore what is on paper now.",
    "mentor": "You made the invisible visible with receipts. Your manager added a paragraph about your leadership and the months you spent mentoring your junior through the project. Calibration cannot ignore what is on paper now."
  },
  "performance-review:no:0": {
    "builder": "You let the work speak. It did not have a microphone. Calibration called your junior \"the brains behind the project.\" The smooth talker got \"strategic.\" You got \"merge-bot reliable.\" You were in the front seat. The review put you in the back.",
    "product-partner": "You let the work speak. It did not have a microphone. Roadmap calibration called your junior \"the brains behind the project.\" The smooth talker got \"product vision.\" You got \"reliable.\" You were in the front seat. The review put you in the back.",
    "fast-learner": "You let the work speak. It did not have a microphone. Calibration called Ryan \"the standout new joiner.\" You got \"solid.\" You did most of the work. The review read like you watched.",
    "truth-finder": "You let the numbers speak. It did not have a microphone. Metrics calibration called your junior \"the brains behind the project.\" The smooth talker got \"statistically strategic.\" You got \"reliable.\" You were in the front seat. The review put you in the back.",
    "reliability-pro": "You let the work speak. It did not have a microphone. Calibration called your junior \"the brains behind the project.\" The smooth talker got \"strategic.\" You got \"uptime reliable.\" You were in the on-call seat. The review put you in the back.",
    "professor": "You let the work speak. It did not have a microphone. Calibration called your junior \"the actual author behind the project.\" The smooth talker got \"strategic.\" You got \"reliable.\" You were in the front seat. The review put you in the back."
  },
  "performance-review:no:1": {
    "fast-learner": "You stayed humble. Your manager corrected the draft after calibration and got your paragraph added. Half the team uses your notes. This time the document said so.",
    "reliability-pro": "You stayed humble. Your manager corrected the draft after calibration and got your leadership paragraph added. Plenty of people owe you for keeping prod up for them this quarter. This time it made the document."
  },
  "exec-roundtable:yes:0": {
    "builder": "You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing him. You answered the hard technical questions anyway. Afterwards someone said you \"seemed intense.\"",
    "fast-learner": "You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing Ryan. You spoke up anyway and answered what you could. Afterwards someone said you \"seemed eager.\" You are new, so eager is survivable.",
    "craftsperson": "You asked to join. Awkward pause. You got added as optional. In the room, leadership kept praising his slides. You answered the hard questions anyway. Afterwards someone said you \"seemed precious about pixels.\"",
    "truth-finder": "You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing him. You answered with the hard numbers anyway. Afterwards someone said you \"seemed intense.\"",
    "reliability-pro": "You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing him. You answered the hard questions anyway. Afterwards someone said you \"seemed intense about prod.\""
  },
  "exec-roundtable:yes:1": {
    "builder": "You asked to join as the technical lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you.",
    "product-partner": "You asked to join as the roadmap lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you.",
    "fast-learner": "You asked to join as the person actually doing the work. They made space. You walked through what you had built without overselling it. Leadership finally learned your name. Not bad for the newest person in the room.",
    "craftsperson": "You asked to join as the design lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you.",
    "reliability-pro": "You asked to join as the reliability lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you.",
    "professor": "You asked to join as the research lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you."
  },
  "exec-roundtable:no:0": {
    "product-partner": "You prepped him generously. He shone upstairs. The recap credited \"the roadmap team\" and named him twice. You were not named. The work was yours. The room was his.",
    "fast-learner": "You handed Ryan your notes and he shone upstairs. The recap email credited \"the team\" and named him twice. Nobody mentioned the prep was yours. You are new enough that nobody thought to ask.",
    "reliability-pro": "You prepped him generously. He shone upstairs. The recap email credited \"the team\" and named him twice. You were not named. The uptime was yours. The room was his.",
    "mentor": "You mentored him generously. He shone upstairs. The recap email credited \"the team\" and named him twice. You were not named. The work was yours. The room was his."
  },
  "exec-roundtable:no:1": {
    "builder": "You coached him hard on the real story. He repeated your architecture talking points upstairs. Leadership replied \"great energy.\" Your manager made sure your name was on the recap email too.",
    "product-partner": "You coached him hard on the real story. He repeated your talking points upstairs. Leadership replied \"great product energy.\" Your manager made sure your name was on the recap email too.",
    "fast-learner": "You briefed him on the key points. He repeated them upstairs and leadership replied \"great energy.\" Your manager made sure your name was on the recap email too.",
    "truth-finder": "You coached him hard on the real data story. He repeated your talking points upstairs. Leadership replied \"great energy.\" Your manager made sure your name was on the recap email too.",
    "mentor": "You coached him hard on giving credit. He repeated your talking points upstairs. Leadership replied \"great energy.\" Your manager made sure your name was on the recap email too.",
    "professor": "You coached him hard on the real story. He repeated your theorem talking points upstairs. Leadership replied \"great academic energy.\" Your manager made sure your name was on the recap email too."
  },
  "borrowed-vision:yes:0": {
    "builder": "You clarified, calmly, with commit history. The room went quiet. Your manager backed you up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made an enemy.",
    "craftsperson": "You clarified, calmly, with the UX thinking. The room went quiet. Your manager backed you up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made an enemy.",
    "truth-finder": "You clarified, calmly, with data specifics. The room went quiet. Your manager backed you up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made an enemy.",
    "mentor": "You clarified, calmly, with specifics. The room went quiet. Your manager backed your team up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made a political enemy.",
    "professor": "You clarified, calmly, with the formal derivation. The room went quiet. Your manager backed you up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made an enemy."
  },
  "borrowed-vision:yes:1": {
    "builder": "You spoke up and it came out sharper than you meant. Now you are \"passionate.\" The idea is still attributed to the slide-deck guy. You won the argument and lost the narrative.",
    "product-partner": "You spoke up and it came out sharper than you meant. Now you are \"passionate.\" The idea is still attributed to the smooth PM. You won the argument and lost the narrative.",
    "fast-learner": "You spoke up and it came out sharper than you meant. Now you are \"over-eager.\" The idea is still attributed to the smooth senior. You won the argument and lost the narrative.",
    "craftsperson": "You spoke up and it came out sharper than you meant. Now you are \"passionate.\" The idea is still attributed to the slide polisher. You won the argument and lost the narrative.",
    "truth-finder": "You spoke up and it came out sharper than you meant. Now you are \"passionate.\" The idea is still attributed to the chart cherry-picker. You won the argument and lost the narrative.",
    "professor": "You spoke up and it came out sharper than you meant. Now you are \"passionate.\" The idea is still attributed to the smooth department chair. You won the argument and lost the narrative."
  },
  "borrowed-vision:no:0": {
    "product-partner": "You followed up privately with receipts. Your manager corrected the record with leadership and got your name on the follow-up note. The presenter still smiled too much. The roadmap credit stuck.",
    "fast-learner": "You followed up privately with learning journal receipts. Your manager corrected the record with leadership and got your name on the follow-up note. The presenter still smiled too much. The credit stuck.",
    "truth-finder": "You followed up privately with spreadsheet receipts. Your manager corrected the record with leadership and got your name on the follow-up note. The presenter still smiled too much. The credit stuck.",
    "reliability-pro": "You followed up privately with receipts. Your manager corrected the record with leadership and got your name on the follow-up note. The presenter still smiled too much. The runbook credit stuck."
  },
  "borrowed-vision:no:1": {
    "builder": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the slide-deck guy to \"scale the architecture.\" You scale the actual work.",
    "product-partner": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the smooth PM to \"scale the roadmap.\" You scale the actual work.",
    "fast-learner": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the smooth senior to \"scale the vision.\" You scale the actual work.",
    "craftsperson": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the slide polisher to \"scale the design system.\" You scale the actual work.",
    "truth-finder": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the chart cherry-picker to \"scale the vision.\" You scale the actual work.",
    "reliability-pro": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the smooth talker to \"scale the runbook.\" You scale the actual on-call work.",
    "mentor": "You let it slide to keep the team peace. The story stuck. In the next planning cycle, they asked the smooth talker to \"scale the vision.\" You scale the actual work.",
    "professor": "You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the smooth department chair to \"scale the proof sketch.\" You scale the actual work."
  },
  "team-shoutout:yes:0": {
    "builder": "You added context, lightly, about the heroic pair-programming. It read petty to some. Your junior DM'd \"wow.\" Leadership saw a PR drama, not a team win. The shoutout still has his name on it.",
    "product-partner": "You added context, lightly, about the heroic scope management. It read petty to some. Your junior DM'd \"wow.\" Leadership saw a team drama, not a roadmap win. The shoutout still has his name on it.",
    "fast-learner": "You added context, lightly, about the joint effort. It read like a sore learner to some. Ryan DM'd \"wow.\" Leadership saw a team drama, not a team win. The shoutout still has his name on it.",
    "craftsperson": "You added context, lightly, about the heroic pixel-pushing. It read petty to some. Your junior DM'd \"wow.\" Leadership saw a team drama, not a team win. The shoutout still has his name on it.",
    "truth-finder": "You added data context, lightly, about the joint effort. It read petty to some. Your junior DM'd \"wow.\" Leadership saw a team drama, not a team win. The shoutout still has his name on it.",
    "mentor": "You added context, lightly, about the mentorship effort. It read petty to some. Your mentee DM'd \"wow.\" Leadership saw a team drama, not a team win. The shoutout still has his name on it.",
    "professor": "You added context, lightly, about the heroic co-authorship. It read petty to some. Your junior DM'd \"wow.\" Leadership saw an academic drama, not a team win. The citation still has his name on it."
  },
  "team-shoutout:yes:1": {
    "builder": "You reframed it as a team win and named the midnight hotfix you solved. A director replied \"good to know.\" Your manager hearted it. The shoutout finally reflected reality.",
    "product-partner": "You reframed it as a roadmap win and named the launch risk you cleared. A director replied \"good to know.\" Your manager hearted it. The shoutout finally reflected reality.",
    "craftsperson": "You reframed it as a team win and named the late-night design blocker you solved. A director replied \"good to know.\" Your manager hearted it. The shoutout finally reflected reality.",
    "reliability-pro": "You reframed it as a team win and named the midnight page you cleared. A director replied \"good to know.\" Your manager hearted it. The shoutout finally reflected reality.",
    "professor": "You reframed it as a team win and named the late-night blocker you solved. A director replied \"good to know.\" Your manager hearted it. The citation finally reflected reality."
  },
  "team-shoutout:no:0": {
    "builder": "You let it pass. Classy. Invisible. The emojis piled up. Your manager said nothing. Calibration will remember who was in the screenshot, not who fixed prod at midnight.",
    "craftsperson": "You let it pass. Classy. Invisible. The design-heart emojis piled up. Your manager said nothing. Calibration will remember who was in the screenshot, not who fixed the crisis.",
    "truth-finder": "You let it pass. Classy. Invisible. The emojis piled up. Your manager said nothing. Calibration will remember who was in the dashboard screenshot, not who fixed the metrics pipeline.",
    "reliability-pro": "You let it pass. Classy. Invisible. The emojis piled up. Your manager said nothing. Calibration will remember who was in the screenshot, not who fixed prod again.",
    "mentor": "You let it pass. Classy mentor move. Invisible. The emojis piled up. Your manager said nothing. Calibration will remember who was in the screenshot, not who fixed the crisis."
  },
  "team-shoutout:no:1": {
    "fast-learner": "You let it pass publicly and pinged the seniors you bothered with questions. One admitted upstairs in a side channel that you saved them. Your manager DM'd you: \"I know who fixed that launch.\" Quiet win."
  },
  "precommitted-deadline:yes:0": {
    "builder": "You pushed back with a real sprint estimate. Susan sighed like you had personally disappointed the company values. Your manager backed you up and leadership moved the date. Susan grumbled that you \"blocked the sprint,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room.",
    "product-partner": "You pushed back with a real estimate. Susan sighed like you had personally disappointed the company OKRs. Your manager backed you up and leadership moved the date. Susan grumbled that you \"blocked momentum,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room.",
    "craftsperson": "You pushed back with a real design estimate. Susan sighed like you had personally disappointed the company values. Your manager backed you up and leadership moved the date. Susan grumbled that you \"blocked momentum,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room.",
    "truth-finder": "You pushed back with a real data-backed estimate. Susan sighed like you had personally disappointed the company values. Your manager backed you up and leadership moved the date. Susan grumbled that you \"blocked momentum,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room.",
    "mentor": "You pushed back with a real estimate. Susan sighed like you had personally disappointed the company values. Your manager backed the team up and leadership moved the date. Susan grumbled that you \"blocked momentum,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room.",
    "professor": "You pushed back with a real complexity estimate. Susan sighed like you had personally disappointed the department bylaws. Your manager backed you up and leadership moved the date. Susan grumbled that you \"blocked momentum,\" but nobody bought it. The realistic plan made you look like the steadiest person in the room."
  },
  "precommitted-deadline:yes:1": {
    "fast-learner": "You pushed back and it turned into a 45-minute learning debate about frameworks you barely know and timelines she will not explain. You left with a worse date, less clarity, and the same guilt trip wearing a different shirt.",
    "truth-finder": "You pushed back and it turned into a 45-minute debate about tools you do not use and metrics she will not explain. You left with a worse date, less clarity, and the same guilt trip wearing a different shirt.",
    "professor": "You pushed back and it turned into a 45-minute proof debate about tools you do not use and timelines she will not explain. You left with a worse date, less clarity, and the same guilt trip wearing a different shirt."
  },
  "precommitted-deadline:no:0": {
    "product-partner": "You accepted. Susan forwarded your confirmation upstairs immediately. You now own a pre-committed roadmap date. The team learned about it from the planning deck.",
    "fast-learner": "You accepted. Susan forwarded your confirmation upstairs immediately. You now own a deadline born in a vacuum. You learned about it from the planning deck, mid-onboarding.",
    "truth-finder": "You accepted. Susan forwarded your confirmation upstairs immediately. You now own a deadline born in a vacuum. The team learned about it from the forecast PDF.",
    "reliability-pro": "You accepted. Susan forwarded your confirmation upstairs immediately. You now own a prod launch date born in a vacuum. The team learned about it from the planning deck.",
    "mentor": "You accepted. Susan forwarded your confirmation upstairs immediately. You now own a team deadline born in a vacuum. The team learned about it from the planning deck."
  },
  "precommitted-deadline:no:1": {
    "builder": "You accepted to keep the peace. Somehow a scoped-down PR shipped on time with your team rowing together. Susan took a bow, but your manager made sure leadership knew whose team actually delivered. You took the win.",
    "craftsperson": "You accepted to keep the peace. Somehow a scoped-down mockups landed on time with your team rowing together. Susan took a bow for your pixels, but your manager made sure leadership knew whose team actually delivered. You took the win.",
    "reliability-pro": "You accepted to keep the peace. Somehow a scoped-down deploy shipped on time with your team rowing together. Susan took a bow, but your manager made sure leadership knew whose team actually delivered. You took the win.",
    "mentor": "You accepted to keep the peace. Somehow a scoped-down version landed on time with your team rowing together. Susan took a bow, but your manager made sure leadership knew whose team actually delivered. The team took the win."
  },
  "missing-blocker:yes:0": {
    "truth-finder": "You cc'd your manager with a tight data summary. Donald surfaced within the hour, annoyed but useful. He delivered in ten minutes. Your manager noted you unblocked it cleanly without making it a thing.",
    "mentor": "You looped in your manager with a tight summary. Donald surfaced within the hour, annoyed but useful. He delivered in ten minutes. Your manager noted you unblocked it cleanly without making it a thing."
  },
  "missing-blocker:yes:1": {
    "builder": "You escalated. Donald replied-all that he was \"being harassed over a two-line code ask.\" Your manager asked you to \"be more collaborative.\" Friday is still Friday. Donald is still offline.",
    "product-partner": "You escalated the dependency. Donald replied-all that he was \"being harassed over a tiny roadmap favor.\" Your manager asked you to \"be more collaborative.\" The launch date is still Friday. Donald is still offline.",
    "fast-learner": "You escalated. Donald replied-all that he was \"being harassed over a tiny onboarding favor.\" Your manager asked you to \"be more collaborative.\" Friday is still Friday. Donald is still offline.",
    "mentor": "You escalated. Donald replied-all that he was \"being harassed over a tiny favor.\" Your manager asked you to \"be more team-oriented.\" Friday is still Friday. Donald is still offline.",
    "professor": "You escalated. Donald replied-all that he was \"being harassed over a two-minute proof check.\" Your manager asked you to \"be more collaborative.\" Friday is still Friday. Donald is still offline."
  },
  "missing-blocker:no:0": {
    "builder": "You routed around him, documented the gap, and kept moving. It worked. The deploy stayed alive. Donald appeared on Monday to ask why he was not consulted.",
    "craftsperson": "You routed around him, documented the gap, and kept moving. It worked. The handoff stayed alive. Donald appeared on Monday to ask why he was not consulted.",
    "truth-finder": "You routed around him, documented the data gap, and kept moving. It worked. Friday stayed alive. Donald appeared on Monday to ask why he was not consulted.",
    "reliability-pro": "You routed around him, documented the gap, and kept moving. It worked. Prod stayed alive. Donald appeared on Monday to ask why he was not consulted.",
    "mentor": "You routed around him, documented the gap, and kept moving. It worked. Friday stayed alive. Donald appeared on Monday to ask why the team was not consulted.",
    "professor": "You routed around him, documented the lemma gap, and kept moving. It worked. The submission stayed alive. Donald appeared on Monday to ask why he was not consulted."
  },
  "missing-blocker:no:1": {
    "builder": "You shipped a workaround branch and delivered the workaround. Leadership loved the demo. Donald's missing piece caused a mess at 6 PM. Somehow the retro focused on your hotfix bypass, not his absence.",
    "craftsperson": "You worked around his review and delivered the UX workaround. Leadership loved the demo. Donald's missing piece caused a mess at 6 PM. Somehow the retro focused on your bypass, not his absence.",
    "truth-finder": "You worked around him and delivered the workaround. Leadership loved the demo. Donald's missing piece caused a mess at 6 PM. Somehow the retro focused on your workaround metrics, not his absence.",
    "reliability-pro": "You failovered around him and delivered the workaround. Leadership loved the demo. Donald's missing piece broke prod at 6 PM anyway. Somehow the retro focused on your bypass, not his absence.",
    "professor": "You worked around him and delivered the workaround. Leadership loved the draft. Donald's missing piece caused a mess at 6 PM. Somehow the retro focused on your bypass, not his absence."
  },
  "visibility-pack:yes:0": {
    "builder": "You said no politely and named what would break if you stopped to prettify the sprint tracker. Your manager backed you. The launch stayed alive, and you looked like someone who protects the work when it counts.",
    "craftsperson": "You said no politely and named what would break if you stopped to prettify the design tracker. Your manager backed you. The launch stayed alive, and you looked like someone who protects the work when it counts.",
    "reliability-pro": "You said no politely and named what would break if you stopped to prettify Excel. Your manager backed you. The prod stayed alive, and you looked like someone who protects the work when it counts."
  },
  "visibility-pack:yes:1": {
    "builder": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible prod firefighting stayed invisible. Her framework deck looked great in the recap.",
    "product-partner": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible unblocking stayed invisible. Her planning framework deck looked great in the recap.",
    "fast-learner": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your quiet ramp-up work stayed invisible. Her onboarding framework deck looked great in the recap.",
    "craftsperson": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible polish work stayed invisible. Her design-system deck looked great in the recap.",
    "truth-finder": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible analysis work stayed invisible. Her framework deck looked great in the recap.",
    "reliability-pro": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible incident firefighting stayed invisible. Her framework deck looked great in the recap.",
    "mentor": "You pushed back. Helen escalated that you were \"not operating with rigor.\" Leadership heard structure, not survival. Your invisible team glue stayed invisible. Her coaching style deck looked great in the recap.",
    "professor": "You pushed back. Helen escalated that you were \"not operating with mathematical rigor.\" Leadership heard structure, not survival. Your invisible groundwork stayed invisible. Her formal framework deck looked great in the recap."
  },
  "visibility-pack:no:0": {
    "builder": "You built the pack. Color-coded sprint tabs, executive summary, framework alignment. Helen loved it. She presented your wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\"",
    "product-partner": "You built the pack. Color-coded tabs, executive summary, planning framework alignment. Helen loved it. She presented your roadmap wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\"",
    "fast-learner": "You built the pack. Color-coded tabs, executive summary, onboarding framework alignment. Helen loved it. She presented your wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\"",
    "craftsperson": "You built the pack. Color-coded tabs, executive summary, framework alignment. Helen loved it. She presented your UX wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\"",
    "truth-finder": "You built the pack. Color-coded tabs, executive data summary, metrics alignment. Helen loved it. She presented your wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\"",
    "mentor": "You built the pack. Color-coded tabs, executive summary, coaching style alignment. Helen loved it. She presented your mentees' wins on a leadership call you were not on. Someone asked who led that work. She said \"your actual team.\"",
    "professor": "You built the pack. Color-coded tabs, executive summary, formal framework alignment. Helen loved it. She presented your wins on a leadership call you were not on. Someone asked who led that work. She said \"the team.\""
  },
  "visibility-pack:no:1": {
    "product-partner": "You complied. The pack was so clear even Helen almost understood it. Your manager pulled you into the next leadership sync as \"the person behind the numbers.\" Helen called it a win for \"cross-functional roadmap alignment.\"",
    "fast-learner": "You complied. The pack was so clear even Helen almost understood it. Your manager pulled you into the next leadership sync as \"the person behind the learning curve.\" Helen called it a win for \"cross-functional alignment.\"",
    "truth-finder": "You complied. The pack was so clear even Helen almost understood it. Your manager pulled you into the next leadership sync as \"the person who actually ran the numbers.\" Helen called it a win for \"cross-functional alignment.\""
  },
  "ai-wrapper-demo:yes:0": {
    "builder": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"engineering is still ironing out the bugs.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "product-partner": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"the team is still ironing out the roadmap.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "fast-learner": "You let Derek run the demo. He oversold what the tool was supposed to do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"the team is still ironing out the pilot.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "craftsperson": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"design is still ironing out the flow.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "truth-finder": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"the team is still ironing out the data.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "reliability-pro": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"the team is still ironing out the rollout.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "mentor": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"your team is still ironing out the bugs.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it.",
    "professor": "You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: \"the team is still validating the model.\" Suddenly the failure was your team's, not his pitch. He stayed clean. Your team wore it."
  },
  "ai-wrapper-demo:yes:1": {
    "product-partner": "You let Derek run it and it somehow worked. He called it a \"roadmap win.\" You corrected one fatal mistake live without embarrassing him. Leadership DM'd you afterward: \"Thanks for having his back on the hard questions.\"",
    "fast-learner": "You let Derek run it and it somehow worked. He called it a \"learning win.\" You corrected one fatal mistake live without embarrassing him. Leadership DM'd you afterward: \"Thanks for having his back on the hard questions.\"",
    "mentor": "You let Derek run it and it somehow worked. He called it a \"team learning win.\" You corrected one fatal mistake live without embarrassing him. Leadership DM'd you afterward: \"Thanks for having the team's back on the hard questions.\""
  },
  "ai-wrapper-demo:no:0": {
    "builder": "You took the slot and presented the real system architecture, limits, and risks. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for \"going around\" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem.",
    "craftsperson": "You took the slot and presented the real UX flow, limits, and risks. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for \"going around\" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem.",
    "truth-finder": "You took the slot and presented the real scope, statistical limits, and actual eval metrics. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for \"going around\" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem.",
    "reliability-pro": "You took the slot and presented the real prod limits, failure modes, and risks. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for \"going around\" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem.",
    "professor": "You took the slot and presented the real mathematical architecture, limits, and risks. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for \"going around\" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem."
  },
  "ai-wrapper-demo:no:1": {
    "builder": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the cron job with a chat UI. Derek posted a LinkedIn thought leadership piece anyway.",
    "product-partner": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the AI roadmap workstream. Derek posted a LinkedIn thought leadership piece anyway.",
    "fast-learner": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the pilot workstream. Derek posted a LinkedIn thought leadership piece anyway.",
    "craftsperson": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the initiative workstream. Derek posted a LinkedIn design thought leadership piece anyway.",
    "truth-finder": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs vanity metrics. A director asked you to join the initiative workstream. Derek posted a LinkedIn thought leadership piece anyway.",
    "professor": "You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the \"stochastic parrot\" task force. Derek posted a LinkedIn thought leadership piece anyway."
  },
  "instant-briefing:yes:0": {
    "builder": "You asked for a real assessment window. Victoria sighed like you invented engineering process. Your manager backed you. Lunch stayed lunch. The deck went out the next day and was actually compile-ready.",
    "truth-finder": "You asked for a real assessment window. Victoria sighed like you invented bureaucracy. Your manager backed you. Lunch stayed lunch. The deck went out the next day and was statistically accurate.",
    "reliability-pro": "You asked for a real incident assessment window. Victoria sighed like you invented bureaucracy. Your manager backed you. Lunch stayed lunch. The deck went out the next day and was actually accurate.",
    "mentor": "You asked for a real assessment window. Victoria sighed like you invented bureaucracy. Your manager backed your team. Team lunch stayed lunch. The deck went out the next day and was actually accurate."
  },
  "instant-briefing:yes:1": {
    "builder": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The placeholder sprint deck someone else wrote had your name on it anyway.",
    "product-partner": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The product direction someone else wrote had your name on it anyway.",
    "fast-learner": "You asked for time. Victoria escalated to your manager that you were \"still onboarding, somehow already behind.\" You still did not have enough context to fake it. The placeholder deck someone else wrote had your name on it anyway.",
    "craftsperson": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The Figma direction someone else wrote had your name on it anyway.",
    "truth-finder": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The placeholder data deck someone else wrote had your name on it anyway.",
    "reliability-pro": "You asked for time. Victoria escalated to your manager that you were \"not incident-responsive.\" You still did not have enough context to fake it. The placeholder ops deck someone else wrote had your name on it anyway.",
    "mentor": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The placeholder team deck someone else wrote had your name on it anyway.",
    "professor": "You asked for time. Victoria escalated to your manager that you were \"not responsive.\" You still did not have enough context to fake it. The research direction someone else wrote had your name on it anyway."
  },
  "instant-briefing:no:0": {
    "fast-learner": "You improvised with confident ramp-up vagueness. Victoria loved the energy. Leadership hated the details at 3 PM. You spent the afternoon unwinding fiction you invented before noon.",
    "craftsperson": "You improvised with confident wireframe vagueness. Victoria loved the energy. Leadership hated the details at 3 PM. You spent the afternoon unwinding fiction you invented before noon.",
    "truth-finder": "You improvised with confident vagueness. Victoria loved the energy. Leadership hated the details at 3 PM. You spent the afternoon unwinding forecast fiction you invented before noon.",
    "professor": "You improvised with confident theorem vagueness. Victoria loved the energy. Leadership hated the details at 3 PM. You spent the afternoon unwinding fiction you invented before noon."
  },
  "instant-briefing:no:1": {
    "product-partner": "You faked a plan with just enough jargon to buy time. Victoria forwarded it immediately. Roadmap scope shrank before anyone read page two. Your real roadmap assessment landed the next day and matched what leadership actually needed.",
    "fast-learner": "You faked a plan from wiki snippets with just enough jargon to buy time. Victoria forwarded it immediately. Scope shrank before anyone read page two. Your real assessment landed the next day and matched what leadership actually needed.",
    "craftsperson": "You faked a plan with just enough design jargon to buy time. Victoria forwarded it immediately. Scope shrank before anyone read page two. Your real assessment landed the next day and matched what leadership actually needed.",
    "professor": "You faked a plan with just enough academic jargon to buy time. Victoria forwarded it immediately. Scope shrank before anyone read page two. Your real assessment landed the next day and matched what leadership actually needed."
  },
  "ten-minute-favor:yes:0": {
    "builder": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The fix held, and your manager quietly noted who saved the release. You missed the gym, but the competence landed.",
    "product-partner": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The doc held, and your manager quietly noted who saved the launch. You missed dinner, but the competence landed.",
    "fast-learner": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The cleanup held, and your manager quietly noted how fast you ramped. You missed your study block, but the competence landed.",
    "craftsperson": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The file names are fixed, and your manager quietly noted who saved the handoff. You missed your evening, but the craft landed.",
    "truth-finder": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The spreadsheet validated, and your manager quietly noted who caught it. You missed your evening, but the rigor landed.",
    "reliability-pro": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The logs cleared, and your manager quietly noted who kept it stable. You missed your climbing session, but the reliability landed.",
    "mentor": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The team gap was covered, and your manager quietly noted who steadied it. You missed family time, but the leadership landed.",
    "professor": "You finished at 8 PM. Derek thanked you in a voice note from a bar. The notation is fixed, and your manager quietly noted the precision. You missed chess homework time, but the rigor landed."
  },
  "ten-minute-favor:yes:1": {
    "builder": "You pushed through. At 9 PM you discovered the real issue was a env var Derek could have toggled himself. He called it a \"learning moment.\" You called it theft.",
    "product-partner": "You pushed through. At 9 PM you discovered the real issue was a doc permission Derek could have fixed himself. He called it a \"learning moment.\" You called it theft.",
    "fast-learner": "You pushed through. At 9 PM you discovered the real issue was a setting Derek could have looked up himself. He called it an \"onboarding moment.\" You called it theft.",
    "craftsperson": "You pushed through. At 9 PM you discovered the real issue was a file permission Derek could have fixed himself. He called it a \"learning moment.\" You called it theft.",
    "truth-finder": "You pushed through. At 9 PM you discovered the real issue was a dashboard filter Derek could have changed himself. He called it a \"learning moment.\" You called it theft.",
    "reliability-pro": "You pushed through. At 9 PM you discovered the real issue was a feature flag Derek could have toggled himself. He called it a \"learning moment.\" You called it theft.",
    "mentor": "You pushed through. At 9 PM you discovered the real issue was a calendar setting Derek could have changed himself. He called it a \"growth opportunity.\" You called it theft.",
    "professor": "You pushed through. At 9 PM you discovered the real issue was a definition Derek could have looked up himself. He called it a \"teachable proof moment.\" You called it intellectual theft."
  },
  "ten-minute-favor:no:0": {
    "builder": "You stopped, wrote a clear PR handoff, and logged off. Derek was annoyed. Your manager said the boundary was fair. The favor took him twenty minutes the next morning. Funny how that works.",
    "fast-learner": "You stopped, wrote a clear handoff, and logged off. Derek was annoyed. Your manager said the boundary was fair. The favor took him twenty minutes after coffee. Funny how that works.",
    "craftsperson": "You stopped, wrote a clear Figma handoff, and logged off. Derek was annoyed. Your manager said the boundary was fair. The favor took him twenty minutes the next morning. Funny how that works.",
    "mentor": "You stopped, wrote a clear handoff, and logged off. Derek was annoyed. Your manager said the mentorship boundary was fair. The favor took him twenty minutes the next morning. Funny how that works."
  },
  "ten-minute-favor:no:1": {
    "product-partner": "You documented and left. Derek told leadership you \"dropped the roadmap ball on a tiny scope thing.\" The doc proved otherwise. You still spent Friday cleaning up narrative, not your actual work.",
    "fast-learner": "You documented and left. Derek told leadership you \"dropped the ball on a tiny starter task.\" The doc proved otherwise. You still spent Friday cleaning up narrative, not your actual work.",
    "craftsperson": "You documented and left. Derek told leadership you \"dropped the ball on a tiny pixel thing.\" The doc proved otherwise. You still spent Friday cleaning up narrative, not your actual work.",
    "truth-finder": "You documented and left. Derek told leadership you \"dropped the ball on a small data ask.\" The spreadsheet proved otherwise. You still spent Friday cleaning up data narrative, not your actual work."
  },
  "quick-and-dirty:yes:0": {
    "builder": "You walked her through the real scope with an architecture whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a production landmine.",
    "product-partner": "You walked her through the real product scope with a whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a landmine.",
    "fast-learner": "You walked her through the actual size of the ask with a whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest MVP slice instead of a landmine.",
    "truth-finder": "You walked her through the audit exposure with a whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest data slice instead of a landmine.",
    "reliability-pro": "You walked her through the real scope with a whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a SEV-1 landmine.",
    "mentor": "You walked her through the team impact with a team whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a landmine.",
    "professor": "You walked her through the hidden complexity with a proof whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a landmine."
  },
  "quick-and-dirty:yes:1": {
    "fast-learner": "You explained the complexity. Susan heard \"no.\" She told leadership you were \"not ramped-up yet.\" The quick version got assigned to you anyway, with less time.",
    "craftsperson": "You explained the complexity. Susan heard \"no.\" She told leadership you were \"not solution-oriented.\" The UI button got assigned to you anyway, with less time.",
    "reliability-pro": "You explained the complexity. Susan heard \"no.\" She told leadership you were \"not solution-oriented.\" The quick prod patch got assigned to you anyway, with less time."
  },
  "quick-and-dirty:no:0": {
    "builder": "You hacked together the demo code path. It looked fine on stage. Reality reminded everyone what \"quick and hacky\" means. The cleanup ticket is now yours and \"was always going to be.\"",
    "product-partner": "You hacked together the demo path. It looked fine on stage. Reality reminded everyone what \"dirty\" means. The tech-debt ticket is now yours and \"was always going to be.\"",
    "craftsperson": "You hacked together the demo path. It looked fine in the mockup. Reality reminded everyone what \"design-debt dirty\" means. The cleanup ticket is now yours and \"was always going to be.\"",
    "truth-finder": "You hacked together the demo path. It looked fine on stage. Reality reminded everyone what \"dirty\" means. The compliance cleanup ticket is now yours and \"was always going to be.\"",
    "reliability-pro": "You hacked the patch straight into prod. It looked fine on stage. Prod reminded everyone at 2 AM what \"dirty\" means. The cleanup ticket is now yours and \"was always going to be.\"",
    "professor": "You hacked together the demo path. It looked fine on stage. Reality reminded everyone what \"quick and non-rigorous\" means. The cleanup ticket is now yours and \"was always going to be.\""
  },
  "quick-and-dirty:no:1": {
    "product-partner": "You built the quick version and somehow nothing broke. Susan took credit for \"bias to roadmap theater.\" Your manager told leadership you built it solo under a brutal deadline. The demo landed.",
    "craftsperson": "You built the UI button and somehow nothing broke. Susan took credit for \"bias to action.\" Your manager told leadership you built it solo under a brutal deadline. The demo landed.",
    "reliability-pro": "You built the quick prod patch and somehow nothing broke. Susan took credit for \"bias to action.\" Your manager told leadership you built it solo under a brutal deadline. The demo landed."
  },
  "urgent-overnight:yes:0": {
    "builder": "You replied with commit timestamps and a sane plan. Your manager moved the date. Blake acted wounded. Leadership cared about the date, not his feelings. You kept your afternoon.",
    "product-partner": "You replied with timestamps and a sane roadmap plan. Your manager moved the date. Blake acted wounded. Leadership cared about the date, not his feelings. You kept your afternoon.",
    "truth-finder": "You replied with data timestamps and a sane plan. Your manager moved the date. Blake acted wounded. Leadership cared about the date, not his feelings. You kept your afternoon.",
    "mentor": "You replied with timestamps and a sane plan. Your manager moved the date. Blake acted personally wounded. Leadership cared about the deadline, not his feelings. You kept your afternoon.",
    "professor": "You replied with experiment timestamps and a sane plan. Your manager moved the date. Blake acted wounded. Leadership cared about the date, not his feelings. You kept your afternoon."
  },
  "urgent-overnight:yes:1": {
    "product-partner": "You pushed back and Blake reply-alled that you were \"blocking cross-team roadmap work.\" The deadline stayed. Now you are doing the work and looking difficult. Classic.",
    "fast-learner": "You pushed back and Blake reply-alled that you were \"blocking cross-team work.\" The deadline stayed. Now you are doing the work and looking difficult. Classic onboarding trap.",
    "mentor": "You pushed back and Blake reply-alled that you were \"blocking cross-team work.\" The deadline stayed. Now you are doing the work and looking like a bad team player. Classic."
  },
  "urgent-overnight:no:0": {
    "builder": "You dropped everything and delivered by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it \"our code deliverable\"; nobody bought it. Your actual priorities slipped to next week, but the credit landed on you.",
    "product-partner": "You dropped everything and delivered by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it \"our roadmap deliverable\"; nobody bought it. Your actual roadmap priorities slipped to next week, but the credit landed on you.",
    "craftsperson": "You dropped everything and delivered by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it \"our design deliverable\"; nobody bought it. Your actual priorities slipped to next week, but the credit landed on you.",
    "reliability-pro": "You dropped everything and delivered the write-up by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it \"our incident deliverable\"; nobody bought it. Your actual priorities slipped to next week, but the credit landed on you.",
    "professor": "You dropped everything and delivered by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it \"our proof deliverable\"; nobody bought it. Your actual priorities slipped to next week, but the credit landed on you."
  },
  "urgent-overnight:no:1": {
    "builder": "You dropped everything and delivered by 4 PM. Then a bug surfaced in the live app: Blake had left out a key detail because he \"assumed you had context.\" You stayed until 7 PM redoing your own rush job. The slip got pinned on you. Urgent is a lifestyle.",
    "fast-learner": "You dropped everything and delivered by 4 PM. Then a mistake surfaced: Blake had left out a key detail because he \"assumed you had tribal knowledge.\" You stayed until 7 PM redoing your own rush job. The slip got pinned on you. Context-switching is a lifestyle.",
    "craftsperson": "You dropped everything and delivered by 4 PM. Then a flaw surfaced in the mockups: Blake had left out a key detail because he \"assumed you had context.\" You stayed until 7 PM redoing your own rush job. The slip got pinned on you. Urgent is a lifestyle.",
    "truth-finder": "You dropped everything and delivered by 4 PM. Then an error surfaced in the numbers: Blake had left out a key detail because he \"assumed you had the data context.\" You stayed until 7 PM redoing your own rush job. The slip got pinned on you. Urgent is a lifestyle.",
    "reliability-pro": "You dropped everything and delivered the write-up by 4 PM. Then a mistake surfaced: Blake had left out a key detail because he \"assumed you had context.\" You stayed until 7 PM patching your own rush job. The slip got pinned on you. PagerDuty is a lifestyle.",
    "professor": "You dropped everything and delivered by 4 PM. Then a mistake surfaced: Blake had left out a key detail because he \"assumed you had context.\" You stayed until 7 PM redoing your own rushed proof. The slip got pinned on you. Urgent is a lifestyle."
  },
  "fire-drill-demo:yes:0": {
    "builder": "You evacuated like a professional. The deploy demo resumed the next day. Leadership respected the calm. Derek said you \"lost deploy momentum.\" The building was indeed doing another lap.",
    "fast-learner": "You evacuated like a seasoned professional. The demo resumed the next day. Leadership respected the calm. Derek said you \"lost momentum.\" The building was indeed doing another lap.",
    "craftsperson": "You evacuated like a professional. The design demo resumed the next day. Leadership respected the calm. Derek said you \"lost momentum.\" The building was indeed doing another lap.",
    "truth-finder": "You evacuated like a professional. The demo resumed the next day. Leadership respected the calm. Derek said you \"lost momentum.\" The building was indeed doing another metrics lap.",
    "reliability-pro": "You evacuated like a professional on-call. The demo resumed the next day. Leadership respected the calm. Derek said you \"lost momentum.\" The building was indeed doing another lap.",
    "mentor": "You evacuated like a professional. The demo resumed the next day. Leadership respected your team-first calm. Derek said you \"lost momentum.\" The building was indeed doing another lap.",
    "professor": "You evacuated like a professional. The theorem demo resumed the next day. Leadership respected the calm. Derek said you \"lost momentum.\" The building was indeed doing another lap."
  },
  "fire-drill-demo:yes:1": {
    "builder": "You left immediately. Derek presented your unfinished architecture deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about alarms.",
    "product-partner": "You left immediately. Derek presented your unfinished roadmap deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about alarms.",
    "fast-learner": "You left immediately. Derek presented your unfinished deck without you. He misread the one slide you had explained twice. You fixed it in the stairwell. HR sent a gentle reminder about alarms.",
    "craftsperson": "You left immediately. Derek presented your unfinished Figma deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about alarms.",
    "truth-finder": "You left immediately. Derek presented your unfinished deck without you. He misread the one data viz you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about alarms.",
    "reliability-pro": "You left immediately. Derek presented your unfinished deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about evacuation SLAs.",
    "mentor": "You left immediately. Derek presented your unfinished deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle team-safety reminder about alarms.",
    "professor": "You left immediately. Derek presented your unfinished deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. Faculty sent a gentle reminder about alarms."
  },
  "fire-drill-demo:no:0": {
    "product-partner": "You squeezed in one more slide. Security appeared in the doorway. Leadership remembered the drama, not the content. Derek called it \"roadmap commitment.\" Facilities called it something else.",
    "reliability-pro": "You squeezed in one more slide. Security appeared like a SEV-1 in the doorway. Leadership remembered the drama, not the content. Derek called it \"commitment.\" Facilities called it something else."
  },
  "fire-drill-demo:no:1": {
    "builder": "You finished the slide as everyone shuffled out. Somehow the important metrics chart landed. A director laughed and called you dedicated. Do not try this twice.",
    "product-partner": "You finished the slide as everyone shuffled out. Somehow the real forecast numbers landed. A director laughed and called you dedicated. Do not try this twice.",
    "craftsperson": "You finished the slide as everyone shuffled out. Somehow the important chart landed. A director laughed and called you pixel-flawless. Do not try this twice.",
    "truth-finder": "You finished the slide as everyone shuffled out. Somehow the real dataset numbers landed. A director laughed and called you dedicated. Do not try this twice.",
    "mentor": "You finished the slide as everyone shuffled out. Somehow the important chart landed. A director laughed and called you dedicated to the team demo. Do not try this twice.",
    "professor": "You finished the slide as everyone shuffled out. Somehow the real proof numbers landed. A director laughed and called you dedicated. Do not try this twice."
  },
  "spreadsheet-mandate:yes:0": {
    "builder": "You proposed a single source of git truth with a weekly export for Maureen. She fought it. Your manager backed the team tool. Maureen still prints the Excel version for meetings. Progress, not peace.",
    "truth-finder": "You proposed a single source of data truth with a weekly data export for Maureen. She fought it. Your manager backed the team tool. Maureen still prints the Excel version for meetings. Progress, not peace.",
    "professor": "You proposed a single source of axiomatic truth with a weekly export for Maureen. She fought it. Your manager backed the team tool. Maureen still prints the Excel version for meetings. Progress, not peace."
  },
  "spreadsheet-mandate:yes:1": {
    "builder": "You pushed back. Maureen emailed leadership that you were \"not collaborative.\" Now you maintain two sprint trackers and attend a monthly meeting about which one is official. Neither is.",
    "product-partner": "You pushed back. Maureen emailed leadership that you were \"not collaborative.\" Now you maintain two roadmap trackers and attend a monthly meeting about which one is official. Neither is.",
    "mentor": "You pushed back. Maureen emailed leadership that you were \"not team-oriented.\" Now you maintain two trackers and attend a monthly alignment meeting about which one is official. Neither is."
  },
  "spreadsheet-mandate:no:0": {
    "builder": "You inherited the workbook. It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the Jira whisperer against your will.",
    "product-partner": "You inherited the forty roadmap tabs. It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will.",
    "fast-learner": "You inherited the workbook Maureen swears everyone knows. It took ninety minutes to understand her logic. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will.",
    "craftsperson": "You inherited the design debt workbook. It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will.",
    "reliability-pro": "You inherited the on-call workbook. It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will.",
    "mentor": "You inherited the workbook. It took ninety minutes to understand tab naming. Maureen called you a team lifesaver. You have become the spreadsheet whisperer against your will.",
    "professor": "You inherited the workbook Maureen calls \"elegant.\" It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will."
  },
  "spreadsheet-mandate:no:1": {
    "builder": "You fixed the cursed macros and color-coded tabs like a hero. Leadership loved the visibility. Maureen adopted your improvements as the official format. You turned a chore into a win.",
    "product-partner": "You fixed the macros and color-coded tabs like a hero. Leadership loved the visibility. Maureen adopted your improvements as the official roadmap format. You turned a roadmap chore into a win.",
    "craftsperson": "You fixed the macros and color-coded design tabs like a hero. Leadership loved the visibility. Maureen adopted your improvements as the official design tracker format. You turned a chore into a win.",
    "truth-finder": "You fixed the macros and color-coded tabs like a hero. Leadership loved the FINAL (probably). Maureen adopted your improvements as the official format. You turned a chore into a win.",
    "reliability-pro": "You fixed the broken automation macros and color-coded tabs like a hero. Leadership loved the visibility. Maureen adopted your improvements as the official ops tracker format. You turned a chore into a win."
  },
  "long-quick-call:yes:0": {
    "product-partner": "You stayed. You spoke for ninety seconds at minute fifty-one. Everyone said \"great, we are roadmap-aligned\" and left. You missed the next meeting and gained nothing except attendance credit.",
    "fast-learner": "You stayed. You spoke for ninety seconds at forty-seven minutes of context you lack. Everyone said \"great, we are aligned\" and left. You missed the next meeting and gained nothing except onboarding attendance credit.",
    "craftsperson": "You stayed. You spoke for ninety seconds at minute fifty-one. Everyone said \"great, we are pixel-aligned\" and left. You missed the next meeting and gained nothing except attendance credit.",
    "reliability-pro": "You stayed. You spoke for ninety seconds at minute fifty-one of your life. Everyone said \"great, we are incident-aligned\" and left. You missed the next meeting and gained nothing except on-call attendance credit.",
    "mentor": "You stayed. You spoke for ninety seconds at minute fifty-one. Everyone said \"great, we are team-aligned\" and left. You missed the next meeting and gained nothing except attendance credit.",
    "professor": "You stayed. You spoke for ninety seconds at minute fifty-one. Everyone said \"great, we are citation-aligned\" and left. You missed the next meeting and gained nothing except seminar attendance credit."
  },
  "long-quick-call:yes:1": {
    "builder": "You waited it out and gave a two-minute PR update. One director actually asked a good question and wanted a follow-up on your PR directly. Ninety seconds. Clear impact. Worth the wait.",
    "craftsperson": "You waited it out and gave a two-minute design update. One director actually asked a good question and wanted a follow-up with you directly. Ninety seconds. Clear impact. Worth the wait.",
    "truth-finder": "You waited it out and gave a crisp metrics update. One director actually asked a good question and wanted a follow-up with you directly. Ninety seconds. Clear impact. Worth the wait.",
    "mentor": "You waited it out and gave a crisp update. One director actually asked a good question and wanted a follow-up with your team directly. Ninety seconds. Clear impact. Worth the wait.",
    "professor": "You waited it out and gave a two-minute proof update. One director actually asked a good question and wanted a follow-up with you directly. Ninety seconds. Clear impact. Worth the wait."
  },
  "long-quick-call:no:0": {
    "builder": "You dropped a tight update in the chat and left with a polite excuse. Patricia called it \"disengaged.\" Your manager said the async PR summary was clearer than the call. You got ten minutes back.",
    "product-partner": "You dropped a tight update in the chat and left with a polite excuse. Patricia called it \"not roadmap-aligned.\" Your manager said the async roadmap note was clearer than the call. You got ten minutes back.",
    "truth-finder": "You dropped a tight update in the chat and left with a polite excuse. Patricia called it \"disengaged.\" Your manager said the async data note was clearer than the call. You got ten minutes back.",
    "mentor": "You dropped a tight update in the chat and left with a polite excuse. Patricia called it \"not team-spirited enough.\" Your manager said the async note was clearer than the call. You got ten minutes back."
  },
  "long-quick-call:no:1": {
    "fast-learner": "You tried to leave async. Patricia read your note aloud anyway and mispronounced half your project name. You rejoined to correct three facts. The call ended at the hour mark.",
    "craftsperson": "You tried to leave async. Patricia read your note aloud anyway and mispronounced half your design terms. You rejoined to correct three facts. The call ended at the hour mark.",
    "truth-finder": "You tried to leave async. Patricia read your note aloud anyway and mispronounced half of it. You rejoined to correct three data points. The call ended at the hour mark."
  },
  "direct-leader-dm:yes:0": {
    "builder": "You answered in the DM. The director got the unfiltered technical take they wanted. Then your manager found the thread. They felt bypassed on the architecture thread. Neither of them said anything useful before the review. You got what they asked for and still lost trust on both sides.",
    "product-partner": "You answered in the DM. The director got the unfiltered roadmap take they wanted. Then your manager found the thread. They felt bypassed. Neither of them said anything useful before the review. You got what they asked for and still lost trust on both sides.",
    "craftsperson": "You answered in the DM. The director got the unfiltered take they wanted. Then your manager found the thread. They felt bypassed on the design review thread. Neither of them said anything useful before the review. You got what they asked for and still lost trust on both sides.",
    "reliability-pro": "You answered in the DM about prod risk. The director got the unfiltered take they wanted. Then your manager found the thread. They felt bypassed on the on-call chain. Neither of them said anything useful before the review. You got what they asked for and still lost trust on both sides."
  },
  "direct-leader-dm:yes:1": {
    "builder": "You answered with commit receipts and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "product-partner": "You answered directly with roadmap receipts and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their roadmap short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "fast-learner": "You answered directly with notes-app receipts and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their learning-track short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "craftsperson": "You answered directly with design receipts and diplomacy. The director replied \"this is exactly the UX honesty I needed for tomorrow.\" Your take is on their short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "truth-finder": "You answered directly with data receipts and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their analytics short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "reliability-pro": "You answered directly with incident receipts and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their short list now. Your manager never saw the thread. Clever move. Slightly guilty move.",
    "professor": "You answered directly with citations and diplomacy. The director replied \"this is exactly what I needed for tomorrow.\" Your take is on their short list now. Your manager never saw the thread. Clever move. Slightly guilty move."
  },
  "direct-leader-dm:no:0": {
    "builder": "You told your manager first. They joined, helped you sharpen the answer, and backed you up. The director replied that it was exactly the technical clarity they needed for tomorrow. Your manager said you did the right thing. Proper channels. No drama.",
    "product-partner": "You told your manager first. They joined, helped you sharpen the answer, and backed you up. The director replied that it was exactly the roadmap clarity they needed for tomorrow. Your manager said you did the right thing. Proper channels. No drama.",
    "fast-learner": "You told your manager first. They joined, helped you sharpen the answer, and backed you up. The director replied that it was exactly what they needed for tomorrow. Your manager said you did the right thing for your onboarding track. Proper channels. No drama.",
    "truth-finder": "You told your manager first. They joined, helped you sharpen the answer, and backed you up. The director replied that it was exactly the data clarity they needed for tomorrow. Your manager said you did the right thing. Proper channels. No drama.",
    "mentor": "You told your manager first. They joined, helped you sharpen the answer, and backed you up with the team. The director replied that it was exactly what they needed for tomorrow. Your manager said you modeled exactly what you tell your reports to do. Proper channels. No drama."
  },
  "direct-leader-dm:no:1": {
    "product-partner": "You looped in your manager. The director replied \"never mind\" and dropped the thread. By afternoon you learned they asked a PM peer the same roadmap question and used that answer in tomorrow's review prep. Your manager said you did the right thing. Your roadmap bet was not on the slide.",
    "fast-learner": "You looped in your manager. The director replied \"never mind\" and dropped the thread. By afternoon you learned they asked a peer the same question and used that answer in tomorrow's review prep. Your manager said you did the right thing for your onboarding track. Your name was not on the slide.",
    "mentor": "You looped in your manager. The director replied \"never mind\" and dropped the thread. By afternoon you learned they asked another team lead the same question and used that answer in tomorrow's review prep. Your manager said you modeled exactly what you tell your reports to do. Your team's name was not on the slide.",
    "professor": "You looped in your manager. The director replied \"never mind\" and dropped the thread. By afternoon you learned they asked another researcher the same question and used that answer in tomorrow's review prep. Your manager said you did the right thing. Your name was not on the slide."
  },
  "screen-share-moment:yes:0": {
    "builder": "You told him gently in chat. He panicked, fixed the screen share, and laughed it off. Leadership pretended not to read the sprint complaint tab. Chad thanked you afterwards. The standup still ran long.",
    "product-partner": "You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the roadmap complaint tab. Chad thanked you afterwards. The roadmap demo still ran long.",
    "craftsperson": "You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the mockup complaint tab. Chad thanked you afterwards. The demo still ran long.",
    "truth-finder": "You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the numbers complaint tab. Chad thanked you afterwards. The demo still ran long.",
    "mentor": "You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the complaint tab. Chad thanked you for saving his demo. The demo still ran long.",
    "professor": "You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the research complaint tab. Chad thanked you afterwards. The demo still ran long."
  },
  "screen-share-moment:yes:1": {
    "fast-learner": "You spoke up in the room. Chad blamed \"new-hire Zoom lag,\" but a director had already seen the complaint draft. Afterward that director DMed you a quiet \"thanks for flagging it.\" Chad acts like nothing happened. You came out as the one paying attention.",
    "truth-finder": "You spoke up in the room. Chad blamed \"Zoom lag,\" but a director had already seen the numbers complaint draft. Afterward that director DMed you a quiet \"thanks for flagging it.\" Chad acts like nothing happened. You came out as the one paying attention.",
    "mentor": "You spoke up in the room. Chad blamed \"Zoom lag,\" but a director had already seen the complaint draft. Afterward that director DMed you a quiet \"thanks for flagging it.\" Chad acts like mentorship never happened. You came out as the one paying attention.",
    "professor": "You spoke up in the room. Chad blamed \"network lag, obviously,\" but a director had already seen the grant complaint draft. Afterward that director DMed you a quiet \"thanks for flagging it.\" Chad acts like nothing happened. You came out as the one paying attention."
  },
  "screen-share-moment:no:0": {
    "builder": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the deck. He called it a \"Zoom permissions issue.\" You have screenshots in your soul.",
    "product-partner": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the actual roadmap deck. He called it a \"permissions issue.\" You have screenshots in your soul.",
    "fast-learner": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the deck. He called it a \"permissions issue.\" You have screenshots in your onboarding journal.",
    "craftsperson": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the actual Figma deck. He called it a \"permissions issue.\" You have screenshots in your soul.",
    "truth-finder": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the deck. He called it a \"permissions issue.\" You have receipts in your soul.",
    "reliability-pro": "You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the deck. He called it a \"permissions issue.\" You have screenshots in your soul."
  },
  "weather-small-talk:yes:0": {
    "builder": "You added a comment about the rain on your commute. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real coding work and still have no decision.",
    "product-partner": "You added a comment about your commute. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real work and still have no scope decision.",
    "craftsperson": "You added a take on patio furniture. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real work and still have no decision.",
    "truth-finder": "You added an observation that the chat contained zero data. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real work and still have no data-driven decision.",
    "reliability-pro": "You added a bit about the server room heat. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real incident work and still have no decision.",
    "professor": "You added a tangent about atmospheric pressure. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real work and still have no decision."
  },
  "weather-small-talk:yes:1": {
    "builder": "You played along with charm. Patricia called you \"great remote culture fit\" in the chat. When work finally started, leadership remembered your point and moved the decision forward. Charm and substance.",
    "product-partner": "You played along with charm. Patricia called you \"great culture fit\" in the chat. When work finally started, leadership remembered your point and moved the scope decision forward. Charm and substance.",
    "craftsperson": "You played along with charm. Patricia called you \"a great hang\" in the chat. When work finally started, leadership remembered your point and moved the decision forward. Charm and substance.",
    "truth-finder": "You played along with charm. Patricia called you \"great culture fit\" in the chat. When work finally started, leadership remembered your point and moved the data-driven decision forward. Charm and substance.",
    "mentor": "You played along with charm. Patricia called you \"great team culture fit\" in the chat. When work finally started, leadership remembered your point and moved the decision forward. Charm and substance.",
    "professor": "You played along with charm. Patricia called you \"surprisingly fun for an academic\" in the chat. When work finally started, leadership remembered your point and moved the decision forward. Charm and substance."
  },
  "weather-small-talk:no:0": {
    "product-partner": "You nudged the roadmap agenda. Patricia said \"just warming up.\" Two people looked relieved. You became the person who hates fun. The actual topic started at minute eleven.",
    "fast-learner": "You nudged the agenda. Patricia said \"just icebreaker warming up.\" Two people looked relieved. You became the person who hates fun. The actual topic started at minute eleven.",
    "craftsperson": "You nudged the agenda. Patricia said \"just warming up.\" Two people looked relieved. You became the person who hates design fun. The actual topic started at minute eleven.",
    "mentor": "You nudged the agenda. Patricia said \"just warming up.\" Two people looked relieved. You became the person who hates team fun. The actual topic started at minute eleven.",
    "professor": "You nudged the research agenda. Patricia said \"just warming up.\" Two people looked relieved. You became the person who hates fun. The actual topic started at minute eleven."
  },
  "weather-small-talk:no:1": {
    "builder": "You tried to redirect. Patricia said weather talk \"builds psychological safety.\" The sprint hard stop still happened. You left with action items and frostbite.",
    "product-partner": "You tried to redirect. Patricia said weather talk \"builds roadmap psychological safety.\" The hard stop still happened. You left with action items and frostbite.",
    "fast-learner": "You tried to redirect. Patricia said eight minutes on weather you just moved here \"builds psychological safety.\" The hard stop still happened. You left with action items and onboarding frostbite.",
    "truth-finder": "You tried to redirect. Patricia said weather talk \"builds psychological safety.\" The hard stop still happened. You left with metric action items and analysis paralysis frostbite.",
    "reliability-pro": "You tried to redirect. Patricia said weather talk \"builds psychological safety.\" The pager hard stop still happened. You left with action items and frostbite.",
    "mentor": "You tried to redirect. Patricia said weather talk \"builds team psychological safety.\" The hard stop still happened. You left with action items and frostbite.",
    "professor": "You tried to redirect. Patricia said climate model talk \"builds psychological safety.\" The hard stop still happened. You left with action items and frostbite."
  },
  "take-it-offline:yes:0": {
    "builder": "You joined the follow-up architecture call. Same argument, higher headcount. Someone said \"take this to a PR comment.\" You have now attended two meetings and resolved nothing.",
    "product-partner": "You joined the follow-up call. Same scope argument, higher headcount. Someone said \"take this to the roadmap doc.\" You have now attended two meetings and resolved nothing.",
    "fast-learner": "You joined the follow-up call. Same argument, higher headcount, lower clarity. Someone said \"let's circle back.\" You have now attended two meetings and resolved nothing.",
    "craftsperson": "You joined the follow-up design call. Same argument, higher headcount. Someone said \"let's circle back.\" You have now attended two meetings and resolved nothing.",
    "truth-finder": "You joined the follow-up call. Same argument, higher headcount. Someone said \"let's circle back.\" You have now attended two meetings and resolved no metrics.",
    "reliability-pro": "You joined the follow-up incident call. Same prod argument, higher headcount. Someone said \"let's circle back.\" You have now attended two meetings and resolved nothing.",
    "mentor": "You joined the follow-up call. Same argument, higher headcount. Someone said \"take this to a 1:1.\" You have now attended two meetings and resolved nothing.",
    "professor": "You joined the follow-up call. Same argument, higher headcount. Someone said \"take this to office hours.\" You have now attended two meetings and resolved nothing."
  },
  "take-it-offline:yes:1": {
    "reliability-pro": "You took the follow-up and finally landed a decision. It took ninety minutes. Derek called it \"great incident alignment.\" You call it three hours on one question.",
    "mentor": "You took the follow-up and finally landed a decision. It took ninety minutes. Derek called it \"great team alignment.\" You call it three hours coaching one question."
  },
  "take-it-offline:no:0": {
    "builder": "You asked for a shared RFC doc and async comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The thread solved it by Thursday. Miracles happen.",
    "product-partner": "You asked for a shared doc and async roadmap comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The thread solved it by Thursday. Miracles happen.",
    "fast-learner": "You asked for a shared doc and async comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The thread solved it by Thursday. Onboarding miracles happen.",
    "craftsperson": "You asked for a shared Figma doc and async comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The thread solved it by Thursday. Miracles happen.",
    "truth-finder": "You asked for a shared data doc and async comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The spreadsheet solved it by Thursday. Miracles happen.",
    "professor": "You asked for a shared proof doc and async comments. Derek said that was \"less collaborative.\" Patricia removed the extra call. The thread solved it by Thursday. Miracles happen."
  },
  "take-it-offline:no:1": {
    "craftsperson": "You pushed for async. Derek scheduled the call anyway and tagged you as required. You lost the format fight and still had to attend. \"Async\" remains a lie.",
    "professor": "You pushed for async. Derek scheduled the call anyway and tagged you as required. You lost the format fight and still had to attend. \"Office hours\" remain a lie."
  },
  "unmuted-chaos:yes:0": {
    "builder": "You fired off a direct message: \"YOU ARE LIVE. MUTE.\" They caught it a breath before the part they would never live down. Mortified, grateful, silent. The noise died, the CEO carried on, and you actually caught the update about your sprint.",
    "product-partner": "You fired off a direct message: \"YOU ARE LIVE. MUTE.\" They caught it a breath before the part they would never live down. Mortified, grateful, silent. The noise died, the CEO carried on, and you actually caught the roadmap update.",
    "craftsperson": "You fired off a direct message: \"YOU ARE LIVE. MUTE.\" They caught it a breath before the part they would never live down. Mortified, grateful, silent. The noise died, the CEO carried on, and you actually caught the update about the design work.",
    "truth-finder": "You fired off a direct message: \"YOU ARE LIVE. MUTE.\" They caught it a breath before the part they would never live down. Mortified, grateful, silent. The noise died, the CEO carried on, and you actually caught the actual numbers for your team."
  },
  "unmuted-chaos:yes:1": {
    "builder": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before the part where they named names. A leader noticed, quietly, that you handled it with class.",
    "product-partner": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before the part where they trashed the roadmap by name. A leader noticed, quietly, that you handled it with class.",
    "fast-learner": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before the gossip got specific. A leader noticed, quietly, that you handled it with class.",
    "craftsperson": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before they tore the design apart by name. A leader noticed, quietly, that you handled it with class.",
    "truth-finder": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before they called the company numbers fake on a live mic. A leader noticed, quietly, that you handled it with class.",
    "reliability-pro": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before they named the on-call rotation and everyone on it. A leader noticed, quietly, that you handled it with class.",
    "mentor": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before they named their manager. A leader noticed, quietly, that you handled it with class.",
    "professor": "You flagged it in the chat: \"check your mute.\" It worked, but now everyone knew whose mic it was. Your teammate was embarrassed, though you cut them off before they called a colleague's method nonsense on a live mic. A leader noticed, quietly, that you handled it with class."
  },
  "unmuted-chaos:no:0": {
    "builder": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate aired a code-review grudge to the whole company. You caught none of the actual update, and you could have spared them.",
    "product-partner": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate trashed the roadmap to the whole company. You caught none of the actual update, and you could have spared them.",
    "fast-learner": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate spilled onboarding gossip to the whole company. You caught none of the actual update, and you could have spared them.",
    "craftsperson": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate tore a colleague's design apart in front of the whole company. You caught none of the actual update, and you could have spared them.",
    "truth-finder": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate called the company numbers fake to the whole company. You caught none of the actual update, and you could have spared them.",
    "reliability-pro": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate ranted about the on-call rotation to the whole company. You caught none of the actual update, and you could have spared them.",
    "mentor": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate vented about their manager to the whole company. You caught none of the actual update, and you could have spared them.",
    "professor": "You stayed out of it. Someone else flagged the mute eventually, but not before your teammate called a colleague's method nonsense in front of the whole company. You caught none of the actual update, and you could have spared them."
  },
  "unmuted-chaos:no:1": {
    "builder": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate messages you: \"what did they say about headcount and the hiring freeze?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "product-partner": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate messages you: \"what did they say about roadmap headcount?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "fast-learner": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate, mid-onboarding, messages you: \"what did they say about headcount?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "truth-finder": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate messages you: \"what did they say about headcount numbers?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "reliability-pro": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate pages you: \"what did they say about headcount?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "mentor": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A mentee messages you: \"what did they say about headcount?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.",
    "professor": "You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your department. A teammate messages you: \"what did they say about tenure-track headcount?\" You have no idea. Nobody flagged it in time, and the one update that mattered is gone."
  },
  "townhall-question:yes:0": {
    "builder": "You asked a sharp question about the architecture after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "product-partner": "You asked a sharp question about the roadmap after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "fast-learner": "You asked a sharp question about onboarding after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "craftsperson": "You asked a sharp question about the design direction after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "truth-finder": "You asked a sharp, data-backed question after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "reliability-pro": "You asked a sharp question about reliability after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "mentor": "You asked a sharp question about the team after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment.",
    "professor": "You asked a sharp question about the model after Derek's tour. Leadership appreciated it. Derek told someone you were \"trying to show off.\" The chat called your question \"the only good one.\" Worth the secondhand embarrassment."
  },
  "townhall-question:yes:1": {
    "builder": "You tried to jump in with your architecture question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a wiki page that does not exist.",
    "product-partner": "You tried to jump in with your roadmap question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried on a slide that does not exist.",
    "fast-learner": "You tried to jump in with your onboarding question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a doc that does not exist.",
    "craftsperson": "You tried to jump in with your design question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a Figma comment that does not exist.",
    "truth-finder": "You tried to jump in with your data question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a dataset that does not exist.",
    "reliability-pro": "You tried to jump in with your on-call question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a runbook that does not exist.",
    "mentor": "You tried to jump in with your team question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a 1:1 note that does not exist.",
    "professor": "You tried to jump in with your model question, but Derek had already burned the clock. The CEO was mid-sentence on \"we're out of time\" before you finished. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in a proof appendix that does not exist."
  },
  "townhall-question:no:0": {
    "builder": "You let it go. The town hall ended on time. You never got a straight answer on the architecture. Someone will tell you eventually. Probably in a meeting.",
    "product-partner": "You let it go. The town hall ended on time. You never got a straight answer on the roadmap. Someone will tell you eventually. Probably in a meeting.",
    "fast-learner": "You let it go. The town hall ended on time. You never got a straight answer on onboarding. Someone will tell you eventually. Probably in a meeting.",
    "craftsperson": "You let it go. The town hall ended on time. You never got a straight answer on the design direction. Someone will tell you eventually. Probably in a meeting.",
    "truth-finder": "You let it go. The town hall ended on time. You never got a straight answer on the data. Someone will tell you eventually. Probably in a meeting.",
    "reliability-pro": "You let it go. The town hall ended on time. You never got a straight answer about the on-call changes. Someone will tell you eventually. Probably in a meeting.",
    "mentor": "You let it go. The town hall ended on time. You never got a straight answer about the team. Someone will tell you eventually. Probably in a meeting.",
    "professor": "You let it go. The town hall ended on time. You never got a straight answer on the model. Someone will tell you eventually. Probably in a meeting."
  },
  "townhall-question:no:1": {
    "builder": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your architecture question is still unanswered.",
    "product-partner": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your roadmap question is still unanswered.",
    "fast-learner": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your onboarding question is still unanswered.",
    "craftsperson": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your design question is still unanswered.",
    "truth-finder": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your data question is still unanswered.",
    "reliability-pro": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your reliability question is still unanswered.",
    "mentor": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your team question is still unanswered.",
    "professor": "You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to \"take it offline.\" You saved your dignity. Your model question is still unanswered."
  },
  "oma-marga-call:yes:0": {
    "builder": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any standup this week had managed.",
    "product-partner": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any roadmap review this week had managed.",
    "fast-learner": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any onboarding session this week had managed.",
    "craftsperson": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any design review this week had managed.",
    "truth-finder": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any readout this week had managed.",
    "reliability-pro": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any postmortem this week had managed.",
    "mentor": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any one-on-one this week had managed.",
    "professor": "You picked up. \"Did you get my email?\" Not hello. You said you had, and one line in it stuck with you: \"Life is mostly made of changes, and every day has to be decided fresh.\" You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than any faculty meeting this week had managed."
  },
  "oma-marga-call:yes:1": {
    "builder": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your tickets went faster than they had any right to, and the first thing you did after was reply to her email.",
    "product-partner": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your reviews went faster than they had any right to, and the first thing you did after was reply to her email.",
    "fast-learner": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your tasks went faster than they had any right to, and the first thing you did after was reply to her email.",
    "craftsperson": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your mockups went faster than they had any right to, and the first thing you did after was reply to her email.",
    "truth-finder": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your analysis went faster than it had any right to, and the first thing you did after was reply to her email.",
    "reliability-pro": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your checks went faster than they had any right to, and the first thing you did after was reply to her email.",
    "mentor": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your 1:1s went faster than they had any right to, and the first thing you did after was reply to her email.",
    "professor": "You picked up. \"Did you get my email?\" You opened it right there while she waited. She had figured out how to attach a photo all by herself and was thrilled about it, and she signed off: \"So proud of you.\" Something in you went instantly warmer, a little prouder too. The rest of your proofs went faster than they had any right to, and the first thing you did after was reply to her email."
  },
  "oma-marga-call:no:0": {
    "builder": "You sent it to voicemail and finished the thread. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "product-partner": "You sent it to voicemail and finished the deck. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "fast-learner": "You sent it to voicemail and finished the task. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "craftsperson": "You sent it to voicemail and finished the screen. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "truth-finder": "You sent it to voicemail and finished the chart. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "reliability-pro": "You sent it to voicemail and closed the ticket. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "mentor": "You sent it to voicemail and finished the sync. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks.",
    "professor": "You sent it to voicemail and finished the proof. At 7 PM your inbox had a follow-up and a two-minute message. \"Did you get my email?\" You opened it on the walk home. It ended: \"I wish you lots of fun and success. Here's to email!!!!\" Of course there were four exclamation marks."
  },
  "oma-marga-call:no:1": {
    "builder": "You silenced the call and pushed through the deploy. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "product-partner": "You silenced the call and pushed through the review. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "fast-learner": "You silenced the call and pushed through the module. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "craftsperson": "You silenced the call and pushed through the handoff. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "truth-finder": "You silenced the call and pushed through the analysis. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "reliability-pro": "You silenced the call and pushed through the checklist. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "mentor": "You silenced the call and pushed through the team fire. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.",
    "professor": "You silenced the call and pushed through the draft. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: \"I am so proud of you.\" It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for."
  }
};
