// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducer, { ProfileState } from './slices/profileSlice';

export interface RootState {
  profile: ProfileState;
}

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;




