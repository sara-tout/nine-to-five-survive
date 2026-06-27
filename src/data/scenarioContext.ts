import { CharacterRole } from './characters';
import { DayModifierId, getMoodOutcomeNote } from './dayModifiers';
import { Outcome } from './scenarios';
import { resolveOutcome } from './scenarioText';

export type GameFlag =
  | 'derek-grudge'
  | 'derek-pleased'
  | 'deep-work-reputation'
  | 'missed-room-gossip'
  | 'jessica-ally'
  | 'jessica-drama'
  | 'low-visibility'
  | 'office-diplomat'
  | 'reorg-insider'
  | 'peer-tension'
  | 'victoria-escalated'
  | 'responsive-reputation'
  | 'credit-invisible'
  | 'self-advocated'
  | 'exec-snubbed'
  | 'exec-visible'
  | 'vision-corrected'
  | 'vision-lost'
  | 'shoutout-spoke-up'
  | 'shoutout-silent'
  | 'deadline-pushed-back'
  | 'deadline-absorbed'
  | 'ghost-escalated'
  | 'ghost-bypassed'
  | 'process-pushed-back'
  | 'visibility-harvested'
  | 'deadline-chain-active';

export interface PriorChoice {
  scenarioId: string;
  choice: 'yes' | 'no';
}

export interface ScenarioContext {
  dayModifier: DayModifierId;
  priorChoices: PriorChoice[];
  flags: GameFlag[];
}

function cloneOutcomes(outcomes: Outcome[]): Outcome[] {
  return outcomes.map((o) => ({ ...o }));
}

function bumpWeight(outcomes: Outcome[], index: number, delta: number) {
  outcomes[index].weight = Math.max(5, outcomes[index].weight + delta);
}

