import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import { userActions } from '../store/user-slice';

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(userActions.auth({ navigate }));
    }
  }, []);

  return isAuth ? children : null;
}

export { RequireAuth };
