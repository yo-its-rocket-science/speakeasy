import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar } from "../Calendar";
import { CalendarScreenParamList } from "../../types";

const CalendarStack = createStackNavigator<CalendarScreenParamList>();
export const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={Calendar}
        options={{ headerTitle: "Calendar" }}
      />
    </CalendarStack.Navigator>
  );
};
