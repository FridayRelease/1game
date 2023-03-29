export enum MenuState {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum MenuType {
  DEFAULT = 'default',
  SUBMIT = 'submit',
}

interface IMenu {
  title: string;
  className?: string;
  state?: MenuState;
  type?: MenuType;
  children?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
}

export default IMenu;
