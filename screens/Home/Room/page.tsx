// @ts-nocheck

import React, { useCallback, useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  BackHandler,
} from "react-native";
import InCallManager from "react-native-incall-manager";
import { Avatar, Appbar, Button, Card, Title } from "react-native-paper";
import { theme } from "../../../theme";
import { styles } from "./style";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RoomPageProps } from "./types";
import { Room as RoomModel } from "../../../types";
import { User, UserMockFactory } from "../../../types/User";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
import { RoomContextWrapper, useRoomContext } from "./context";
import { StoreUser, useStoreState } from "../../../store/types";

let DATA: StoreUser[] = UserMockFactory.buildList(15);

const RoomHeader = ({ room }: { room: RoomModel }) => {
  const {
    localStream,
    setLocalStream,
    remoteStream,
    cachedLocalPC,
    cachedRemotePC,
    setRemoteStream,
    setCachedLocalPC,
    setCachedRemotePC,
  } = useRoomContext();

  const navigation = useNavigation();

  const onEndCall = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      cachedRemotePC.removeStream(remoteStream);
      cachedRemotePC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedRemotePC();
    setCachedLocalPC();

    InCallManager.stop();
    InCallManager.setSpeakerphoneOn(false);
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
        {item.picture || item.photoURL ? (
          <Avatar.Image
            size={65}
            source={{ uri: item.picture }}
            style={{ margin: 8 }}
          />
        ) : (
          <Avatar.Icon size={65} icon="account" style={{ margin: 8 }} />
        )}

        <Card.Content style={{ justifyContent: "center" }}>
          <Title>{item.name ? item.name : item.email}</Title>
        </Card.Content>
      </View>
    </Card>
  );
};

const RoomFooter = ({ room }: { room: RoomModel }) => {
  const [muted, setMuted] = useState(true);
  const {
    localStream,
    remoteStream,
    setRemoteStream,
    cachedLocalPC,
    setCachedLocalPC,
    setCachedRemotePC,
  } = useRoomContext();

  useEffect(() => {
    if (localStream) {
      // mute by default
      localStream?.getAudioTracks().forEach(t => {
        t.enabled = false;
      });

      // start the call
      startCall();
    }
  }, [localStream]);

  const toggleMute = () => {
    // TODO: remote stream
    // if (!remoteStream) return;
    localStream.getAudioTracks().forEach(track => {
      console.log(track.enabled ? "muting" : "unmuting", " local track", track);
      track.enabled = !track.enabled;
      setMuted(!track.enabled);
    });
  };

  const startCall = async () => {
    // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
    const configuration = {
      iceServers: [{ url: "stun:stun.l.google.com:19302" }],
    };
    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);

    // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
    localPC.onicecandidate = e => {
      try {
        console.log("localPC icecandidate:", e.candidate);
        if (e.candidate) {
          remotePC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    };
    remotePC.onicecandidate = e => {
      try {
        console.log("remotePC icecandidate:", e.candidate);
        if (e.candidate) {
          localPC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding localPC iceCandidate: ${err}`);
      }
    };
    remotePC.onaddstream = e => {
      console.log("remotePC tracking with ", e);
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream", e.stream);
        setRemoteStream((e.stream as unknown) as MediaStream);
      }
    };

    // AddTrack not supported yet, so have to use old school addStream instead
    // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
    localPC.addStream(localStream);
    try {
      const offer = await localPC.createOffer();
      console.log("Offer from localPC, setLocalDescription");
      await localPC.setLocalDescription(offer);
      console.log("remotePC, setRemoteDescription");
      await remotePC.setRemoteDescription(localPC.localDescription);
      console.log("RemotePC, createAnswer");
      const answer = await remotePC.createAnswer();
      console.log(`Answer from remotePC: ${answer.sdp}`);
      console.log("remotePC, setLocalDescription");
      await remotePC.setLocalDescription(answer);
      console.log("localPC, setRemoteDescription");
      await localPC.setRemoteDescription(remotePC.localDescription);
    } catch (err) {
      console.error(err);
    }

    setCachedLocalPC(localPC);
    setCachedRemotePC(remotePC);
  };

  return (
    <View>
      <Button
        accessibilityComponentType=""
        accessibilityTraits=""
        onPress={toggleMute}
      >
        {muted ? "Unmute" : "Mute"}
      </Button>
      {remoteStream && (
        // @ts-ignore
        // this thing allows the audio
        <RTCView streamURL={remoteStream.toURL()} />
      )}
    </View>
  );
};

export const Room = () => {
  const { setLocalStream } = useRoomContext();
  const route = useRoute();
  const { room } = route?.params as RoomPageProps;
  const inset = useSafeAreaInsets();
  const user = useStoreState(state => state.user);

  const renderItem = ({ item }: { item: User }) => <Item {...item} />;
  const keyExtractor = ({ id }: User) => id;

  const startLocalStream = async () => {
    try {
      const newStream = await mediaDevices.getUserMedia({ audio: true });
      console.log(setLocalStream);

      setLocalStream((newStream as unknown) as MediaStream);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function cb() {
      await startLocalStream();
      InCallManager.start({ media: "audio" });
      InCallManager.setSpeakerphoneOn(true);
    }

    cb();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        InCallManager.stop();
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [InCallManager])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <FlatList
          style={styles.listContainer}
          ListHeaderComponent={() => <RoomHeader room={room} />}
          contentContainerStyle={{
            backgroundColor: theme.colors.background,
            paddingBottom: inset.bottom,
          }}
          data={[user, ...DATA]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <RoomFooter room={room} />
      </View>
    </SafeAreaView>
  );
};
