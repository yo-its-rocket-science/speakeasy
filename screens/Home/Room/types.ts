import { Room } from "../../../types";

export type RoomPageProps = {
  room: Room;
};

export type RoomContextProps = {
  remoteStream?: MediaStream;
  setRemoteStream: (stream?: MediaStream) => void;
  localStream?: MediaStream;
  setLocalStream: (stream?: MediaStream) => void;

  cachedRemotePC?: RTCPeerConnection;
  setCachedRemotePC: (cachedPC?: RTCPeerConnection) => void;

  cachedLocalPC?: RTCPeerConnection;
  setCachedLocalPC: (cachedPC?: RTCPeerConnection) => void;
}