import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, Image, View, FlatList } from "react-native";
import { Appbar, Card, Title } from "react-native-paper";
import { theme } from "../../../theme";
import { styles } from "./style";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RoomPageProps } from "./types";
import { Room as RoomModel } from "../../../types";
import { User, UserMockFactory } from "../../../types/User";

const DATA: User[] = UserMockFactory.buildList(5);

const RoomHeader = ({ room }: { room: RoomModel }) => {
  const navigation = useNavigation();

  const onEndCall = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Appbar
      style={styles.appbar}
      collapsable
      accessibilityComponentType=""
      accessibilityTraits=""
    >
      <Appbar.Action
        style={{ backgroundColor: "red" }}
        onPress={onEndCall}
        size={32}
        icon="phone-off"
        color={theme.colors.text}
        accessibilityComponentType=""
        accessibilityTraits=""
      />

      <Appbar.Content
        title={room.name}
        accessibilityComponentType=""
        accessibilityTraits=""
      />
    </Appbar>
  );
};

const Item = (item: User) => {
  return (
    <Card
      accessibilityComponentType=""
      accessibilityTraits=""
      style={styles.card}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          width={85}
          height={85}
          style={styles.profilePic}
          source={{
            uri: item.picture,
          }}
        />

        <Card.Content>
          <Title>{item.name}</Title>
        </Card.Content>
      </View>
    </Card>
  );
};

export const Room = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { room } = route?.params as RoomPageProps;
  const inset = useSafeAreaInsets();

  const renderItem = ({ item }: { item: User }) => <Item {...item} />;
  const keyExtractor = ({ id }: User) => id;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={styles.listContainer}
          ListHeaderComponent={() => <RoomHeader room={room} />}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingBottom: inset.bottom,
          }}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};
