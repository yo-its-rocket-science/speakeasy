import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { theme } from "./theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="auto" backgroundColor={theme.colors.background} />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
