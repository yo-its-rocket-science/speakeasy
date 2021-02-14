import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { theme } from "../theme";
import { firebase } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStoreKey } from "../types/AsyncStore";
import { StoreUser, useStoreActions, useStoreState } from "../store/types";

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
  const setUser = useStoreActions(actions => actions.setUser);
  const reduxUser = useStoreState(state => state.user);

  const onSetupProfile = async () => {
    if (reduxUser) {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(reduxUser.email, reduxUser.password);

        await AsyncStorage.setItem(
          AsyncStoreKey.CURRENT_USER,
          JSON.stringify(user)
        );
        setUser(user as StoreUser);
        navigation.navigate("Root");
      } catch (error) {
        // setErrorMsg(error.message);
        console.error(error);
      }
    }
  };

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
        onPress={onSetupProfile}
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
  },
});
