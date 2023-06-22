import React, { FC, useEffect, useState } from 'react';
import Icon from '@/components/icon';
import { Icons } from '@/components/icon/icon';
import './o-auth.styles.scss';
import { Link } from 'react-router-dom';
import { getServiceIDInfo } from '@/controllers/oauth-controller';
import { useDispatch } from 'react-redux';
import { errorActions } from '@/store/slices/error-slice';

const OAuth: FC = () => {
  const [serviceId, setId] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { service_id } = await getServiceIDInfo(import.meta.env.VITE_OAUTH_REDIRECT_URI);
        setId(service_id);
      } catch (error) {
        if (error instanceof Error) {
          dispatch(
            errorActions.setError({
              title: error.message,
              description: 'Попробуйте еще раз.',
            })
          );
        }
      }
    })();
  }, []);

  return (
    <div className="content-box oauth">
      {serviceId ? (
        <Link
          className="oauth__button"
          to={`${import.meta.env.VITE_OAUTH_LOGIN_URL}?response_type=code&client_id=${serviceId}&redirect_uri=${
            import.meta.env.VITE_OAUTH_REDIRECT_URI
          }
`}>
          <Icon type={Icons.Yandex} className="oauth__brand-logo" />
          Войти с Яндекс ID
        </Link>
      ) : null}
    </div>
  );
};

export default OAuth;
