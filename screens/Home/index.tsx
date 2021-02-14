import React from "react";
import { FAB } from "react-native-paper";
import { Text, View } from "../../components/Themed";
import { styles } from "./style";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FAB
        icon="plus"
        onPress={() => {}}
        style={styles.createRoomFab}
        accessibilityComponentType=""
        accessibilityTraits=""
      />
    </View>
  );
};

export * from "./navigator";
