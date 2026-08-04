import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Divider, PrimaryButton } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR, getFlightById } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

export default function FlightReviewScreen() {
  const theme = useTheme();
  const { flightId } = useLocalSearchParams<{ flightId: string }>();
  const flight = getFlightById(flightId);
  const [booking, setBooking] = useState(false);

  if (!flight) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader title="Flight not found" />
        <ScreenScroll withTopInset={false}>
          <ThemedText type="small" themeColor="textSecondary">
            This flight is no longer available.
          </ThemedText>
        </ScreenScroll>
      </View>
    );
  }

  const commission = Math.round(flight.price * 0.05);

  function handleConfirm() {
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      Alert.alert('Booking confirmed', `Your flight to ${flight!.to} has been booked. Reference sent to your registered email.`, [
        { text: 'View trips', onPress: () => router.replace('/trips' as Href) },
      ]);
    }, 700);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Review booking" subtitle={`${flight.from} → ${flight.to}`} />
      <ScreenScroll withTopInset={false}>
        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <ThemedText type="smallBold">{flight.airline}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {flight.stops}
            </ThemedText>
          </View>
          <View style={styles.routeRow}>
            <View>
              <ThemedText type="subtitle" style={styles.time}>
                {flight.departTime}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {flight.from} ({flight.fromCode})
              </ThemedText>
            </View>
            <SymbolView
              name={{ ios: 'airplane', android: 'flight', web: 'flight' }}
              size={18}
              tintColor={theme.primary}
            />
            <View style={styles.timeEnd}>
              <ThemedText type="subtitle" style={styles.time}>
                {flight.arriveTime}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {flight.to} ({flight.toCode})
              </ThemedText>
            </View>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Duration: {flight.duration}
          </ThemedText>
        </Card>

        <Card style={styles.card}>
          <ThemedText type="smallBold">Fare summary</ThemedText>
          <View style={styles.rowBetween}>
            <ThemedText type="small" themeColor="textSecondary">
              Base fare (1 adult)
            </ThemedText>
            <ThemedText type="small">{formatINR(flight.price)}</ThemedText>
          </View>
          <Divider />
          <View style={styles.rowBetween}>
            <ThemedText type="smallBold">Total payable</ThemedText>
            <ThemedText type="smallBold">{formatINR(flight.price)}</ThemedText>
          </View>
          <View style={[styles.commissionRow, { backgroundColor: theme.successMuted }]}>
            <SymbolView
              name={{ ios: 'percent', android: 'percent', web: 'percent' }}
              size={13}
              tintColor={theme.success}
            />
            <ThemedText type="small" style={{ color: theme.success }}>
              You earn {formatINR(commission)} commission on this booking
            </ThemedText>
          </View>
        </Card>

        <PrimaryButton label={booking ? 'Confirming…' : `Confirm & Pay ${formatINR(flight.price)}`} onPress={handleConfirm} disabled={booking} />
      </ScreenScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  time: {
    fontSize: 20,
    lineHeight: 24,
  },
  timeEnd: {
    alignItems: 'flex-end',
  },
  commissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    marginTop: Spacing.one,
  },
});
