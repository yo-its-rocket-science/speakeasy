import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  Card,
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
import { styles } from "./style";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "Third Item",
  },
];

const Item = ({ title }: { title: string }) => (
  <Card accessibilityComponentType="" accessibilityTraits="">
    <Card.Title
      title={title}
      subtitle="Card Subtitle"
      accessibilityComponentType=""
      accessibilityTraits=""
    />
    <Card.Content>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover
      source={{ uri: "https://picsum.photos/700" }}
      accessibilityComponentType=""
      accessibilityTraits=""
    />
    <Card.Actions>
      <Button accessibilityComponentType="" accessibilityTraits="">
        Cancel
      </Button>
      <Button accessibilityComponentType="" accessibilityTraits="">
        Ok
      </Button>
    </Card.Actions>
  </Card>
);

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
  const renderItem = ({ item }: { item: any }) => <Item title={item.title} />;
  const inset = useSafeAreaInsets();

  const keyExtractor = ({ id }: { id: string }) => id;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={HomeHeader}
          ItemSeparatorComponent={Divider}
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

export * from "./navigator";
