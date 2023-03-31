import { FC } from 'react';
import ICloseButton from './close-button.interface';
import './close-button.scss';
import { cn } from '@/utils/cn';

const CloseButton: FC<ICloseButton> = ({ className, ...props }) => {
  return <button className={cn(className, 'close-button')} {...props} />;
};

export default CloseButton;
