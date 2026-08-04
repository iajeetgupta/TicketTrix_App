import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { HotelCard } from '@/components/hotel-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { Spacing } from '@/constants/theme';
import { searchHotels } from '@/data/mock';

export default function HotelResultsScreen() {
  const { city = '' } = useLocalSearchParams<{ city?: string }>();
  const results = useMemo(() => searchHotels(city), [city]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={city || 'All hotels'} subtitle={`${results.length} properties`} />
      <ScreenScroll withTopInset={false}>
        <View style={styles.list}>
          {results.map((h) => (
            <HotelCard key={h.id} hotel={h} onPress={() => router.push({ pathname: '/hotels/[id]', params: { id: h.id } })} />
          ))}
        </View>
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.three,
  },
});
