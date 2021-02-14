import { User } from "../types/User";
import { Action, createTypedHooks } from 'easy-peasy';
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type StoreUser = User | FirebaseAuthTypes.User;
export type StoreModel = {
  user?: StoreUser;
  setUser: Action<StoreModel, StoreUser>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
