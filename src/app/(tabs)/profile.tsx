import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ScreenScroll } from '@/components/screen-scroll';
import { ThemedText } from '@/components/themed-text';
import { Card, Divider, SecondaryButton } from '@/components/ui-kit';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MENU_ITEMS = [
  { label: 'Saved Travellers', icon: { ios: 'person.2', android: 'group', web: 'group' } },
  { label: 'Notifications', icon: { ios: 'bell', android: 'notifications', web: 'notifications' } },
  { label: 'Help & Support', icon: { ios: 'questionmark.circle', android: 'help', web: 'help' } },
  { label: 'Terms & Privacy', icon: { ios: 'doc.text', android: 'description', web: 'description' } },
] as const;

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScreenScroll>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>
      </View>

      <Card style={styles.profileCard}>
        <View style={[styles.avatar, { backgroundColor: theme.primaryMuted }]}>
          <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={28} tintColor={theme.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText type="smallBold">Travel Agent</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ISO Certified Partner · Agent ID TTX-10492
          </ThemedText>
        </View>
      </Card>

      <Card style={styles.menuCard}>
        {MENU_ITEMS.map((item, i) => (
          <View key={item.label}>
            <View style={styles.menuRow}>
              <SymbolView name={item.icon} size={16} tintColor={theme.textSecondary} />
              <ThemedText type="default" style={styles.menuLabel}>
                {item.label}
              </ThemedText>
              <SymbolView
                name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                size={14}
                tintColor={theme.textSecondary}
              />
            </View>
            {i < MENU_ITEMS.length - 1 && <Divider />}
          </View>
        ))}
      </Card>

      <Card style={styles.supportCard}>
        <ThemedText type="smallBold">Need help?</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          support@tickettrix.com · +91 9485859865
        </ThemedText>
      </Card>

      <SecondaryButton label="Log out" onPress={() => {}} />
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuCard: {
    paddingHorizontal: Spacing.three,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  menuLabel: {
    flex: 1,
  },
  supportCard: {
    padding: Spacing.four,
    gap: 4,
    alignItems: 'center',
  },
});
