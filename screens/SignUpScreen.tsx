import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { theme } from "../theme";
import { firebase } from "@react-native-firebase/auth";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Root">;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeat, setRepeat] = React.useState("");
    const [errorMessage, setErrorMsg] = React.useState("");

    function AttemptCreateAccount() {
        if (email.length === 0 || password.length === 0 || repeat.length === 0) {
            setErrorMsg("Enter your email and password to login.");
        } else if (password != repeat) {
            setErrorMsg("Passwords do not match");
        } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((userCrendential) => {
                  navigation.navigate("Root");
              }).catch((error) => {
                setErrorMsg(error.message);
            });
        }
    }

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text>{errorMessage}</Text>
          <TextInput style={styles.field}
                     label="Email"
                     value={email}
                     onChangeText={(text: string) => setEmail(text)}
                     accessibilityComponentType=""
                     accessibilityTraits=""
                     textContentType="emailAddress"
                     autoCompleteType="email"
                     keyboardType="email-address" />
          <TextInput style={styles.field}
                     label="Password"
                     value={password}
                     onChangeText={(text: string) => setPassword(text)}
                     accessibilityComponentType=""
                     accessibilityTraits=""
                     secureTextEntry={true}
                     textContentType="password"
                     autoCompleteType="password" />
          <TextInput style={styles.field}
                     label="Repeat Password"
                     value={repeat}
                     onChangeText={(text: string) => setRepeat(text)}
                     accessibilityComponentType=""
                     accessibilityTraits=""
                     secureTextEntry={true}
                     textContentType="password"
                     autoCompleteType="password" />
          <Button mode="contained" style={styles.button} color="black" onPress={AttemptCreateAccount}
                  accessibilityComponentType="" accessibilityTraits="">Sign up</Button>
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
