import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginUrl } from '@/constant/router';
import { useDispatch } from 'react-redux';
import { errorActions } from '@/store/slices/error-slice';
import { getServiceInfo } from '@/controllers/oauth-controller';
import { userActions } from '../store';

const VerificationCode: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        dispatch(errorActions.resetError());
        const code = searchParams.get('code');
        const res = await getServiceInfo({
          code,
          redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI || '/verification_code',
        });

        if (res === 'OK') {
          dispatch(userActions.auth());
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch(
            errorActions.setError({
              title: error.message,
              description: 'Попробуйте еще раз.',
            })
          );
        }
        navigate(LoginUrl);
      }
    })();
  }, []);

  return <div className="content-box oauth"></div>;
};

export default VerificationCode;
