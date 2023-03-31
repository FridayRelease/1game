import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

function useAuth() {
  const user = useSelector((state: RootState) => state.user.info);

  return user !== null;
}

export { useAuth };
