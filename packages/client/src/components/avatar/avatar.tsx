import { FC } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/utils/cn';
import { userSelectors } from '@/features/authentication';
import { IUserDTO } from '@/api/types';
import IAvatar from './avatar.interface';
import './avatar.scss';

const Avatar: FC<IAvatar> = ({ className, children, editable = false, onClick }) => {
  const userState = useSelector(userSelectors.user);

  const { avatar } = userState.info as IUserDTO;
  const src = `${import.meta.env.VITE_AUTH_API}resources${avatar}`;

  return (
    <div className={cn(className, 'avatar-wrapper', { editable })} onClick={onClick}>
      <div className="avatar" title={editable ? `${avatar ? 'Поменять' : 'Загрузить'} аватар` : undefined}>
        {avatar && <img className="avatar__image" src={src} alt="your image" />}
      </div>
      <p className="avatar__text">{children}</p>
    </div>
  );
};

export default Avatar;
