import type { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Shared scroll body for tab/stack screens: handles safe-area + tab-bar bottom
 * inset (matching the app's starter `explore.tsx` pattern) and caps/centers
 * content width on tablets/web so layouts don't just stretch phone UI wide.
 */
export function ScreenScroll({
  children,
  withTopInset = true,
  contentContainerStyle,
}: {
  children: ReactNode;
  withTopInset?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const insets = {
    ...safeAreaInsets,
    top: withTopInset ? safeAreaInsets.top : 0,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const platformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: withTopInset ? Spacing.six : Spacing.four,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={Platform.OS === 'ios' ? insets : undefined}
      contentContainerStyle={[styles.contentContainer, platformStyle]}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.inner, contentContainerStyle]}>{children}</View>
    </ScrollView>
  );
}

export function useResponsiveColumns(breakpoints: { md?: number; lg?: number } = {}) {
  const { width } = useWindowDimensions();
  if (width >= 900) return breakpoints.lg ?? 3;
  if (width >= 600) return breakpoints.md ?? 2;
  return 1;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
  },
});
