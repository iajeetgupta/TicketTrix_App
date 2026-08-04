import { type Href } from 'expo-router';
import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerSlotProps, TabListProps } from 'expo-router/ui';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

const TABS = [
  { name: 'index', href: '/', label: 'Home', icon: { ios: 'house.fill', web: 'home' } },
  { name: 'trips', href: '/trips', label: 'My Trips', icon: { ios: 'bag.fill', web: 'confirmation_number' } },
  { name: 'wallet', href: '/wallet', label: 'Wallet', icon: { ios: 'wallet.pass.fill', web: 'account_balance_wallet' } },
  { name: 'chat', href: '/chat', label: 'Chat', icon: { ios: 'bubble.left.fill', web: 'chat' } },
  { name: 'profile', href: '/profile', label: 'Profile', icon: { ios: 'person.fill', web: 'person' } },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href as Href} asChild>
              <TabButton icon={tab.icon}>{tab.label}</TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: SymbolViewProps['name'] }) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : (scheme ?? 'light')];

  return (
    <Pressable {...props} style={styles.tabButton}>
      <View style={[styles.iconWrap, isFocused && { backgroundColor: colors.accentMuted }]}>
        <SymbolView name={icon} size={18} tintColor={isFocused ? colors.accent : colors.textSecondary} />
      </View>
      <ThemedText
        type="small"
        style={[styles.tabLabel, { color: isFocused ? colors.accent : colors.textSecondary, fontWeight: isFocused ? '700' : '500' }]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : (scheme ?? 'light')];

  return (
    <View {...props} style={styles.tabListContainer} pointerEvents="box-none">
      <View style={[styles.innerContainer, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.text }]}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Spacing.three,
    paddingHorizontal: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    maxWidth: MaxContentWidth,
    borderRadius: Spacing.four,
    borderWidth: 1,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: 2,
    paddingHorizontal: Spacing.two,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
});
