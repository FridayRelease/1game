import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { IUserDTO } from '@/api/types';
import { NavigateSagaProps, PropsWithNavigator } from './types';

export interface UserState {
  info: IUserDTO | null;
  code: string | null;
}

const initialState: UserState = {
  info: null,
  code: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth: (state, { payload }: PayloadAction<string | undefined>) => {
      return state;
    },

    signup: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<IUserSignupRequest>
    ) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signin: (state, { payload }: PayloadAction<IUserSigninRequest>) => {
      return state;
    },

    setUser: (state, { payload }: PayloadAction<IUserDTO | null>) => {
      state.info = payload;
    },

    signout: state => {
      state.info = null;
    },
  },
});

export const userSelectors = {
  user: (state: RootState) => state.user,
};

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
