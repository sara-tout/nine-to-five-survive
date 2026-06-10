import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { OFFICE_MAP, MAP_ROWS, MAP_COLS, TileType } from '../data/officeMap';
import { COLORS } from '../constants/theme';

const TILE_SIZE = 42;

interface OfficeGridProps {
  playerPos: { x: number; y: number };
  playerEmoji: string;
  activeScenarioId: string | null;
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

function PulsingIndicator() {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View style={[styles.indicator, { opacity: anim }]}>
      <Text style={styles.indicatorText}>❗</Text>
    </Animated.View>
  );
}

export function OfficeGrid({ playerPos, playerEmoji, activeScenarioId }: OfficeGridProps) {
  const playerAnim = useRef({
    x: new Animated.Value(playerPos.x * TILE_SIZE),
    y: new Animated.Value(playerPos.y * TILE_SIZE),
  }).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(playerAnim.x, {
        toValue: playerPos.x * TILE_SIZE,
        friction: 10,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.spring(playerAnim.y, {
        toValue: playerPos.y * TILE_SIZE,
        friction: 10,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [playerPos.x, playerPos.y]);

  return (
    <View style={styles.gridWrap}>
      <View style={[styles.grid, { width: MAP_COLS * TILE_SIZE, height: MAP_ROWS * TILE_SIZE }]}>
        {OFFICE_MAP.map((row, y) =>
          row.map((tile, x) => {
            const isActive = tile.interactableScenarioId === activeScenarioId && activeScenarioId !== null;
            return (
              <View
                key={`${x}-${y}`}
                style={[
                  styles.tile,
                  {
                    left: x * TILE_SIZE,
                    top: y * TILE_SIZE,
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                    backgroundColor: TILE_COLORS[tile.type],
                  },
                  isActive && styles.activeTile,
                ]}
              >
                {tile.emoji && <Text style={styles.emoji}>{tile.emoji}</Text>}
                {isActive && <PulsingIndicator />}
              </View>
            );
          }),
        )}

        <Animated.View
          style={[
            styles.player,
            {
              width: TILE_SIZE,
              height: TILE_SIZE,
              transform: [{ translateX: playerAnim.x }, { translateY: playerAnim.y }],
            },
          ]}
        >
          <Text style={styles.playerEmoji}>{playerEmoji}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

export { TILE_SIZE };

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
  },
  emoji: {
    fontSize: TILE_SIZE * 0.55,
  },
  activeTile: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFD700',
    borderWidth: 1.5,
  },
  indicator: {
    position: 'absolute',
    top: -6,
    right: -2,
  },
  indicatorText: {
    fontSize: 14,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  playerEmoji: {
    fontSize: TILE_SIZE * 0.6,
  },
});
