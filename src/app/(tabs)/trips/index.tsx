import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Pill } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR, mockBookings } from '@/data/mock';
import type { Booking } from '@/data/types';
import { useTheme } from '@/hooks/use-theme';

const FILTERS: Booking['status'][] = ['Upcoming', 'Completed', 'Cancelled'];

const TYPE_ICON: Record<Booking['type'], SymbolViewProps['name']> = {
  Flight: { ios: 'airplane', android: 'flight', web: 'flight' },
  Hotel: { ios: 'bed.double', android: 'hotel', web: 'hotel' },
  Bus: { ios: 'bus', android: 'directions_bus', web: 'directions_bus' },
};

const STATUS_TONE: Record<Booking['status'], 'primary' | 'success' | 'neutral'> = {
  Upcoming: 'primary',
  Completed: 'success',
  Cancelled: 'neutral',
};

export default function TripsScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState<Booking['status']>('Upcoming');
  const bookings = useMemo(() => mockBookings.filter((b) => b.status === filter), [filter]);

  return (
    <ScreenScroll>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Bookings
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Track and manage all your client bookings
        </ThemedText>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterChip,
                { backgroundColor: active ? theme.primary : theme.backgroundElement },
              ]}>
              <ThemedText type="small" style={{ color: active ? theme.onPrimary : theme.text, fontWeight: '700' }}>
                {f}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {bookings.map((b) => (
          <Card key={b.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View style={[styles.typeIcon, { backgroundColor: theme.primaryMuted }]}>
                <SymbolView name={TYPE_ICON[b.type]} size={16} tintColor={theme.primary} />
              </View>
              <View style={styles.bookingInfo}>
                <ThemedText type="smallBold" numberOfLines={1}>
                  {b.title}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                  {b.subtitle}
                </ThemedText>
              </View>
              <Pill label={b.status} tone={STATUS_TONE[b.status]} />
            </View>
            <View style={styles.bookingFooter}>
              <ThemedText type="small" themeColor="textSecondary">
                {b.date} · {b.reference}
              </ThemedText>
              <ThemedText type="smallBold">{formatINR(b.price)}</ThemedText>
            </View>
          </Card>
        ))}

        {bookings.length === 0 && (
          <Card style={styles.emptyCard}>
            <SymbolView
              name={{ ios: 'tray', android: 'inbox', web: 'inbox' }}
              size={28}
              tintColor={theme.textSecondary}
            />
            <ThemedText type="small" themeColor="textSecondary">
              No {filter.toLowerCase()} bookings yet.
            </ThemedText>
          </Card>
        )}
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  filterChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
  },
  list: {
    gap: Spacing.three,
  },
  bookingCard: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyCard: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.six,
  },
});
