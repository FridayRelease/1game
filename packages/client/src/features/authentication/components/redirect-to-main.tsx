import { MainUrl } from '@/constant/router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function RedirectToMain({ children }: { children: JSX.Element }) {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(MainUrl);
    }
  }, [isAuth]);

  return !isAuth ? children : null;
}

export { RedirectToMain };
