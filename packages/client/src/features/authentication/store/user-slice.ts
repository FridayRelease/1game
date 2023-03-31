import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { IUserDTO } from '@/api/types';
import { NavigateSagaProps, PropsWithNavigator } from './types';

export interface UserState {
  info: IUserDTO | null;
}

const initialState: UserState = {
  info: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth: (state, { payload }: PayloadAction<NavigateSagaProps>) => {
      return state;
    },

    signup: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<PropsWithNavigator<IUserSignupRequest>>
    ) => {
      return state;
    },

    signin: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<PropsWithNavigator<IUserSigninRequest>>
    ) => {
      return state;
    },

    setUser: (state, { payload }: PayloadAction<IUserDTO | null>) => {
      state.info = payload;
    },
  },
});

export const userSelectors = {
  user: (state: RootState) => state.user,
};

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
