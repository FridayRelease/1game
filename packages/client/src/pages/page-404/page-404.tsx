import { Link } from 'react-router-dom';
import Error from '@/components/error';
import { FC } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

const Page404: FC = () => {
  const backLink = (
    <Link to={'/'} className="error-page__link">
      back
    </Link>
  );

  return (
    <Error status={404} text="Такой страницы не существует.">
      {backLink}
    </Error>
  );
};

Page404.displayName = 'Page404';

export default withLayoutMain(Page404);
