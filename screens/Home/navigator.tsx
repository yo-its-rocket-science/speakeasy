import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./page";
import { HomeScreenParamList } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";

const HomeStack = createStackNavigator<HomeScreenParamList>();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerRight: () => <MaterialIcons size={24} />,
          animationEnabled: true,
        }}
      />
    </HomeStack.Navigator>
  );
};
