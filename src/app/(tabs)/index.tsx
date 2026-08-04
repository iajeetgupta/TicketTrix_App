import { router, type Href } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BusCard } from '@/components/bus-card';
import { CategoryCard } from '@/components/category-card';
import { FlightCard } from '@/components/flight-card';
import { HotelCard } from '@/components/hotel-card';
import { PackageCard } from '@/components/package-card';
import { CityInputRow, DateChips, SingleCityInput } from '@/components/search-form';
import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { TestimonialCard } from '@/components/testimonial-card';
import { Card, IconBadge, PrimaryButton, SectionHeader } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { busRoutes, categories, flightDeals, hotels, packages, testimonials } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

type Category = 'flights' | 'hotels' | 'bus';

export default function HomeScreen() {
  const theme = useTheme();
  const [category, setCategory] = useState<Category>('flights');
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Goa');
  const [city, setCity] = useState('Mumbai');
  const [date, setDate] = useState('Today');

  function handleSearch() {
    if (category === 'flights') {
      router.push({ pathname: '/flights/results', params: { from, to, date } });
    } else if (category === 'hotels') {
      router.push({ pathname: '/hotels/results', params: { city } });
    } else {
      router.push({ pathname: '/bus/results', params: { from, to, date } });
    }
  }

  return (
    <ScreenScroll>
      <Card style={[styles.heroCard, { backgroundColor: theme.primary }]}>
          <ThemedText type="small" style={{ color: theme.onPrimary, opacity: 0.85, fontWeight: '700' }}>
            Tickettrix
          </ThemedText>
          <ThemedText type="subtitle" style={[styles.heroTitle, { color: theme.onPrimary }]}>
            Stop Dreaming,{'\n'}Start Travelling
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.onPrimary, opacity: 0.85 }}>
            Exclusive agent rates on flights, hotels & buses
          </ThemedText>
        </Card>

        <Card style={styles.searchCard}>
          <View style={styles.categorySwitcher}>
            {(
              [
                { id: 'flights', label: 'Flights', icon: { ios: 'airplane', android: 'flight', web: 'flight' } },
                { id: 'hotels', label: 'Hotels', icon: { ios: 'bed.double', android: 'hotel', web: 'hotel' } },
                { id: 'bus', label: 'Bus', icon: { ios: 'bus', android: 'directions_bus', web: 'directions_bus' } },
              ] as const
            ).map((opt) => {
              const active = opt.id === category;
              return (
                <Pressable
                  key={opt.id}
                  onPress={() => setCategory(opt.id)}
                  style={[
                    styles.categoryTab,
                    { backgroundColor: active ? theme.primary : 'transparent' },
                  ]}>
                  <SymbolView name={opt.icon} size={14} tintColor={active ? theme.onPrimary : theme.textSecondary} />
                  <ThemedText
                    type="small"
                    style={{ color: active ? theme.onPrimary : theme.textSecondary, fontWeight: '700' }}>
                    {opt.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.searchFields}>
            {category === 'hotels' ? (
              <SingleCityInput label="City" value={city} onChangeText={setCity} placeholder="Where are you going?" />
            ) : (
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
            )}
            <DateChips selected={date} onSelect={setDate} />
            <PrimaryButton
              label={category === 'flights' ? 'Search Flights' : category === 'hotels' ? 'Search Hotels' : 'Search Buses'}
              onPress={handleSearch}
            />
          </View>
        </Card>

        <View style={styles.valueProps}>
          {(
            [
              { icon: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' }, label: '1 minute\nbooking' },
              { icon: { ios: 'lock.shield.fill', android: 'lock', web: 'lock' }, label: '100% Secure\n& safe' },
              { icon: { ios: 'headphones', android: 'headset_mic', web: 'headset_mic' }, label: '24/7 Agent\nsupport' },
              { icon: { ios: 'percent', android: 'percent', web: 'percent' }, label: '2-8% per\nbooking' },
            ] as const
          ).map((v) => (
            <View key={v.label} style={styles.valueProp}>
              <IconBadge icon={v.icon} size={44} />
              <ThemedText type="small" style={styles.valuePropLabel}>
                {v.label}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Explore by category" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Top Flight Deals" actionLabel="See all" onAction={() => router.push('/flights' as Href)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {flightDeals.map((f) => (
              <FlightCard
                key={f.id}
                flight={f}
                width={260}
                onPress={() => router.push({ pathname: '/flights/review', params: { flightId: f.id } })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Featured Hotels" actionLabel="See all" onAction={() => router.push('/hotels' as Href)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {hotels.map((h) => (
              <HotelCard
                key={h.id}
                hotel={h}
                width={220}
                onPress={() => router.push({ pathname: '/hotels/[id]', params: { id: h.id } })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Popular Bus Routes" actionLabel="See all" onAction={() => router.push('/bus' as Href)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {busRoutes.map((b) => (
              <BusCard
                key={b.id}
                bus={b}
                width={260}
                onPress={() => router.push({ pathname: '/bus/review', params: { busId: b.id } })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Holiday Packages" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} width={190} />
            ))}
          </ScrollView>
        </View>

        <Card style={[styles.commissionCard, { backgroundColor: theme.accentMuted }]}>
          <IconBadge icon={{ ios: 'gift.fill', android: 'redeem', web: 'redeem' }} tone="accent" size={48} />
          <View style={styles.commissionText}>
            <ThemedText type="smallBold" style={{ color: theme.accent }}>
              Earn up to 30% OFF + 2-8% commission
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              On every flight, hotel & bus booking. Credited to your wallet within 48 hours.
            </ThemedText>
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="What agents say" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} width={280} />
            ))}
          </ScrollView>
        </View>

        <Card style={styles.supportCard}>
          <ThemedText type="smallBold">Need help?</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            support@tickettrix.com · +91 9485859865
          </ThemedText>
        </Card>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    padding: Spacing.four,
    gap: Spacing.two,
    borderWidth: 0,
  },
  heroTitle: {
    fontSize: 26,
    lineHeight: 32,
  },
  searchCard: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  categorySwitcher: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  searchFields: {
    gap: Spacing.three,
  },
  valueProps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueProp: {
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
  },
  valuePropLabel: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  section: {
    gap: Spacing.three,
  },
  hScroll: {
    gap: Spacing.three,
    paddingRight: Spacing.four,
  },
  commissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderWidth: 0,
  },
  commissionText: {
    flex: 1,
    gap: 2,
  },
  supportCard: {
    padding: Spacing.four,
    gap: 4,
    alignItems: 'center',
  },
});
