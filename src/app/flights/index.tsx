import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlightCard } from '@/components/flight-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { CityInputRow, DateChips, Stepper } from '@/components/search-form';
import { Card, PrimaryButton, SectionHeader } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { flightDeals } from '@/data/mock';

export default function FlightsSearchScreen() {
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Goa');
  const [date, setDate] = useState('Today');
  const [passengers, setPassengers] = useState(1);

  function handleSearch() {
    router.push({ pathname: '/flights/results', params: { from, to, date, passengers: String(passengers) } });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Flights" subtitle="Book domestic flights at exclusive agent rates" />
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
        <Stepper label="Passengers" value={passengers} onChange={setPassengers} />
        <PrimaryButton label="Search Flights" onPress={handleSearch} />
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Popular routes from New Delhi" />
        <View style={styles.list}>
          {flightDeals.map((f) => (
            <FlightCard
              key={f.id}
              flight={f}
              onPress={() => router.push({ pathname: '/flights/review', params: { flightId: f.id } })}
            />
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
