import { FC, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { InputProps } from './input.types';
import './input.scss';

const Input: FC<InputProps> = ({
  testId,
  onClick,
  onBlur,
  children,
  className,
  size = 'medium',
  type = 'text',
  disabled,
  name = '',
  placeholder,
  error = '',
  value,
}) => {
  const classNameConcat = useMemo(() => {
    return cn(
      'input',
      {
        input_error: Boolean(error !== ''),
        input_disabled: !!disabled,
      },
      className
    );
  }, [size, disabled, type, error]);

  return (
    <div className="input-box">
      <input
        data-testid={testId}
        className={classNameConcat}
        onClick={onClick}
        onBlur={onBlur}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete="off">
        {children}
      </input>
      {error && <span className="input-box__error">{error}</span>}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
