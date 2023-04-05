import { useSelector } from 'react-redux';
import { userSelectors } from '@/features/authentication';
import { IUserDTO } from '@/api/types';
import useAvatar from '@/hooks/use-avatar';

const useUserAvatar = () => {
  const userState = useSelector(userSelectors.user);

  const { avatar } = userState.info as IUserDTO;
  const {avatar: src} = useAvatar(avatar);

  return { src };
};

export default useUserAvatar;
