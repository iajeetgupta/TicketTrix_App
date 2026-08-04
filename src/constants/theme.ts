/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0B1220',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    card: '#ffffff',
    border: '#E4E7EC',
    primary: '#208AEF',
    primaryDark: '#136FC4',
    primaryMuted: '#E9F3FE',
    accent: '#FF9F1C',
    accentMuted: '#FFF1DC',
    success: '#1AA260',
    successMuted: '#E5F7EE',
    danger: '#E5484D',
    overlay: 'rgba(11,18,32,0.55)',
    onPrimary: '#ffffff',
  },
  dark: {
    text: '#F5F7FA',
    background: '#0B0E13',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    card: '#171A21',
    border: '#2A2E37',
    primary: '#4EA6F5',
    primaryDark: '#208AEF',
    primaryMuted: '#12283D',
    accent: '#FFB238',
    accentMuted: '#3A2A0F',
    success: '#33C97F',
    successMuted: '#0F2A1D',
    danger: '#F17075',
    overlay: 'rgba(0,0,0,0.6)',
    onPrimary: '#0B1220',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
