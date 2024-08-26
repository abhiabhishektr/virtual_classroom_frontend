// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    authToken: string | null;
}

const initialState: AuthState = {
    authToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken(state, action: PayloadAction<string | null>) {
            state.authToken = action.payload;
        },
        resetAuthState(state) {
            state.authToken = null;
        },
    },
});

export const { setAuthToken, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
