import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  FAB,
  Paragraph,
  Title,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View } from "../../components/Themed";
import { theme } from "../../theme";
import { HomeScreenParamList, Room, RoomMockFactory } from "../../types";
import { styles } from "./style";

const DATA: Room[] = RoomMockFactory.buildList(10);

const Item = (item: Room) => {
  const navigation = useNavigation();

  const onOpenRoom = () => {
    console.log({ item });

    navigation.navigate("RoomScreen", { room: item });
  };

  return (
    <Card
      accessibilityComponentType=""
      accessibilityTraits=""
      style={styles.card}
      onPress={onOpenRoom}
    >
      <Card.Content>
        <View
          style={{
            backgroundColor: "#1C1C1C",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "auto",
          }}
        >
          <Title>{item.name}</Title>
          <Chip
            accessibilityComponentType=""
            accessibilityTraits=""
            style={{ backgroundColor: "#ef5350" }}
          >
            Live
          </Chip>
        </View>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const HomeHeader = () => (
  <Appbar
    style={styles.appbar}
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
);

export const Home = () => {
  const renderItem = ({ item }: { item: Room }) => <Item {...item} />;
  const inset = useSafeAreaInsets();

  const keyExtractor = ({ id }: Room) => id;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          ListHeaderComponent={HomeHeader}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingBottom: inset.bottom,
          }}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>

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
