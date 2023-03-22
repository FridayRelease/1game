import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>404!</h1>
        <p>Страница не найдена, либо еще не создана.</p>
        <p>
          <i>
            {error.status} {error.statusText}
          </i>
        </p>
      </div>
    );
  }

  return <p>Unknown Error</p>;
}
