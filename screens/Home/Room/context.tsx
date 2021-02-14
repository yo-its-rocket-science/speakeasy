import React, { createContext, useContext, useState } from "react";
import { RoomContextProps } from "./types";

export const RoomContext = createContext({} as RoomContextProps);

export const RoomContextWrapper: React.FC = ({ children }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [cachedLocalPC, setCachedLocalPC] = useState<
    RTCPeerConnection | undefined
  >();
  const [cachedRemotePC, setCachedRemotePC] = useState<
    RTCPeerConnection | undefined
  >();

  const value: RoomContextProps = {
    remoteStream,
    localStream,
    setLocalStream,
    setRemoteStream,
    cachedLocalPC,
    cachedRemotePC,
    setCachedLocalPC,
    setCachedRemotePC,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => useContext(RoomContext);
