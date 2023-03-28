import { ReactNode } from 'react';

interface ErrorProps {
  testId?: string;
  status?: string | number;
  text?: string;
  children?: ReactNode;
}

export { type ErrorProps };
