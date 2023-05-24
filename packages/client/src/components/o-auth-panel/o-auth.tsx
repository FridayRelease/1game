import React, { FC, useEffect } from 'react';
import Icon from '@/components/icon';
import { Icons } from '@/components/icon/icon';
import './o-auth.styles.scss'
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from '@/features/authentication';
import { IOAuthGetCodeRequest, IOAuthRequest } from '@/types/user';
import { useNavigate } from 'react-router-dom';

const OAuth: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(userSelectors.user);

  const requestGetServiceId = {
    redirect_uri: 'http://localhost:3000',
  } as IOAuthGetCodeRequest;

  const requestGetUser = {
    redirect_uri: 'http://localhost:3000',
    code: userState.code,
  } as IOAuthRequest;

  const authYandex = () => {
    dispatch(
      userActions.oauthYandexGetUser({
        props: requestGetUser,
        navigate,
      })
    );
  }

  useEffect(() => {
    dispatch(
      userActions.oauthYandexGetServiceId({
        props: requestGetServiceId
      })
    );
  }, [])

  return (
    <div className="content-box oauth">
      <div className="oauth__button" onClick={authYandex}>
        <Icon type={Icons.Yandex} className="oauth__brand-logo"  />
      </div>
    </div>
  );
};

export default OAuth;
