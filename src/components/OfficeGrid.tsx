import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { OFFICE_MAP, MAP_ROWS, MAP_COLS, TileType } from '../data/officeMap';
import { ScenarioLocation } from '../data/scenarios';
import { COLORS } from '../constants/theme';

const BASE_TILE_SIZE = 42;

interface OfficeGridProps {
  playerPos: { x: number; y: number };
  playerEmoji: string;
  activeLocation: ScenarioLocation | null;
  npcMarker?: string | null;
}

const TILE_COLORS: Record<TileType, string> = {
  [TileType.FLOOR]: '#ECEEE8',
  [TileType.WALL]: '#B0B3AA',
  [TileType.DESK]: '#D4C9A8',
  [TileType.CHAIR]: '#C8D0D8',
  [TileType.PLANT]: '#ECEEE8',
  [TileType.COFFEE]: '#D4C9A8',
  [TileType.FRIDGE]: '#D4C9A8',
  [TileType.CALENDAR]: '#C8D8E0',
  [TileType.MIC]: '#D8D0C8',
  [TileType.WINDOW]: '#A8C8D8',
};

function ActiveTileGlow() {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.9, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[styles.activeGlow, { opacity }]} pointerEvents="none" />;
}

function TileEmojiContent({
  isActive,
  locationEmoji,
  npcEmoji,
  tileSize,
}: {
  isActive: boolean;
  locationEmoji: string | null;
  npcEmoji: string | null;
  tileSize: number;
}) {
  // One icon per tile: the NPC takes over the active tile, otherwise show the
  // tile's own icon. The glow plus the header badge already identify the spot.
  const emoji = isActive && npcEmoji ? npcEmoji : locationEmoji;
  if (!emoji) return null;

  return <Text style={[styles.emoji, { fontSize: tileSize * 0.52 }]}>{emoji}</Text>;
}

export function OfficeGrid({ playerPos, playerEmoji, activeLocation, npcMarker }: OfficeGridProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const tileSize = useMemo(() => {
    const maxWidth = Math.max(280, windowWidth - 24);
    const maxHeight = Math.max(220, windowHeight * 0.34);
    const scale = Math.min(1, maxWidth / (MAP_COLS * BASE_TILE_SIZE), maxHeight / (MAP_ROWS * BASE_TILE_SIZE));
    return BASE_TILE_SIZE * scale;
  }, [windowWidth, windowHeight]);

  const playerAnim = useRef({
    x: new Animated.Value(playerPos.x * tileSize),
    y: new Animated.Value(playerPos.y * tileSize),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(playerAnim.x, {
        toValue: playerPos.x * tileSize,
        friction: 10,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.spring(playerAnim.y, {
        toValue: playerPos.y * tileSize,
        friction: 10,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [playerPos.x, playerPos.y, playerAnim.x, playerAnim.y, tileSize]);

  return (
    <View style={styles.gridWrap}>
      <View style={[styles.grid, { width: MAP_COLS * tileSize, height: MAP_ROWS * tileSize }]}>
        {OFFICE_MAP.map((row, y) =>
          row.map((tile, x) => {
            const isActive = tile.interactableLocation === activeLocation && activeLocation !== null;
            return (
              <View
                key={`${x}-${y}`}
                style={[
                  styles.tile,
                  {
                    left: x * tileSize,
                    top: y * tileSize,
                    width: tileSize,
                    height: tileSize,
                    backgroundColor: TILE_COLORS[tile.type],
                  },
                  isActive && styles.activeTile,
                ]}
              >
                {isActive && <ActiveTileGlow />}
                <TileEmojiContent
                  isActive={isActive}
                  locationEmoji={tile.emoji}
                  npcEmoji={isActive ? (npcMarker ?? null) : null}
                  tileSize={tileSize}
                />
              </View>
            );
          }),
        )}

        <Animated.View
          style={[
            styles.player,
            {
              width: tileSize,
              height: tileSize,
              transform: [{ translateX: playerAnim.x }, { translateY: playerAnim.y }],
            },
          ]}
        >
          <Text style={[styles.playerEmoji, { fontSize: tileSize * 0.6 }]}>{playerEmoji}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

export { BASE_TILE_SIZE as TILE_SIZE };

const styles = StyleSheet.create({
  gridWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  grid: {
    position: 'relative',
  },
  tile: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
    overflow: 'visible',
  },
  emoji: {},
  activeTile: {
    backgroundColor: '#FFF9E6',
    borderColor: COLORS.accent,
    borderWidth: 2,
    zIndex: 1,
  },
  activeGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFD700',
    margin: -3,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  playerEmoji: {},
});
