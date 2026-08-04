import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FieldLabel({ label, icon }: { label: string; icon: SymbolViewProps['name'] }) {
  const theme = useTheme();
  return (
    <View style={styles.fieldLabelRow}>
      <SymbolView name={icon} size={13} tintColor={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

export function CityInputRow({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onSwap,
}: {
  from: string;
  to: string;
  onChangeFrom: (v: string) => void;
  onChangeTo: (v: string) => void;
  onSwap: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.cityRow}>
      <View style={[styles.cityBox, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
        <FieldLabel label="From" icon={{ ios: 'airplane.departure', android: 'flight_takeoff', web: 'flight_takeoff' }} />
        <TextInput
          value={from}
          onChangeText={onChangeFrom}
          placeholder="City or airport"
          placeholderTextColor={theme.textSecondary}
          style={[styles.cityInput, { color: theme.text }]}
        />
      </View>
      <Pressable
        onPress={onSwap}
        hitSlop={10}
        style={[styles.swapButton, { backgroundColor: theme.primary, borderColor: theme.background }]}>
        <SymbolView
          name={{ ios: 'arrow.up.arrow.down', android: 'swap_vert', web: 'swap_vert' }}
          size={14}
          tintColor={theme.onPrimary}
        />
      </Pressable>
      <View style={[styles.cityBox, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
        <FieldLabel label="To" icon={{ ios: 'airplane.arrival', android: 'flight_land', web: 'flight_land' }} />
        <TextInput
          value={to}
          onChangeText={onChangeTo}
          placeholder="City or airport"
          placeholderTextColor={theme.textSecondary}
          style={[styles.cityInput, { color: theme.text }]}
        />
      </View>
    </View>
  );
}

export function SingleCityInput({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.cityBoxFull, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
      <FieldLabel label={label} icon={{ ios: 'mappin.circle', android: 'place', web: 'place' }} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.cityInput, { color: theme.text }]}
      />
    </View>
  );
}

const DATE_OPTIONS = ['Today', 'Tomorrow', 'In 3 days', 'This weekend', 'Next week'];

export function DateChips({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const theme = useTheme();
  return (
    <View>
      <FieldLabel label="Departure date" icon={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {DATE_OPTIONS.map((opt) => {
          const active = opt === selected;
          return (
            <Pressable
              key={opt}
              onPress={() => onSelect(opt)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? theme.primary : theme.backgroundElement,
                  borderColor: active ? theme.primary : theme.border,
                },
              ]}>
              <ThemedText type="small" style={{ color: active ? theme.onPrimary : theme.text, fontWeight: '600' }}>
                {opt}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 9,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const theme = useTheme();
  return (
    <View style={styles.stepperRow}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <View style={styles.stepperControls}>
        <Pressable
          onPress={() => onChange(Math.max(min, value - 1))}
          style={[styles.stepperButton, { borderColor: theme.border }]}>
          <SymbolView name={{ ios: 'minus', android: 'remove', web: 'remove' }} size={13} tintColor={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.stepperValue}>
          {value}
        </ThemedText>
        <Pressable
          onPress={() => onChange(Math.min(max, value + 1))}
          style={[styles.stepperButton, { borderColor: theme.border }]}>
          <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={13} tintColor={theme.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cityBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.two + 2,
  },
  cityBoxFull: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.two + 2,
  },
  cityInput: {
    fontSize: 16,
    fontWeight: '600',
    padding: 0,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  chipRow: {
    gap: Spacing.two,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    borderWidth: 1,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    minWidth: 20,
    textAlign: 'center',
  },
});
