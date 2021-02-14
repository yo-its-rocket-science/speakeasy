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
import { theme } from "./theme";
import { RoomContextWrapper } from "./screens/Home/Room/context";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={CombinedDarkTheme}>
          <RoomContextWrapper>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar
                style="auto"
                backgroundColor={theme.colors.background}
              />
            </SafeAreaProvider>
          </RoomContextWrapper>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
