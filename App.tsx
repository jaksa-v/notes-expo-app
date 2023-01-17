import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";

import { useState, useEffect, useCallback } from "react";

export default function App() {
  const { isLoadingComplete, fontsLoaded } = useCachedResources();
  const colorScheme = useColorScheme();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} session={session} />
        <StatusBar translucent={true} backgroundColor="transparent" />
      </SafeAreaProvider>
    );
  }
}
