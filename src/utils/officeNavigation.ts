import { OFFICE_MAP, MAP_COLS, MAP_ROWS } from '../data/officeMap';
import { ScenarioLocation } from '../data/scenarios';

export function findLocationTile(location: ScenarioLocation): { x: number; y: number } | null {
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      if (OFFICE_MAP[y][x].interactableLocation === location) {
        return { x, y };
      }
    }
  }
  return null;
}

/** Stand on the floor tile closest to the scenario location (for skip-walk). */
export function getStandTileForLocation(location: ScenarioLocation): { x: number; y: number } | null {
  const target = findLocationTile(location);
  if (!target) return null;

  const candidates = [
    { x: target.x, y: target.y + 1 },
    { x: target.x, y: target.y - 1 },
    { x: target.x - 1, y: target.y },
    { x: target.x + 1, y: target.y },
    { x: target.x, y: target.y },
  ];

  for (const pos of candidates) {
    const tile = OFFICE_MAP[pos.y]?.[pos.x];
    if (tile && !tile.solid) return pos;
  }
  return null;
}

export function getPathHint(
  from: { x: number; y: number },
  location: ScenarioLocation | null,
): string | null {
  if (!location) return null;
  const target = findLocationTile(location);
  if (!target) return null;

  const dx = target.x - from.x;
  const dy = target.y - from.y;
  if (dx === 0 && dy === 0) return 'You are at the spot. Interact when ready.';

  const parts: string[] = [];
  if (dy < 0) parts.push(`${Math.abs(dy)} step${Math.abs(dy) === 1 ? '' : 's'} north`);
  if (dy > 0) parts.push(`${dy} step${dy === 1 ? '' : 's'} south`);
  if (dx < 0) parts.push(`${Math.abs(dx)} step${Math.abs(dx) === 1 ? '' : 's'} west`);
  if (dx > 0) parts.push(`${dx} step${dx === 1 ? '' : 's'} east`);

  return `Head ${parts.join(', then ')}.`;
}
