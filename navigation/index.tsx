import { DarkTheme as PaperDarkTheme } from "react-native-paper";
import merge from "deepmerge";

import {
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { Room } from "../screens/Home/Room";
import ProfileSetup from "../screens/ProfileSetupScreen";

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
//{colorScheme,}: {colorScheme: ColorSchemeName;}
export default function Navigation() {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
