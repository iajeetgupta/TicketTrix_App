import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, Pill, PriceTag, RatingBadge } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR } from '@/data/mock';
import type { Hotel } from '@/data/types';

export function HotelCard({ hotel, onPress, width }: { hotel: Hotel; onPress: () => void; width?: number }) {
  return (
    <Pressable onPress={onPress} style={width ? { width } : undefined}>
      <Card>
        <Image source={{ uri: hotel.image }} style={styles.image} contentFit="cover" />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <ThemedText type="smallBold" numberOfLines={1} style={styles.title}>
              {hotel.name}
            </ThemedText>
            <RatingBadge rating={hotel.rating} />
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {hotel.area}, {hotel.city}
          </ThemedText>
          <View style={styles.amenityRow}>
            {hotel.amenities.slice(0, 2).map((a) => (
              <Pill key={a} label={a} />
            ))}
          </View>
          <PriceTag amount={formatINR(hotel.pricePerNight)} suffix="/ night" />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
  amenityRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