/** Shift odds before rolling. Both choices should stay viable; context nudges, not guarantees. */
export function adjustOutcomeWeights(
  scenarioId: string,
  choice: 'yes' | 'no',
  outcomes: Outcome[],
  context: ScenarioContext,
): Outcome[] {
  const adjusted = cloneOutcomes(outcomes);
  const { dayModifier, flags, priorChoices } = context;

  switch (dayModifier) {
    case 'manager-on-edge':
      bumpWeight(adjusted, 0, 12);
      if (scenarioId === 'peer-callout') bumpWeight(adjusted, 0, 8);
      break;
    case 'derek-chipper':
      if (scenarioId === 'late-night-task' || scenarioId === 'demo-day' || scenarioId === 'pto-guilt' || scenarioId === 'all-hands-question') {
        bumpWeight(adjusted, adjusted.length - 1, 12);
      }
      break;
    case 'reorg-rumors':
      if (scenarioId === 'reorg-rumor' || scenarioId === 'meeting-marathon') {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'bad-sleep':
      bumpWeight(adjusted, 0, 8);
      break;
    case 'great-coffee':
      bumpWeight(adjusted, adjusted.length - 1, 10);
      break;
    case 'exec-walkthrough':
      if (
        [
          'demo-day',
          'all-hands-question',
          'exec-roundtable',
          'team-shoutout',
          'borrowed-vision',
          'visibility-pack',
          'townhall-question',
          'unmuted-chaos',
        ].includes(scenarioId)
      ) {
        if (choice === 'yes') bumpWeight(adjusted, adjusted.length - 1, 12);
        else bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'budget-cut':
      if (
        ['precommitted-deadline', 'visibility-pack', 'pto-guilt', 'performance-review', 'meeting-marathon'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'budget-boost':
      if (['demo-day', 'exec-roundtable', 'team-shoutout', 'all-hands-question', 'reorg-rumor'].includes(scenarioId)) {
        bumpWeight(adjusted, adjusted.length - 1, 12);
      }
      break;
    case 'ai-replacement-chatter':
      if (
        ['slack-fire', 'borrowed-vision', 'performance-review', 'all-hands-question', 'team-shoutout', 'ai-wrapper-demo'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'ai-roadmap-push':
      if (
        ['demo-day', 'borrowed-vision', 'visibility-pack', 'precommitted-deadline', 'exec-roundtable', 'ai-wrapper-demo'].includes(
          scenarioId,
        )
      ) {
        if (choice === 'yes') bumpWeight(adjusted, adjusted.length - 1, 10);
        else bumpWeight(adjusted, 0, 6);
      }
      break;
    case 'layoff-rumors':
      if (['reorg-rumor', 'pto-guilt', 'performance-review', 'peer-callout', 'late-night-task'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'quarter-end-crunch':
      if (
        ['late-night-task', 'precommitted-deadline', 'demo-day', 'hourly-checkins', 'missing-blocker'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 12);
      }
      break;
    case 'team-offsite':
      if (['missing-blocker', 'meeting-marathon', 'hourly-checkins', 'peer-callout', 'slack-fire'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'perf-review-season':
      if (['performance-review', 'peer-callout', 'team-shoutout', 'pto-guilt', 'visibility-pack'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'all-hands-overload':
      if (
        [
          'all-hands-question',
          'meeting-marathon',
          'demo-day',
          'borrowed-vision',
          'ai-wrapper-demo',
          'townhall-question',
          'unmuted-chaos',
        ].includes(scenarioId)
      ) {
        bumpWeight(adjusted, 0, 8);
        if (scenarioId === 'demo-day' || scenarioId === 'ai-wrapper-demo') bumpWeight(adjusted, 0, 6);
      }
      break;
    case 'printer-meltdown':
      if (['late-night-task', 'slack-fire', 'hourly-checkins', 'lunch-steal', 'missing-blocker'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'new-ceo-energy':
      if (['exec-roundtable', 'demo-day', 'visibility-pack', 'borrowed-vision', 'ai-wrapper-demo'].includes(scenarioId)) {
        if (choice === 'yes') bumpWeight(adjusted, adjusted.length - 1, 10);
        else bumpWeight(adjusted, 0, 6);
      }
      break;
    case 'rto-push':
      if (['pto-guilt', 'meeting-marathon', 'hourly-checkins', 'visibility-pack', 'peer-callout'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'under-the-weather':
      bumpWeight(adjusted, 0, 10);
      if (['ten-minute-favor', 'long-quick-call', 'meeting-marathon'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 6);
      }
      break;
    case 'unexplained-absence':
      if (['hourly-checkins', 'precommitted-deadline', 'visibility-pack', 'instant-briefing'].includes(scenarioId)) {
        bumpWeight(adjusted, adjusted.length - 1, 12);
      }
      break;
    case 'storm-outage':
      if (
        [
          'demo-day',
          'ai-wrapper-demo',
          'fire-drill-demo',
          'slack-fire',
          'long-quick-call',
          'direct-leader-dm',
          'screen-share-moment',
          'take-it-offline',
          'unmuted-chaos',
        ].includes(scenarioId)
      ) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'office-cold':
      if (
        ['meeting-marathon', 'unmuted-chaos', 'townhall-question', 'weather-small-talk', 'long-quick-call'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'quiet-week-lie':
      if (
        ['meeting-marathon', 'long-quick-call', 'take-it-offline', 'hourly-checkins', 'ten-minute-favor'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'post-outage':
      if (
        ['late-night-task', 'demo-day', 'fire-drill-demo', 'missing-blocker', 'peer-callout', 'urgent-overnight'].includes(
          scenarioId,
        )
      ) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'catered-lunch-trap':
      if (['lunch-steal', 'pto-guilt', 'late-night-task', 'team-shoutout', 'visibility-pack'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'freezing-office':
      if (['meeting-marathon', 'long-quick-call', 'weather-small-talk', 'hourly-checkins', 'ten-minute-favor'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'sweltering-office':
      if (['meeting-marathon', 'demo-day', 'fire-drill-demo', 'townhall-question', 'unmuted-chaos'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'mystery-smell':
      if (['lunch-steal', 'printer-meltdown', 'slack-fire', 'missing-blocker'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'vpn-expired':
      if (['demo-day', 'late-night-task', 'screen-share-moment', 'direct-leader-dm', 'spreadsheet-mandate'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'new-tool-rollout':
      if (['spreadsheet-mandate', 'visibility-pack', 'ai-wrapper-demo', 'borrowed-vision', 'precommitted-deadline'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'interview-loop':
      if (['meeting-marathon', 'long-quick-call', 'pto-guilt', 'performance-review', 'ten-minute-favor'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
    case 'birthday-cake':
      if (['lunch-steal', 'team-shoutout', 'meeting-marathon', 'quarter-end-crunch'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'hot-desk-roulette':
      if (['screen-share-moment', 'hourly-checkins', 'demo-day', 'slack-fire', 'missing-blocker'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 8);
      }
      break;
    case 'leadership-offsite':
      if (['precommitted-deadline', 'urgent-overnight', 'reorg-rumor', 'direct-leader-dm', 'missing-blocker'].includes(scenarioId)) {
        bumpWeight(adjusted, 0, 10);
      }
      break;
  }

  if (flags.includes('derek-grudge') && ['late-night-task', 'demo-day', 'pto-guilt', 'all-hands-question'].includes(scenarioId)) {
    if (choice === 'no') bumpWeight(adjusted, 0, 15);
  }
  if (flags.includes('derek-pleased') && ['late-night-task', 'demo-day', 'pto-guilt'].includes(scenarioId)) {
    if (choice === 'yes') bumpWeight(adjusted, adjusted.length - 1, 12);
  }
  if (flags.includes('deep-work-reputation') && choice === 'no') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('missed-room-gossip') && (scenarioId === 'demo-day' || scenarioId === 'all-hands-question')) {
    bumpWeight(adjusted, 0, 12);
  }
  if (flags.includes('jessica-ally') && scenarioId === 'reorg-rumor') {
    bumpWeight(adjusted, adjusted.length - 1, 15);
  }
  if (flags.includes('jessica-drama') && scenarioId === 'pto-guilt') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('low-visibility') && (scenarioId === 'demo-day' || scenarioId === 'all-hands-question')) {
    bumpWeight(adjusted, 0, 14);
  }
  if (flags.includes('office-diplomat') && scenarioId === 'slack-fire') {
    bumpWeight(adjusted, adjusted.length - 1, 20);
  }
  if (flags.includes('reorg-insider') && scenarioId === 'meeting-marathon') {
    bumpWeight(adjusted, adjusted.length - 1, 12);
  }

  if (priorChoices.some((p) => p.scenarioId === 'meeting-marathon' && p.choice === 'no') && scenarioId === 'all-hands-question') {
    bumpWeight(adjusted, 0, 10);
  }
  if (priorChoices.some((p) => p.scenarioId === 'slack-fire' && p.choice === 'yes') && scenarioId === 'demo-day') {
    bumpWeight(adjusted, adjusted.length - 1, 10);
  }
  if (priorChoices.some((p) => p.scenarioId === 'lunch-steal' && p.choice === 'yes') && scenarioId === 'pto-guilt') {
    bumpWeight(adjusted, 0, 8);
  }
  if (flags.includes('peer-tension') && scenarioId === 'hourly-checkins') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('deep-work-reputation') && scenarioId === 'hourly-checkins' && choice === 'no') {
    bumpWeight(adjusted, adjusted.length - 1, 12);
  }
  if (flags.includes('victoria-escalated') && scenarioId === 'peer-callout') {
    bumpWeight(adjusted, 0, 10);
  }
  if (scenarioId === 'performance-review') {
    if (flags.includes('victoria-escalated') || flags.includes('responsive-reputation')) {
      bumpWeight(adjusted, 0, 8);
    }
    if (flags.includes('derek-pleased')) bumpWeight(adjusted, 0, 6);
    if (flags.includes('peer-tension')) bumpWeight(adjusted, 0, 6);
    if (flags.includes('low-visibility')) bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('credit-invisible') && scenarioId === 'all-hands-question') {
    bumpWeight(adjusted, 0, 8);
  }
  if (flags.includes('exec-snubbed') && scenarioId === 'performance-review') {
    bumpWeight(adjusted, 0, 12);
  }
  if (flags.includes('vision-lost') && scenarioId === 'performance-review') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('shoutout-silent') && scenarioId === 'performance-review') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('exec-visible') && scenarioId === 'borrowed-vision' && choice === 'yes') {
    bumpWeight(adjusted, adjusted.length - 1, 10);
  }
  if (priorChoices.some((p) => p.scenarioId === 'team-shoutout' && p.choice === 'no') && scenarioId === 'exec-roundtable') {
    bumpWeight(adjusted, 0, 8);
  }
  if (priorChoices.some((p) => p.scenarioId === 'borrowed-vision' && p.choice === 'no') && scenarioId === 'performance-review') {
    bumpWeight(adjusted, 0, 8);
  }
  if (flags.includes('deadline-chain-active') && scenarioId === 'missing-blocker') {
    bumpWeight(adjusted, 0, 12);
  }
  if (flags.includes('deadline-chain-active') && scenarioId === 'visibility-pack') {
    bumpWeight(adjusted, 0, 10);
  }
  if (flags.includes('peer-tension') && flags.includes('victoria-escalated') && scenarioId === 'performance-review') {
    bumpWeight(adjusted, 0, 12);
  }

  return adjusted;
}

export function deriveFlags(
  scenarioId: string,
  choice: 'yes' | 'no',
  outcomeIndex: number,
): GameFlag[] {
  const flags: GameFlag[] = [];

  switch (scenarioId) {
    case 'late-night-task':
      if (choice === 'no') flags.push('derek-grudge');
      else flags.push('derek-pleased');
      break;
    case 'meeting-marathon':
      if (choice === 'no') {
        flags.push('deep-work-reputation', 'missed-room-gossip');
      }
      break;
    case 'lunch-steal':
      if (choice === 'yes') {
        flags.push(outcomeIndex === 1 ? 'jessica-ally' : 'jessica-drama');
      }
      break;
    case 'slack-fire':
      if (choice === 'no') flags.push('low-visibility');
      if (choice === 'yes' && outcomeIndex === 1) flags.push('office-diplomat');
      break;
    case 'reorg-rumor':
      if (choice === 'yes' && outcomeIndex === 1) flags.push('reorg-insider');
      break;
    case 'peer-callout':
      if (choice === 'yes' || outcomeIndex === 0) flags.push('peer-tension');
      break;
    case 'hourly-checkins':
      if (choice === 'no' && outcomeIndex === 1) flags.push('victoria-escalated');
      if (choice === 'yes') flags.push('responsive-reputation');
      break;
    case 'performance-review':
      if (choice === 'no' || outcomeIndex === 0) flags.push('credit-invisible');
      if (choice === 'yes' && outcomeIndex === 1) flags.push('self-advocated');
      break;
    case 'exec-roundtable':
      if (choice === 'no' && outcomeIndex === 0) flags.push('exec-snubbed');
      if (choice === 'yes' && outcomeIndex === 1) flags.push('exec-visible');
      break;
    case 'borrowed-vision':
      if (choice === 'yes' && outcomeIndex === 0) flags.push('vision-corrected');
      if (choice === 'no' || outcomeIndex === 1) flags.push('vision-lost');
      break;
    case 'team-shoutout':
      if (choice === 'yes' && outcomeIndex === 1) flags.push('shoutout-spoke-up');
      if (choice === 'no') flags.push('shoutout-silent');
      break;
    case 'precommitted-deadline':
      if (choice === 'yes' && outcomeIndex === 0) flags.push('deadline-pushed-back');
      if (choice === 'no') flags.push('deadline-absorbed', 'deadline-chain-active');
      break;
    case 'missing-blocker':
      if (choice === 'yes') flags.push('ghost-escalated');
      if (choice === 'no') flags.push('ghost-bypassed');
      break;
    case 'visibility-pack':
      if (choice === 'yes') flags.push('process-pushed-back');
      if (choice === 'no' && outcomeIndex === 0) flags.push('visibility-harvested');
      break;
  }

  return flags;
}

function applyStatTweaks(outcome: Outcome, context: ScenarioContext): Outcome {
  const next = { ...outcome };

  if (context.dayModifier === 'bad-sleep') {
    next.energy = Math.max(-30, next.energy - 3);
    next.sanity = Math.max(-30, next.sanity - 3);
  }
  if (context.dayModifier === 'great-coffee') {
    next.energy = Math.min(30, next.energy + 3);
  }
  if (context.dayModifier === 'derek-chipper' && next.sanity > 0) {
    next.sanity = Math.min(30, next.sanity + 2);
  }
  if (context.dayModifier === 'reorg-rumors') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'ai-roadmap-push' && next.performance > 0) {
    next.performance = Math.min(30, next.performance + 2);
  }
  if (context.dayModifier === 'team-offsite') {
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'rto-push') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'new-tool-rollout') {
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'birthday-cake') {
    next.energy = Math.min(30, next.energy + 2);
  }
  if (context.flags.includes('jessica-ally') && next.sanity > 0) {
    next.sanity = Math.min(30, next.sanity + 2);
  }
  if (context.dayModifier === 'manager-on-edge' && next.raiseProgress > 0) {
    next.raiseProgress = Math.max(-15, next.raiseProgress - 1);
  }
  if (context.dayModifier === 'budget-cut' && next.raiseProgress > 0) {
    next.raiseProgress = Math.max(-15, next.raiseProgress - 2);
  }
  if (context.dayModifier === 'budget-boost' && next.raiseProgress > 0) {
    next.raiseProgress = Math.min(15, next.raiseProgress + 1);
  }
  if (context.dayModifier === 'ai-replacement-chatter') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'layoff-rumors') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'quarter-end-crunch') {
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'exec-walkthrough' && next.performance > 0) {
    next.performance = Math.min(30, next.performance + 2);
  }
  if (context.dayModifier === 'printer-meltdown') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'perf-review-season' && next.raiseProgress > 0) {
    next.raiseProgress = Math.max(-15, next.raiseProgress - 1);
  }
  if (context.dayModifier === 'new-ceo-energy' && next.performance > 0) {
    next.performance = Math.min(30, next.performance + 2);
  }
  if (context.dayModifier === 'all-hands-overload') {
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'under-the-weather') {
    next.energy = Math.max(-30, next.energy - 4);
    next.sanity = Math.max(-30, next.sanity - 3);
  }
  if (context.dayModifier === 'unexplained-absence' && next.sanity < 0) {
    next.sanity = Math.min(30, next.sanity + 3);
  }
  if (context.dayModifier === 'storm-outage') {
    next.energy = Math.max(-30, next.energy - 3);
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'office-cold') {
    next.energy = Math.max(-30, next.energy - 2);
    next.sanity = Math.max(-30, next.sanity - 3);
  }
  if (context.dayModifier === 'quiet-week-lie') {
    next.energy = Math.max(-30, next.energy - 3);
  }
  if (context.dayModifier === 'post-outage') {
    next.sanity = Math.max(-30, next.sanity - 3);
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'catered-lunch-trap') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'freezing-office' || context.dayModifier === 'sweltering-office') {
    next.energy = Math.max(-30, next.energy - 3);
    next.sanity = Math.max(-30, next.sanity - 2);
  }
  if (context.dayModifier === 'mystery-smell') {
    next.sanity = Math.max(-30, next.sanity - 3);
  }
  if (context.dayModifier === 'vpn-expired') {
    next.energy = Math.max(-30, next.energy - 4);
    next.performance = Math.max(-30, next.performance - 2);
  }
  if (context.dayModifier === 'interview-loop') {
    next.energy = Math.max(-30, next.energy - 3);
  }
  if (context.dayModifier === 'hot-desk-roulette') {
    next.energy = Math.max(-30, next.energy - 2);
  }
  if (context.dayModifier === 'leadership-offsite') {
    next.sanity = Math.max(-30, next.sanity - 2);
  }

  return next;
}

function carryoverNote(scenarioId: string, choice: 'yes' | 'no', context: ScenarioContext): string | null {
  const { flags, priorChoices } = context;

  if (flags.includes('derek-grudge') && ['demo-day', 'pto-guilt'].includes(scenarioId)) {
    return 'Derek still remembers when you left on time. He is not over it.';
  }
  if (flags.includes('deep-work-reputation') && choice === 'no' && scenarioId === 'meeting-marathon') {
    return 'Your "deep work" reputation precedes you. People hesitate before adding another meeting.';
  }
  if (flags.includes('jessica-ally') && scenarioId === 'reorg-rumor') {
    return 'Jessica from accounting texts you a warning before you reach the coffee machine.';
  }
  if (flags.includes('low-visibility') && scenarioId === 'all-hands-question') {
    return 'You have been quiet lately. The room seems extra curious about what you will say.';
  }
  if (priorChoices.some((p) => p.scenarioId === 'meeting-marathon' && p.choice === 'no') && scenarioId === 'all-hands-question') {
    return 'Skipping yesterday\'s sync means fewer people in the room know your name.';
  }
  if (priorChoices.some((p) => p.scenarioId === 'slack-fire' && p.choice === 'yes') && scenarioId === 'demo-day' && choice === 'yes') {
    return 'Your group-chat fame follows you into the demo room. No pressure.';
  }
  if (flags.includes('peer-tension') && scenarioId === 'hourly-checkins') {
    return 'After the Blake thread, Victoria is watching your responsiveness extra closely.';
  }
  if (flags.includes('victoria-escalated') && scenarioId === 'peer-callout') {
    return 'Victoria already told your manager you are "hard to reach." Blake\'s email lands at a bad time.';
  }
  if (priorChoices.some((p) => p.scenarioId === 'peer-callout' && p.choice === 'yes') && scenarioId === 'demo-day') {
    return 'Your public thread with Blake made visibility high. Leadership expects polish today.';
  }
  if (scenarioId === 'performance-review') {
    const notes: string[] = [];
    if (context.flags.includes('victoria-escalated') || context.priorChoices.some((p) => p.scenarioId === 'hourly-checkins' && p.choice === 'no')) {
      notes.push('Someone who needed hourly updates from you somehow made you look hard to reach upstairs.');
    }
    if (context.flags.includes('derek-pleased') || context.priorChoices.some((p) => p.scenarioId === 'late-night-task' && p.choice === 'yes')) {
      notes.push('The person who talks well in meetings is loud in calibration. Your late nights are not.');
    }
    if (context.priorChoices.some((p) => p.scenarioId === 'peer-callout')) {
      notes.push('The people upstairs remember the public thread. They do not remember who fixed the work.');
    }
    if (context.flags.includes('visibility-harvested')) {
      notes.push('Helen already presented your wins upstairs. Calibration heard her version first.');
    }
    if (context.flags.includes('process-pushed-back')) {
      notes.push('Helen logged you as resistant to best practice. That note travels farther than your incident log.');
    }
    if (notes.length > 0) return notes.join(' ');
  }
  if (flags.includes('credit-invisible') && scenarioId === 'pto-guilt') {
    return 'After that review, asking for PTO feels like confirming their narrative.';
  }
  if (flags.includes('exec-snubbed') && scenarioId === 'performance-review') {
    return 'Leadership already met your junior without you. The draft reads like that meeting was the truth.';
  }
  if (flags.includes('vision-lost') && scenarioId === 'team-shoutout') {
    return 'The borrowed vision story is spreading faster than your correction did.';
  }
  if (flags.includes('shoutout-silent') && scenarioId === 'performance-review') {
    return 'You stayed classy in the shoutout thread. Calibration will not reward classy.';
  }
  if (priorChoices.some((p) => p.scenarioId === 'exec-roundtable' && p.choice === 'no') && scenarioId === 'team-shoutout') {
    return 'You already watched him shine upstairs once this week.';
  }
  if (flags.includes('deadline-absorbed') && scenarioId === 'late-night-task') {
    return 'You already swallowed Susan\'s deadline. Of course there is a "small task" tonight.';
  }
  if (flags.includes('deadline-pushed-back') && scenarioId === 'demo-day') {
    return 'Susan is still smarting from the date moving. Now leadership wants a demo.';
  }
  if (flags.includes('ghost-escalated') && scenarioId === 'performance-review') {
    return 'Donald\'s "harassment" story reached calibration before your unblock did.';
  }
  if (flags.includes('ghost-bypassed') && scenarioId === 'peer-callout') {
    return 'Donald is offline again. Blake just CC\'d your boss about the workaround you shipped.';
  }
  if (flags.includes('ghost-bypassed') && scenarioId === 'precommitted-deadline') {
    return 'Susan\'s deck assumes Donald is available. You already know that is fiction.';
  }
  if (flags.includes('deadline-absorbed') && scenarioId === 'missing-blocker') {
    return 'You already swallowed Susan\'s deadline. Donald being offline hurts twice as much.';
  }
  if (
    flags.includes('deadline-chain-active') &&
    flags.includes('ghost-bypassed') &&
    scenarioId === 'visibility-pack'
  ) {
    return 'Susan\'s deadline, Donald\'s workaround, and now Helen wants a pretty pack. The suffering trilogy.';
  }
  if (
    flags.includes('deadline-chain-active') &&
    flags.includes('ghost-escalated') &&
    scenarioId === 'visibility-pack'
  ) {
    return 'Susan set the date, Donald called it harassment, and Helen still wants color-coded tabs.';
  }
  if (flags.includes('peer-tension') && flags.includes('victoria-escalated') && scenarioId === 'performance-review') {
    return 'Blake made you visible for the wrong reasons. Victoria made you look unreachable. Calibration wrote both down.';
  }
  if (flags.includes('visibility-harvested') && scenarioId === 'team-shoutout') {
    return 'Helen already told leadership about your wins. This shoutout will credit someone else anyway.';
  }
  if (flags.includes('visibility-harvested') && scenarioId === 'all-hands-question') {
    return 'Helen presented your numbers last week. The room thinks she runs the work.';
  }
  if (flags.includes('process-pushed-back') && scenarioId === 'hourly-checkins') {
    return 'Helen and Victoria are aligned on your "visibility problem." Victoria wants hourly proof now.';
  }
  if (flags.includes('process-pushed-back') && scenarioId === 'borrowed-vision') {
    return 'You pushed back on Helen\'s framework. Derek\'s borrowed vision suddenly sounds more "structured" upstairs.';
  }

  return null;
}

export function buildResolvedOutcome(
  scenarioId: string,
  choice: 'yes' | 'no',
  rawOutcome: Outcome,
  outcomeIndex: number,
  role: CharacterRole,
  context: ScenarioContext,
): Outcome {
  let outcome = resolveOutcome(scenarioId, choice, rawOutcome, outcomeIndex, role);
  outcome = applyStatTweaks(outcome, context);

  const notes: string[] = [];
  const carryover = carryoverNote(scenarioId, choice, context);
  if (carryover) notes.push(carryover);
  const moodNote = getMoodOutcomeNote(context.dayModifier, scenarioId);
  if (moodNote) notes.push(moodNote);

  if (notes.length > 0) {
    outcome = {
      ...outcome,
      contextNote: notes.join(' '),
    };
  }

  return outcome;
}
