import { User } from "../types/User";
import { Action, createTypedHooks } from 'easy-peasy';

export type StoreModel = {
  user?: User;
  setUser: Action<StoreModel, User>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
