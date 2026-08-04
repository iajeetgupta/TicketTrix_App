import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Divider, Pill, PrimaryButton } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR, getBusById } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

export default function BusReviewScreen() {
  const theme = useTheme();
  const { busId } = useLocalSearchParams<{ busId: string }>();
  const bus = getBusById(busId);
  const [booking, setBooking] = useState(false);

  if (!bus) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader title="Bus not found" />
        <ScreenScroll withTopInset={false}>
          <ThemedText type="small" themeColor="textSecondary">
            This route is no longer available.
          </ThemedText>
        </ScreenScroll>
      </View>
    );
  }

  const commission = Math.round(bus.price * 0.04);

  function handleConfirm() {
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      Alert.alert('Booking confirmed', `Your seat on ${bus!.operator} has been booked.`, [
        { text: 'View trips', onPress: () => router.replace('/trips' as Href) },
      ]);
    }, 700);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Review booking" subtitle={`${bus.from} → ${bus.to}`} />
      <ScreenScroll withTopInset={false}>
        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <ThemedText type="smallBold">{bus.operator}</ThemedText>
            <Pill label={bus.busType} tone="primary" />
          </View>
          <View style={styles.routeRow}>
            <View>
              <ThemedText type="subtitle" style={styles.time}>
                {bus.departTime}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {bus.from}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {bus.duration}
            </ThemedText>
            <View style={styles.timeEnd}>
              <ThemedText type="subtitle" style={styles.time}>
                {bus.arriveTime}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {bus.to}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {bus.seatsLeft} seats left
          </ThemedText>
        </Card>

        <Card style={styles.card}>
          <ThemedText type="smallBold">Fare summary</ThemedText>
          <View style={styles.rowBetween}>
            <ThemedText type="small" themeColor="textSecondary">
              Seat fare (1 seat)
            </ThemedText>
            <ThemedText type="small">{formatINR(bus.price)}</ThemedText>
          </View>
          <Divider />
          <View style={styles.rowBetween}>
            <ThemedText type="smallBold">Total payable</ThemedText>
            <ThemedText type="smallBold">{formatINR(bus.price)}</ThemedText>
          </View>
          <View style={[styles.commissionRow, { backgroundColor: theme.successMuted }]}>
            <ThemedText type="small" style={{ color: theme.success }}>
              You earn {formatINR(commission)} commission on this booking
            </ThemedText>
          </View>
        </Card>

        <PrimaryButton label={booking ? 'Confirming…' : `Confirm & Pay ${formatINR(bus.price)}`} onPress={handleConfirm} disabled={booking} />
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
    padding: Spacing.two,
    borderRadius: Spacing.two,
    marginTop: Spacing.one,
  },
});
