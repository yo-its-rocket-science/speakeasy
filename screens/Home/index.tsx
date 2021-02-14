import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import { theme } from "../../theme";
import { styles } from "./style";

export const Home = () => {
  const inset = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar
        style={{ ...styles.appbar, top: inset.top }}
        accessibilityComponentType=""
        accessibilityTraits=""
      >
        <TouchableOpacity>
          <Image
            width={85}
            height={85}
            style={styles.profilePic}
            source={{
              uri:
                "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
            }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
          <Appbar.Action
            onPress={() => console.log("TODO: Notifications")}
            icon="bell"
            color={theme.colors.text}
            accessibilityComponentType=""
            accessibilityTraits=""
          />

          <Appbar.Action
            onPress={() => console.log("TODO: Search")}
            icon="magnify"
            color={theme.colors.text}
            accessibilityComponentType=""
            accessibilityTraits=""
          />
        </View>
      </Appbar>

      <FAB
        icon="plus"
        onPress={() => {}}
        style={styles.createRoomFab}
        accessibilityComponentType=""
        accessibilityTraits=""
      />
    </SafeAreaView>
  );
};

export * from "./navigator";
