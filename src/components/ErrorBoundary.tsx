import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (__DEV__) {
      console.error('App crash:', error, info.componentStack);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>Something went sideways</Text>
        <Text style={styles.body}>
          The office app hit an unexpected error. Your local progress is still on this device. Try
          again.
        </Text>
        <Pressable onPress={this.handleReset} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}>
          <Text style={styles.btnText}>Back to the lobby</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  emoji: { fontSize: 48, marginBottom: SPACING.md },
  title: { ...FONTS.heading, color: COLORS.text, textAlign: 'center', marginBottom: SPACING.sm },
  body: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  btn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  btnText: { ...FONTS.bodyBold, color: COLORS.white },
});
