import React, { FC, useEffect, useState } from 'react';
import Icon from '@/components/icon';
import { Icons } from '@/components/icon/icon';
import './o-auth.styles.scss';
import { Link } from 'react-router-dom';
import { oauthApi } from '@/api';

const OAuth: FC = () => {
  const [serviceId, setId] = useState<string>();

  useEffect(() => {
    (async () => {
      const { service_id } = await oauthApi.getAppId(import.meta.env.VITE_OAUTH_REDIRECT_URI);
      setId(service_id);
    })();
  }, []);

  return (
    <div className="content-box oauth">
      <Link
        className="oauth__button"
        to={`${import.meta.env.VITE_OAUTH_LOGIN_URL}?response_type=code&client_id=${serviceId}&redirect_uri=${
          import.meta.env.VITE_OAUTH_REDIRECT_URI
        }
`}>
        <Icon type={Icons.Yandex} className="oauth__brand-logo" />
      </Link>
    </div>
  );
};

export default OAuth;
