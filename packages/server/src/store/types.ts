interface ITheme {
  value: string;
}

interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

interface IUserInfo {
  info: IUser | null;
}

interface IState {
  theme: ITheme;
  user: IUserInfo;
}

export { type ITheme, type IUser, type IUserInfo, type IState };
