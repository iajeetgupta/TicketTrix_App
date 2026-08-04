import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconName = SymbolViewProps['name'];

export function PrimaryButton({
  label,
  onPress,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.primary, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}>
      <ThemedText style={{ color: theme.onPrimary }} type="smallBold">
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles.buttonOutline,
        { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
        style,
      ]}>
      <ThemedText themeColor="text" type="smallBold">
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function Pill({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'primary' | 'success' | 'accent' }) {
  const theme = useTheme();
  const toneMap = {
    neutral: { bg: theme.backgroundElement, fg: theme.textSecondary },
    primary: { bg: theme.primaryMuted, fg: theme.primary },
    success: { bg: theme.successMuted, fg: theme.success },
    accent: { bg: theme.accentMuted, fg: theme.accent },
  } as const;
  const c = toneMap[tone];
  return (
    <View style={[styles.pill, { backgroundColor: c.bg }]}>
      <ThemedText type="small" style={[styles.pillText, { color: c.fg }]}>
        {label}
      </ThemedText>
    </View>
  );
}

export function PriceTag({ amount, suffix = '/ onwards' }: { amount: string; suffix?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.priceRow}>
      <ThemedText type="smallBold" style={{ color: theme.text, fontSize: 18 }}>
        {amount}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {suffix}
      </ThemedText>
    </View>
  );
}

export function RatingBadge({ rating, reviews }: { rating: number; reviews?: number }) {
  const theme = useTheme();
  return (
    <View style={[styles.ratingBadge, { backgroundColor: theme.successMuted }]}>
      <SymbolView
        name={{ ios: 'star.fill', android: 'star', web: 'star' }}
        size={11}
        tintColor={theme.success}
      />
      <ThemedText type="small" style={{ color: theme.success, fontWeight: '700' }}>
        {rating.toFixed(1)}
      </ThemedText>
      {reviews !== undefined && (
        <ThemedText type="small" themeColor="textSecondary">
          ({reviews})
        </ThemedText>
      )}
    </View>
  );
}

export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} hitSlop={8}>
          <ThemedText type="linkPrimary">{actionLabel}</ThemedText>
        </Pressable>
      )}
    </View>
  );
}

export function IconBadge({
  icon,
  tone = 'primary',
  size = 40,
}: {
  icon: IconName;
  tone?: 'primary' | 'accent';
  size?: number;
}) {
  const theme = useTheme();
  const bg = tone === 'primary' ? theme.primaryMuted : theme.accentMuted;
  const fg = tone === 'primary' ? theme.primary : theme.accent;
  return (
    <View style={[styles.iconBadge, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <SymbolView name={icon} size={size * 0.5} tintColor={fg} />
    </View>
  );
}

export function Divider() {
  const theme = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
  },
  pill: {
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.half + 2,
    borderRadius: Spacing.five,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Spacing.five,
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  iconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
