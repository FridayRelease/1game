import { cn } from '../../utils/cn';
import './button.css';
import { ButtonProps } from './types';

const Button = ({
  testId,
  onClick,
  children,
  view,
  className,
  size = 'medium',
  type = 'button',
  disabled,
  name = '',
}: ButtonProps) => (
  <button
    data-testid={testId}
    className={cn(
      'button',
      {
        button_primary: view === 'primary',
        button_secondary: view === 'secondary',
        button_medium: size === 'medium',
        button__large: size === 'large',
        button__small: size === 'small',
        button__icon: view === 'icon',
        button_disabled: !!disabled,
      },
      className
    )}
    onClick={onClick}
    name={name}
    type={type}>
    {children}
  </button>
);

export default Button;
