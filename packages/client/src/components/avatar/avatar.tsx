import { FC } from 'react';
import { cn } from '@/utils/cn';
import IAvatar from './avatar.interface';
import './avatar.scss';

const Avatar: FC<IAvatar> = ({
  url,
  className,
  children,
  editable = false,
  onClick,
}) => {
  return (
    <div
      className={cn(className, 'avatar-wrapper', { editable })}
      onClick={onClick}>
      <div
        className="avatar"
        title={
          editable ? `${url ? 'Поменять' : 'Загрузить'} аватар` : undefined
        }>
        {url && <img className="avatar__image" src={url} alt="your image" />}
      </div>
      <p className="avatar__text">{children}</p>
    </div>
  );
};

export default Avatar;
