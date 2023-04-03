import './button-new.scss';
import { MouseEventHandler, ReactElement } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonNewProps {
  name?: string;
  id?: string;
  onClick?: MouseEventHandler;
  children?: string | ReactElement;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
}

const ButtonNew = ({
  name = '',
  id,
  onClick,
  children,
  className,
  type = 'button',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disabled = false,
}: ButtonNewProps) => (
  <button id={id} className={className} onClick={onClick} name={name} type={type}>
    {children}
  </button>
);

export default ButtonNew;
