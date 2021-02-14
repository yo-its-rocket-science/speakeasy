import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { theme } from "../theme";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Root"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileSetup({ navigation }: Props) {
  const [displayName, setDisplayName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Setup</Text>
      <TextInput
        style={styles.field}
        label="Display Name"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
        accessibilityComponentType=""
        accessibilityTraits=""
      />
      <TextInput
        style={styles.field}
        label="Username"
        value={userName}
        onChangeText={text => setUserName(text)}
        accessibilityComponentType=""
        accessibilityTraits=""
      />
      <Button
        mode="contained"
        style={styles.button}
        color="black"
        onPress={() => navigation.navigate("Root")}
        accessibilityComponentType=""
        accessibilityTraits=""
      >
        Create
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.text,
  },
  title: {
    color: theme.colors.text,
    fontFamily: "Raleway",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  field: {
    width: "80%",
    marginTop: "5%",
  },
  button: {
    width: "40%",
    marginTop: "5%",
    marginLeft: "20%",
  },
});
