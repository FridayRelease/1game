import { HTMLInputTypeAttribute, MouseEventHandler } from 'react';

type InputType = HTMLInputTypeAttribute;
type InputSize = 'large' | 'small' | 'medium';

interface InputProps {
  testId?: string;
  onClick?: MouseEventHandler;
  onChange?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  children?: string;
  className?: string;
  size?: InputSize;
  type?: InputType;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  error?: string;
  value?: string;
}

export { type InputProps };
