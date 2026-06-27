import { CharacterRole } from './characters';
import { OUTCOME_SCENARIO_FLAVOR } from './outcomeScenarioFlavor';

export function applyOutcomeScenarioFlavor(
  scenarioId: string,
  role: CharacterRole,
  text: string,
): string {
  const flavors = OUTCOME_SCENARIO_FLAVOR[scenarioId]?.[role];
  if (!flavors?.length) return text;

  let result = text;
  const sorted = [...flavors].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    if (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }
  return result;
}
