// profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Export this interface
export interface ProfileState {
  // username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
}

const initialState: ProfileState = {
  // username: '',
  name: '',
  email: '',
  phone: 'add your phone number',
  password: '****',
  loading: false,
  error: "null",
  isEditing: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(state, action: PayloadAction<Partial<ProfileState>>) {
      return { ...state, ...action.payload };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
  },
});

export const { setProfileData, setLoading, setError, setIsEditing } = profileSlice.actions;

export default profileSlice.reducer;

// You can also export the slice if needed
// export const profileSlice;