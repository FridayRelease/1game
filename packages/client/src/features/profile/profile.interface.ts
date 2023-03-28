export interface IMockUser {
  name: string;
  secondName: string;
  login: string;
  phone: string;
  chatName: string;
  password: string;
}

export interface IMenuItem {
  className: string;
  title: string;
  data: IMenuData[];
  onClick: () => void;
}

export interface IMenuData {
  key: string;
  value: string;
}