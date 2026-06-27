/**
 * Dumps every scenario as each role sees it (description, choices, outcomes)
 * for content auditing. Usage: npx tsx scripts/dumpContent.ts > /tmp/content-dump.txt
 */
import { SCENARIOS } from '../src/data/scenarios';
import { CHARACTERS } from '../src/data/characters';
import {
  getScenarioDescription,
  getScenarioChoiceLabels,
  resolveOutcomeNarrative,
} from '../src/data/scenarioText';
import { getNPC } from '../src/data/officeNPCs';

for (const scenario of SCENARIOS) {
  const npc = scenario.npcId ? getNPC(scenario.npcId) : null;
  console.log('='.repeat(80));
  console.log(`SCENARIO ${scenario.id}: "${scenario.title}"`);
  if (npc) console.log(`NPC: ${npc.name} (${npc.title}): ${npc.bio}`);
  for (const char of CHARACTERS) {
    const role = char.role;
    console.log(`\n  ROLE ${role} (${char.name}, ${char.title}): ${char.bio}`);
    console.log(`    SETUP: ${getScenarioDescription(scenario, role)}`);
    const labels = getScenarioChoiceLabels(scenario, role);
    console.log(`    CHOICE YES: ${labels.yes}`);
    console.log(`    CHOICE NO:  ${labels.no}`);
    scenario.yesOutcomes.forEach((o, i) => {
      console.log(
        `    OUTCOME yes:${i}: ${resolveOutcomeNarrative(scenario.id, 'yes', i, role, o.narrative)}`,
      );
    });
    scenario.noOutcomes.forEach((o, i) => {
      console.log(
        `    OUTCOME no:${i}: ${resolveOutcomeNarrative(scenario.id, 'no', i, role, o.narrative)}`,
      );
    });
  }
  console.log();
}
