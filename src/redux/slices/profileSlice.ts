// profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Export this interface
export interface ProfileState {
  // username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
  role: string;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
}

const initialState: ProfileState = {
  // username: '',
  name: '',
  email: '',
  phone: 'add your phone number',
  role: 'user',
  profilePicture: '',
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
    resetProfileState() {
      return initialState;
    }
  },
});

export const { setProfileData, setLoading, setError, setIsEditing ,resetProfileState} = profileSlice.actions;

export default profileSlice.reducer;

