import React, { FC, useEffect } from 'react';
import './o-auth.styles.scss';
import { useSearchParams } from 'react-router-dom';
import { oauthApi } from '@/api';

const VerificationCode: FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const code = searchParams.get('code');
      await oauthApi.getServiceInfo({ code, redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI });
    })();
  }, []);

  return <div className="content-box oauth"></div>;
};

export default VerificationCode;
