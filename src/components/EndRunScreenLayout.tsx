import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { EndRunFooter } from './EndRunFooter';
import { END_RUN_FOOTER_SPACE } from '../utils/replayNavigation';

interface EndRunScreenLayoutProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  primaryTitle: string;
  primaryIcon?: string;
  onPrimary: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
  footerHidden?: boolean;
}

/** End-of-run screens: scrollable body + footer pinned with flex (taps work on web + mobile). */
export function EndRunScreenLayout({
  children,
  contentContainerStyle,
  primaryTitle,
  primaryIcon,
  onPrimary,
  onLeaderboard,
  onHome,
  footerHidden = false,
}: EndRunScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.body}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: footerHidden ? SPACING.xxl : END_RUN_FOOTER_SPACE },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>

        {!footerHidden && (
          <View style={styles.footerSlot} pointerEvents="box-none">
            <EndRunFooter
              primaryTitle={primaryTitle}
              primaryIcon={primaryIcon}
              onPrimary={onPrimary}
              onLeaderboard={onLeaderboard}
              onHome={onHome}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  footerSlot: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.cardBorder,
    backgroundColor: COLORS.bg,
    zIndex: 10,
    elevation: 12,
  },
});
