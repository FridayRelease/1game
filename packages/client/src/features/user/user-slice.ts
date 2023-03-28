import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserDTO {
  name: string;
  login: string;
}

export interface UserState {
  user: IUserDTO | null;
  hello: string;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  hello: 'hello',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<IUserDTO>) => {
      state.user = action.payload;
    },

    auth: (state, action: PayloadAction<IUserDTO>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signup, auth } = userSlice.actions;

export default userSlice.reducer;
