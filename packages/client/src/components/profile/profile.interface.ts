export interface IMenuItem {
  className: string;
  title: string;
  data: IMenuData[];
  onClick?: () => void;
}

export interface IMenuData {
  label: string;
  value: string | null;
}
