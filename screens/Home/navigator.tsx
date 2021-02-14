import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Home";
import { HomeScreenParamList } from "../../types";

const HomeStack = createStackNavigator<HomeScreenParamList>();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
};
