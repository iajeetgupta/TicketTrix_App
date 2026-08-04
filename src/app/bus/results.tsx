import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { BusCard } from '@/components/bus-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { Spacing } from '@/constants/theme';
import { searchBuses } from '@/data/mock';

export default function BusResultsScreen() {
  const { from = '', to = '', date = '' } = useLocalSearchParams<{ from?: string; to?: string; date?: string }>();
  const results = useMemo(() => searchBuses(from, to), [from, to]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={`${from || 'Anywhere'} → ${to || 'Anywhere'}`} subtitle={date ? `${date} · ${results.length} buses` : `${results.length} buses`} />
      <ScreenScroll withTopInset={false}>
        <View style={styles.list}>
          {results.map((b) => (
            <BusCard key={b.id} bus={b} onPress={() => router.push({ pathname: '/bus/review', params: { busId: b.id } })} />
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
