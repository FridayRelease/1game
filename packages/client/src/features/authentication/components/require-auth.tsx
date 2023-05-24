import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import { userActions } from '../store/user-slice';

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(userActions.auth());
    }
  }, []);

  return isAuth ? children : null;
}

export { RequireAuth };
