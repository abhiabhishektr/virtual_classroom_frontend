// src/redux/slices/socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket>) {
      state.socket = action.payload;
    },
    removeSocket(state) {
      state.socket = null;
    },
  },
});

export const { setSocket, removeSocket } = socketSlice.actions;
export default socketSlice.reducer;
