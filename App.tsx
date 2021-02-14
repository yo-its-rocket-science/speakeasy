import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import merge from "deepmerge";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={CombinedDarkTheme}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar
            style="auto"
            backgroundColor={CombinedDarkTheme.colors.background}
          />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
