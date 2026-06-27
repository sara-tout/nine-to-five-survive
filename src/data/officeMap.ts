import { ScenarioLocation } from './scenarios';

export enum TileType {
  FLOOR = 'floor',
  WALL = 'wall',
  DESK = 'desk',
  CHAIR = 'chair',
  PLANT = 'plant',
  COFFEE = 'coffee',
  FRIDGE = 'fridge',
  CALENDAR = 'calendar',
  MIC = 'mic',
  WINDOW = 'window',
}

export interface TileDef {
  type: TileType;
  emoji: string | null;
  solid: boolean;
  interactableLocation?: ScenarioLocation;
}

const F: TileDef = { type: TileType.FLOOR, emoji: null, solid: false };
const W: TileDef = { type: TileType.WALL, emoji: null, solid: true };
const WN: TileDef = { type: TileType.WINDOW, emoji: '🪟', solid: true };
const P: TileDef = { type: TileType.PLANT, emoji: '🪴', solid: true };
const CH: TileDef = { type: TileType.CHAIR, emoji: '🪑', solid: true };

const D1: TileDef = { type: TileType.DESK, emoji: '💻', solid: true, interactableLocation: 'desk' };
const CAL: TileDef = { type: TileType.CALENDAR, emoji: '📅', solid: true, interactableLocation: 'meeting-room' };
const FR: TileDef = { type: TileType.FRIDGE, emoji: '🍱', solid: true, interactableLocation: 'kitchen' };
const D2: TileDef = { type: TileType.DESK, emoji: '💻', solid: true, interactableLocation: 'coworker-desk' };
const MIC: TileDef = { type: TileType.MIC, emoji: '🎤', solid: true, interactableLocation: 'presentation' };

const DK: TileDef = { type: TileType.DESK, emoji: '🖥️', solid: true };
const CF: TileDef = { type: TileType.COFFEE, emoji: '☕', solid: true };

// 16 columns x 12 rows
export const OFFICE_MAP: TileDef[][] = [
  //  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
  [  W,  W,  W,  WN, W,  W,  W,  W,  W,  W,  W,  WN, W,  W,  W,  W ],  // row 0
  [  W,  F,  F,  CH, D1, F,  F,  W,  F,  F,  CH, DK, F,  F,  F,  W ],  // row 1
  [  W,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  W ],  // row 2
  [  W,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  CH, CAL, W ],  // row 3
  [  W,  F,  F,  F,  P,  F,  F,  F,  F,  F,  F,  F,  F,  CH, F,  W ],  // row 4
  [  WN, F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F, WN ],  // row 5
  [  W,  F,  CH, DK, F,  F,  F,  F,  F,  F,  P,  F,  F,  F,  F,  W ],  // row 6
  [  W,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  W ],  // row 7
  [  W,  F,  F,  F,  F,  F,  CF, FR, F,  F,  F,  F,  F,  F,  F,  W ],  // row 8
  [  W,  F,  F,  CH, MIC, F,  F,  F,  F,  F,  F,  CH, D2, F,  F,  W ],  // row 9
  [  W,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  W ],  // row 10
  [  W,  W,  W,  W,  W,  WN, W,  W,  W,  W,  WN, W,  W,  W,  W,  W ],  // row 11
];

export const MAP_ROWS = OFFICE_MAP.length;
export const MAP_COLS = OFFICE_MAP[0].length;

export const PLAYER_START = { x: 7, y: 5 };

export function getTile(x: number, y: number): TileDef | null {
  if (y < 0 || y >= MAP_ROWS || x < 0 || x >= MAP_COLS) return null;
  return OFFICE_MAP[y][x];
}

export function isWalkable(x: number, y: number): boolean {
  const tile = getTile(x, y);
  return tile !== null && !tile.solid;
}

export function getAdjacentInteractable(
  px: number,
  py: number,
  activeLocation: ScenarioLocation | null,
): { x: number; y: number; tile: TileDef } | null {
  if (!activeLocation) return null;

  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];
  for (const { dx, dy } of dirs) {
    const tile = getTile(px + dx, py + dy);
    if (tile?.interactableLocation && tile.interactableLocation === activeLocation) {
      return { x: px + dx, y: py + dy, tile };
    }
  }
  return null;
}
