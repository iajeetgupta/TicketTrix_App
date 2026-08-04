import { Image } from 'expo-image';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Divider, Pill, PrimaryButton, RatingBadge } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR, getHotelById } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

export default function HotelDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const hotel = getHotelById(id);
  const [booking, setBooking] = useState(false);

  if (!hotel) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader title="Hotel not found" />
        <ScreenScroll withTopInset={false}>
          <ThemedText type="small" themeColor="textSecondary">
            This hotel is no longer available.
          </ThemedText>
        </ScreenScroll>
      </View>
    );
  }

  const nights = 2;
  const total = hotel.pricePerNight * nights;
  const commission = Math.round(total * 0.06);

  function handleConfirm() {
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      Alert.alert('Booking confirmed', `Your stay at ${hotel!.name} has been booked.`, [
        { text: 'View trips', onPress: () => router.replace('/trips' as Href) },
      ]);
    }, 700);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={hotel.name} subtitle={`${hotel.area}, ${hotel.city}`} />
      <ScreenScroll withTopInset={false}>
        <Card>
          <Image source={{ uri: hotel.image }} style={styles.image} contentFit="cover" />
        </Card>

        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <ThemedText type="subtitle" style={styles.name}>
              {hotel.name}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {hotel.area}, {hotel.city}
            </ThemedText>
          </View>
          <RatingBadge rating={hotel.rating} reviews={hotel.reviews} />
        </View>

        <View style={styles.amenityRow}>
          {hotel.amenities.map((a) => (
            <Pill key={a} label={a} tone="primary" />
          ))}
        </View>

        <Card style={styles.card}>
          <ThemedText type="smallBold">Stay summary</ThemedText>
          <View style={styles.rowBetween}>
            <ThemedText type="small" themeColor="textSecondary">
              {formatINR(hotel.pricePerNight)} x {nights} nights
            </ThemedText>
            <ThemedText type="small">{formatINR(total)}</ThemedText>
          </View>
          <Divider />
          <View style={styles.rowBetween}>
            <ThemedText type="smallBold">Total payable</ThemedText>
            <ThemedText type="smallBold">{formatINR(total)}</ThemedText>
          </View>
          <View style={[styles.commissionRow, { backgroundColor: theme.successMuted }]}>
            <ThemedText type="small" style={{ color: theme.success }}>
              You earn {formatINR(commission)} commission on this booking
            </ThemedText>
          </View>
        </Card>

        <PrimaryButton label={booking ? 'Confirming…' : `Confirm & Pay ${formatINR(total)}`} onPress={handleConfirm} disabled={booking} />
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  name: {
    fontSize: 22,
    lineHeight: 28,
  },
  amenityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commissionRow: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
    marginTop: Spacing.one,
  },
});
