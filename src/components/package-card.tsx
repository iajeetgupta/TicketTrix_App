import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card, RatingBadge } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR } from '@/data/mock';
import type { Package } from '@/data/types';

export function PackageCard({ pkg, width, onPress }: { pkg: Package; width?: number; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={width ? { width } : undefined}>
      <Card>
        <Image source={{ uri: pkg.image }} style={styles.image} contentFit="cover" />
        <View style={styles.body}>
          <ThemedText type="smallBold" numberOfLines={1}>
            {pkg.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {pkg.nights} Nights · {pkg.destination}
          </ThemedText>
          <View style={styles.footerRow}>
            <ThemedText type="smallBold" style={{ fontSize: 16 }}>
              {formatINR(pkg.price)}
            </ThemedText>
            <RatingBadge rating={pkg.rating} reviews={pkg.reviews} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
});
