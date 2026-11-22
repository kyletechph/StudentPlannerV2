import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { colors } from '@/shared/styles';

const CACHE_KEY = 'daily-quote';
const FALLBACK = { q: 'Small steps every day add up to big results.', a: 'Student Planner' };

export function QuoteCard() {
  const [quote, setQuote] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const todayKey = new Date().toDateString();
      try {
        // Reuse today's quote so we only call the API once a day
        const cached = JSON.parse((await AsyncStorage.getItem(CACHE_KEY)) ?? 'null');
        if (cached && cached.day === todayKey) {
          if (!cancelled) setQuote(cached.quote);
          return;
        }
        const res = await fetch('https://zenquotes.io/api/random');
        const data = await res.json();
        const next = { q: data[0].q, a: data[0].a };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ day: todayKey, quote: next }));
        if (!cancelled) setQuote(next);
      } catch {
        // Offline or API error: keep the fallback quote
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.lavenderSoft,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 15, fontStyle: 'italic' }}>"{quote.q}"</Text>
      <Text style={{ color: colors.muted, fontSize: 13, marginTop: 6 }}>— {quote.a}</Text>
      <Text style={{ color: colors.faint, fontSize: 10, marginTop: 8 }}>
        Quotes by ZenQuotes.io
      </Text>
    </View>
  );
}
