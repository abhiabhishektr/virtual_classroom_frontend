import { configureStore } from '@reduxjs/toolkit';
import profileReducer, { ProfileState } from './slices/profileSlice';
import socketReducer, { SocketState } from './slices/socketSlice';
import authReducer, { AuthState } from './slices/authSlice'; // Import auth slice

// Load initial state from localStorage if available
const loadInitialState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState) {
      return JSON.parse(serializedState) as RootState;
    }
  } catch (e) {
    console.error('Failed to load Redux state from localStorage:', e);
  }
  return undefined;
};

export interface RootState {
  profile: ProfileState;
  socket: SocketState;
  auth: AuthState; // Add auth state
}

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    socket: socketReducer,
    auth: authReducer, // Add auth reducer
  },
  preloadedState: loadInitialState(),
});

// Save Redux state to localStorage on each state change
store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Failed to save Redux state to localStorage:', e);
  }
});

export type AppDispatch = typeof store.dispatch;
