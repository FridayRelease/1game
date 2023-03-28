import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import Error from '@/components/error';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Error status={error.status} text="Такой страницы не существует.">
          <Link to={'/'} className="error-page__link">
            back
          </Link>
        </Error>
      );
    }

    // 5xx ошибки
    if (error.status.toString().match(/^5\d\d$/)) {
      return <Error status={error.status} text="Сервер сейчас не работает." />;
    }
  }

  return <Error text="Unknown Error" />;
}
