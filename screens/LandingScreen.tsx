import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { theme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStoreKey } from "../types/AsyncStore";

type Login = StackNavigationProp<RootStackParamList, "Login">;
type Signup = StackNavigationProp<RootStackParamList, "SignUp">;

type Props = {
  navigation: Login | Signup;
};

export default function LandingScreen({ navigation }: Props) {
  useEffect(() => {
    async function cb() {
      try {
        const user = await AsyncStorage.getItem(AsyncStoreKey.CURRENT_USER);
        if (user) {
          navigation.navigate("Root");
        }
      } catch (e) {}
    }

    cb();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeakEasy</Text>
      <Button
        mode="contained"
        style={styles.button}
        color="black"
        onPress={() => navigation.navigate("Login")}
        accessibilityComponentType=""
        accessibilityTraits=""
      >
        Log in
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        color="black"
        onPress={() => navigation.navigate("SignUp")}
        accessibilityComponentType=""
        accessibilityTraits=""
      >
        Sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "40%",
    marginTop: "5%",
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: 64,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "10%",
  },
});
