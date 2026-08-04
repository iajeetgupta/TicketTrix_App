import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Divider, IconBadge } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { formatINR } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

const TRANSACTIONS = [
  { id: 'tx-1', label: 'Commission · New Delhi → Goa flight', date: '2026-08-01', amount: 370, type: 'credit' as const },
  { id: 'tx-2', label: 'Commission · Worli Sky Towers stay', date: '2026-07-28', amount: 2220, type: 'credit' as const },
  { id: 'tx-3', label: 'Withdrawn to bank account', date: '2026-07-20', amount: 5000, type: 'debit' as const },
  { id: 'tx-4', label: 'Commission · Jaipur bus booking', date: '2026-06-02', amount: 26, type: 'credit' as const },
];

export default function WalletScreen() {
  const theme = useTheme();

  return (
    <ScreenScroll>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Wallet
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Commission is credited automatically within 48 hours
        </ThemedText>
      </View>

      <Card style={[styles.balanceCard, { backgroundColor: theme.primary }]}>
        <View>
          <ThemedText type="small" style={{ color: theme.onPrimary, opacity: 0.85 }}>
            Available balance
          </ThemedText>
          <ThemedText type="title" style={[styles.balanceAmount, { color: theme.onPrimary }]}>
            ₹0
          </ThemedText>
        </View>
        <IconBadge icon={{ ios: 'wallet.pass.fill', android: 'account_balance_wallet', web: 'account_balance_wallet' }} tone="accent" size={48} />
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <ThemedText type="small" themeColor="textSecondary">
            Earned this month
          </ThemedText>
          <ThemedText type="smallBold" style={{ color: theme.success, fontSize: 18 }}>
            {formatINR(2616)}
          </ThemedText>
        </Card>
        <Card style={styles.statCard}>
          <ThemedText type="small" themeColor="textSecondary">
            Commission rate
          </ThemedText>
          <ThemedText type="smallBold" style={{ fontSize: 18 }}>
            2-8%
          </ThemedText>
        </Card>
      </View>

      <Card style={styles.card}>
        <ThemedText type="smallBold">Recent activity</ThemedText>
        {TRANSACTIONS.map((tx, i) => (
          <View key={tx.id}>
            <View style={styles.txRow}>
              <View
                style={[
                  styles.txIcon,
                  { backgroundColor: tx.type === 'credit' ? theme.successMuted : theme.backgroundElement },
                ]}>
                <SymbolView
                  name={
                    tx.type === 'credit'
                      ? { ios: 'arrow.down.left', android: 'call_received', web: 'call_received' }
                      : { ios: 'arrow.up.right', android: 'call_made', web: 'call_made' }
                  }
                  size={14}
                  tintColor={tx.type === 'credit' ? theme.success : theme.textSecondary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText type="small" numberOfLines={1}>
                  {tx.label}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {tx.date}
                </ThemedText>
              </View>
              <ThemedText type="smallBold" style={{ color: tx.type === 'credit' ? theme.success : theme.text }}>
                {tx.type === 'credit' ? '+' : '-'}
                {formatINR(tx.amount)}
              </ThemedText>
            </View>
            {i < TRANSACTIONS.length - 1 && <Divider />}
          </View>
        ))}
      </Card>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.four,
    borderWidth: 0,
  },
  balanceAmount: {
    fontSize: 28,
    lineHeight: 34,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    padding: Spacing.three,
    gap: 4,
  },
  card: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  txIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
