// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../../api/authApi';

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: null,
};

// Async thunk for user registration
export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await registerUser({ email, password, name });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = 'User registered successfully! Check your email for OTP.';
      })
      .addCase(registerUserThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Registration failed. Please try again.';
      });
  },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
