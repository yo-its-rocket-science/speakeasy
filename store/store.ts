import { createStore, action } from 'easy-peasy';
import { User } from '../types/User';
import { StoreModel } from './types';

export const store = createStore<StoreModel>({
  user: undefined,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
});
