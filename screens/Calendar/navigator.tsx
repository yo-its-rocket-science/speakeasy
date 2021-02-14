import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar } from "./page";
import { CalendarScreenParamList } from "../../types";

const CalendarStack = createStackNavigator<CalendarScreenParamList>();
export const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={Calendar}
        options={{ headerTitle: "Calendar" }}
      />
    </CalendarStack.Navigator>
  );
};
