import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BusCard } from '@/components/bus-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { CityInputRow, DateChips } from '@/components/search-form';
import { Card, PrimaryButton, SectionHeader } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { busRoutes } from '@/data/mock';

export default function BusSearchScreen() {
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Manali');
  const [date, setDate] = useState('Today');

  function handleSearch() {
    router.push({ pathname: '/bus/results', params: { from, to, date } });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Bus" subtitle="AC sleeper & seater buses at agent-only fares" />
      <ScreenScroll withTopInset={false}>
        <Card style={styles.searchCard}>
          <CityInputRow
            from={from}
            to={to}
            onChangeFrom={setFrom}
            onChangeTo={setTo}
            onSwap={() => {
              setFrom(to);
              setTo(from);
            }}
          />
          <DateChips selected={date} onSelect={setDate} />
          <PrimaryButton label="Search Buses" onPress={handleSearch} />
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Popular bus routes" />
          <View style={styles.list}>
            {busRoutes.map((b) => (
              <BusCard key={b.id} bus={b} onPress={() => router.push({ pathname: '/bus/review', params: { busId: b.id } })} />
            ))}
          </View>
        </View>
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  section: {
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.three,
  },
});
