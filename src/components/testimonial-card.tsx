import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import type { Testimonial } from '@/data/types';
import { useTheme } from '@/hooks/use-theme';

export function TestimonialCard({ testimonial, width }: { testimonial: Testimonial; width?: number }) {
  const theme = useTheme();
  return (
    <Card style={[styles.card, width ? { width } : undefined]}>
      <View style={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SymbolView
            key={i}
            name={{ ios: 'star.fill', android: 'star', web: 'star' }}
            size={13}
            tintColor={i < testimonial.rating ? theme.accent : theme.border}
          />
        ))}
      </View>
      <ThemedText type="small" numberOfLines={4} style={styles.quote}>
        “{testimonial.quote}”
      </ThemedText>
      <View style={styles.footer}>
        <ThemedText type="smallBold">{testimonial.name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {testimonial.agency}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
  },
  quote: {
    lineHeight: 20,
  },
  footer: {
    marginTop: Spacing.one,
  },
});
