import { MouseEventHandler } from 'react';

type ButtonView = 'secondary' | 'primary' | 'none' | 'icon';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'large' | 'small' | 'medium';

interface ButtonProps {
  testId?: string;
  onClick?: MouseEventHandler;
  children?: string;
  className?: string;
  view?: ButtonView;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  name?: string;
}

export { type ButtonProps };
