import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Message = { id: string; from: 'user' | 'bot'; text: string };

const INITIAL_MESSAGES: Message[] = [
  { id: 'm1', from: 'bot', text: "Hi, I'm Trix AI 👋 Ask me anything about flights, hotels, buses or your bookings." },
];

const QUICK_REPLIES = ['Cheapest flights to Goa?', 'Track my booking', 'How is commission calculated?'];

function generateReply(input: string) {
  const q = input.toLowerCase();
  if (q.includes('goa') || q.includes('flight')) {
    return 'Flights to Goa from New Delhi start at ₹7,400 onwards. Want me to open the search for you?';
  }
  if (q.includes('booking') || q.includes('track')) {
    return 'You can track all your bookings under the My Trips tab. Let me know the reference number if you need details on a specific one.';
  }
  if (q.includes('commission')) {
    return 'You earn 2-8% commission on every booking, credited to your wallet within 48 hours.';
  }
  return "Got it! I'll note that down. For now you can also browse Flights, Hotels and Bus deals right from the Home tab.";
}

export default function ChatScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Message>>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMessage: Message = { id: `u-${Date.now()}`, from: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setTimeout(() => {
      const botMessage: Message = { id: `b-${Date.now()}`, from: 'bot', text: generateReply(trimmed) };
      setMessages((prev) => [...prev, botMessage]);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }, 500);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two, borderColor: theme.border }]}>
        <View style={[styles.botIcon, { backgroundColor: theme.primaryMuted }]}>
          <SymbolView
            name={{ ios: 'sparkles', android: 'smart_toy', web: 'smart_toy' }}
            size={16}
            tintColor={theme.primary}
          />
        </View>
        <View>
          <ThemedText type="smallBold">Trix AI</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Ask me anything!
          </ThemedText>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'user' && styles.bubbleRowUser]}>
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor: item.from === 'user' ? theme.primary : theme.backgroundElement,
                  borderTopRightRadius: item.from === 'user' ? 4 : Spacing.three,
                  borderTopLeftRadius: item.from === 'bot' ? 4 : Spacing.three,
                },
              ]}>
              <ThemedText type="small" style={{ color: item.from === 'user' ? theme.onPrimary : theme.text }}>
                {item.text}
              </ThemedText>
            </View>
          </View>
        )}
      />

      {messages.length < 2 && (
        <View style={styles.quickReplies}>
          {QUICK_REPLIES.map((q) => (
            <Pressable
              key={q}
              onPress={() => send(q)}
              style={[styles.quickReply, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="small">{q}</ThemedText>
            </Pressable>
          ))}
        </View>
      )}

      <View
        style={[
          styles.inputRow,
          { borderColor: theme.border, paddingBottom: insets.bottom + BottomTabInset + Spacing.two },
        ]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable onPress={() => send(input)} style={[styles.sendButton, { backgroundColor: theme.primary }]}>
          <SymbolView
            name={{ ios: 'paperplane.fill', android: 'send', web: 'send' }}
            size={16}
            tintColor={theme.onPrimary}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  botIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    gap: Spacing.two,
    padding: Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  quickReply: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    borderWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    borderRadius: Spacing.five,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
