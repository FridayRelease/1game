import { MouseEventHandler, ReactNode } from 'react';

interface ModalProps {
  handleClose: MouseEventHandler;
  isShow: boolean;
  children: ReactNode;
}

export { type ModalProps };
