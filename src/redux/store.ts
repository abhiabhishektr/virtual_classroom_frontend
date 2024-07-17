// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducer, { ProfileState } from './slices/user/profileSlice';

export interface RootState {
  profile: ProfileState;
}

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;





// import { configureStore } from "@reduxjs/toolkit";
// import profileReducer from './slices/user/profileSlice';

// const store = configureStore({
//   reducer: {
//     user: profileReducer,
//     // Add other reducers if needed
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
