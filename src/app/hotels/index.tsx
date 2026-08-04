import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HotelCard } from '@/components/hotel-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { DateChips, SingleCityInput, Stepper } from '@/components/search-form';
import { Card, PrimaryButton, SectionHeader } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { hotels } from '@/data/mock';

export default function HotelsSearchScreen() {
  const [city, setCity] = useState('Mumbai');
  const [checkIn, setCheckIn] = useState('Today');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  function handleSearch() {
    router.push({ pathname: '/hotels/results', params: { city, checkIn, guests: String(guests), rooms: String(rooms) } });
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Hotels" subtitle="Handpicked stays with agent-only nightly rates" />
      <ScreenScroll withTopInset={false}>
        <Card style={styles.searchCard}>
          <SingleCityInput label="City" value={city} onChangeText={setCity} placeholder="Where are you going?" />
          <DateChips selected={checkIn} onSelect={setCheckIn} />
          <Stepper label="Guests" value={guests} onChange={setGuests} min={1} max={12} />
          <Stepper label="Rooms" value={rooms} onChange={setRooms} min={1} max={6} />
          <PrimaryButton label="Search Hotels" onPress={handleSearch} />
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Featured hotels in Mumbai" />
          <View style={styles.list}>
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} onPress={() => router.push({ pathname: '/hotels/[id]', params: { id: h.id } })} />
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
