import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlightCard } from '@/components/flight-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { Spacing } from '@/constants/theme';
import { searchFlights } from '@/data/mock';

export default function FlightResultsScreen() {
  const { from = '', to = '', date = '' } = useLocalSearchParams<{ from?: string; to?: string; date?: string }>();
  const results = useMemo(() => searchFlights(from, to), [from, to]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={`${from || 'Anywhere'} → ${to || 'Anywhere'}`} subtitle={date ? `${date} · ${results.length} flights` : `${results.length} flights`} />
      <ScreenScroll withTopInset={false}>
        <View style={styles.list}>
          {results.map((f) => (
            <FlightCard
              key={f.id}
              flight={f}
              onPress={() => router.push({ pathname: '/flights/review', params: { flightId: f.id } })}
            />
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
