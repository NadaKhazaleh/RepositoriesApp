import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  phoneNumber: string;
  location: string;
  photo: string;
}

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: '',
    phoneNumber: '',
    location: '',
    photo: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUserPhoto: (state, action: PayloadAction<string>) => {
      state.user.photo = action.payload;
    },
  },
});

export const { login, updateUserPhoto } = userSlice.actions;

export default userSlice.reducer;
