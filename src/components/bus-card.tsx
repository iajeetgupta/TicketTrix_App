import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, Divider, Pill, PriceTag, RatingBadge } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR } from '@/data/mock';
import type { BusRoute } from '@/data/types';

export function BusCard({ bus, onPress, width }: { bus: BusRoute; onPress: () => void; width?: number }) {
  return (
    <Pressable onPress={onPress} style={width ? { width } : undefined}>
      <Card style={styles.card}>
        <View style={styles.headerRow}>
          <ThemedText type="smallBold" numberOfLines={1} style={styles.operator}>
            {bus.operator}
          </ThemedText>
          <RatingBadge rating={bus.rating} />
        </View>

        <View style={styles.routeRow}>
          <View style={styles.routeEnd}>
            <ThemedText type="smallBold">{bus.departTime}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
              {bus.from}
            </ThemedText>
          </View>
          <View style={styles.routeMiddle}>
            <ThemedText type="small" themeColor="textSecondary">
              {bus.duration}
            </ThemedText>
          </View>
          <View style={styles.routeEnd}>
            <ThemedText type="smallBold">{bus.arriveTime}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
              {bus.to}
            </ThemedText>
          </View>
        </View>

        <Divider />

        <View style={styles.footerRow}>
          <Pill label={bus.busType} tone="primary" />
          <PriceTag amount={formatINR(bus.price)} suffix={`· ${bus.seatsLeft} seats left`} />
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
    gap: Spacing.two,
  },
  operator: {
    flex: 1,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  routeEnd: {
    flex: 1,
    gap: 2,
  },
  routeMiddle: {
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
