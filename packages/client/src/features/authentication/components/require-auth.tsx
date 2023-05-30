import { LoginUrl } from '@/constant/router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(LoginUrl);
    }
  }, []);

  return isAuth ? children : null;
}

export { RequireAuth };
