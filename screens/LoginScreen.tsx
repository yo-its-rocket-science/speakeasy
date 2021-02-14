import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { theme } from "../theme";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Root">;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpeakEasy</Text>
      <TextInput label="Email" style={styles.field} value={email} onChangeText={text => setEmail(text)}
                 accessibilityComponentType="" accessibilityTraits="" textContentType="emailAddress"
                 autoCompleteType="email" keyboardType="email-address" />
      <TextInput label="Password" style={styles.field} value={password} onChangeText={text => setPassword(text)}
                 accessibilityComponentType="" accessibilityTraits="" secureTextEntry={true} textContentType="password"
                 autoCompleteType="password" />
      <Button mode="contained" style={styles.button} color="black" onPress={() => navigation.navigate("Root")}
              accessibilityComponentType="" accessibilityTraits="">Sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '40%',
    marginTop: '5%',
    marginLeft: '20%'
  },
  field: {
    width: '80%',
    marginTop: '5%',
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.text,
  },
  title: {
    color: theme.colors.text,
    fontSize: 64,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: "10%",
  },
});
