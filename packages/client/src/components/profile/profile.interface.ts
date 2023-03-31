export interface IMenuItem {
  className: string;
  title: string;
  data: IMenuData[];
  onClick?: () => void;
}

export interface IMenuData {
  key: string;
  value: string | null;
}
