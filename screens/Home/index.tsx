import React from "react";
import { Text, View } from "../../components/Themed";
import { styles } from "./style";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

export * from "./navigator";
