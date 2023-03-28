import { RootState } from '@/store';
import { useSelector } from 'react-redux';

function useAuth() {
  const user = useSelector((state: RootState) => state.userReducer.user);

  return user !== null;
}

export { useAuth };
