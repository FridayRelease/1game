import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import Error from '@/components/error';
import { FC } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

const ErrorPage: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const backLink = (
      <Link to={'/'} className="error-page__link">
        back
      </Link>
    );

    if (error.status === 404) {
      return (
        <Error status={error.status} text="Такой страницы не существует.">
          {backLink}
        </Error>
      );
    }

    // 5xx ошибки
    if (error.status.toString().match(/^5\d\d$/)) {
      return (
        <Error status={error.status} text="Сервер сейчас не работает.">
          {backLink}
        </Error>
      );
    }
  }

  return <Error text="Unknown Error" />;
};

ErrorPage.displayName = 'ErrorPage';

export default withLayoutMain(ErrorPage);
