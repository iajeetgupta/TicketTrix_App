import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, Pill, PriceTag } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR } from '@/data/mock';
import type { FlightDeal } from '@/data/types';
import { useTheme } from '@/hooks/use-theme';

export function FlightCard({ flight, onPress, width }: { flight: FlightDeal; onPress: () => void; width?: number }) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={width ? { width } : undefined}>
      <Card style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.airlineRow}>
            <SymbolView
              name={{ ios: 'airplane', android: 'flight', web: 'flight' }}
              size={14}
              tintColor={theme.primary}
            />
            <ThemedText type="small" style={{ fontWeight: '700' }}>
              {flight.airline}
            </ThemedText>
          </View>
          <Pill label={flight.stops} tone="success" />
        </View>

        <View style={styles.routeRow}>
          <View style={styles.routeEnd}>
            <ThemedText type="smallBold">{flight.departTime}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {flight.fromCode}
            </ThemedText>
          </View>
          <View style={styles.routeMiddle}>
            <ThemedText type="small" themeColor="textSecondary">
              {flight.duration}
            </ThemedText>
            <View style={[styles.routeLine, { backgroundColor: theme.border }]} />
          </View>
          <View style={styles.routeEnd}>
            <ThemedText type="smallBold">{flight.arriveTime}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {flight.toCode}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="small" themeColor="textSecondary">
          {flight.from} → {flight.to}
        </ThemedText>

        <View style={styles.footerRow}>
          <PriceTag amount={formatINR(flight.price)} />
          <ThemedText type="small" themeColor="textSecondary">
            {flight.bookedLabel}
          </ThemedText>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  routeEnd: {
    gap: 2,
  },
  routeMiddle: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  routeLine: {
    height: 1,
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
});
