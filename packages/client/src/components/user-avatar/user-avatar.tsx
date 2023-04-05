import { FC } from 'react';
import IUserAvatar from './user-avatar.interface';
import useUserAvatar from './hooks/use-user-avatar';
import Avatar from '../avatar';

const UserAvatar: FC<IUserAvatar> = props => {
  const { src } = useUserAvatar();

  return <Avatar avatar={src} {...props} />;
};

export default UserAvatar;
