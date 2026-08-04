import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Category } from '@/data/types';

export function CategoryCard({ category, width = 96 }: { category: Category; width?: number }) {
  return (
    <Pressable style={[styles.wrap, { width }]}>
      <Image source={{ uri: category.image }} style={[styles.image, { width, height: width }]} contentFit="cover" />
      <View style={styles.labelWrap}>
        <ThemedText type="small" style={styles.label} numberOfLines={1}>
          {category.label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  image: {
    borderRadius: 999,
  },
  labelWrap: {
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
