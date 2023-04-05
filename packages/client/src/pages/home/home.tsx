import { FC } from 'react';
import { userSelectors } from '@/features/authentication';
import { useSelector } from 'react-redux';
import Logotype from '../../assets/images/logotype.png';
import { cn } from '@/utils/cn';
import './home.scss';
import { Link } from 'react-router-dom';
import { ForumUrl } from '@/constant/router';
import { ReactComponent as IconProfile } from '@/assets/images/icons/profile.svg';
import { ReactComponent as IconTrophy } from '@/assets/images/icons/trophy.svg';
import { ReactComponent as IconForum } from '@/assets/images/icons/forum.svg';
import { ReactComponent as IconLogout } from '@/assets/images/icons/logout.svg';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

const Home: FC = () => {
  const user = useSelector(userSelectors.user);

  return (
    <main className="home">
      <div className="home__header">
        <div className="switch-theme">переключатель темы</div>
        <img src={Logotype} alt="Battle city" className="home__logotype" />
      </div>
      <div className="home__content">
        <div className="home__left-side">
          <h2 className="home__greeting">Привет, {user.info?.first_name}!</h2>
          <h3 className="home__trophy-result">Твой лучший результат: {'123'}</h3>
          <nav className="home__nav">
            <Link to={'#'} className={cn('home__link', 'home__link__bg-green')}>
              <IconProfile className="home__link-icon" fill="var(--main-color-bg)" />
              профиль
            </Link>

            <Link to={'#'} className={cn('home__link', 'home__link__bg-green')}>
              <IconTrophy className="home__link-icon" stroke="var(--main-color-bg)" />
              доска лидеров
            </Link>

            <Link to={ForumUrl} className={cn('home__link', 'home__link__bg-green')}>
              <IconForum className="home__link-icon" stroke="var(--main-color-bg)" />
              форум
            </Link>

            <Link to={'#'} className="home__link">
              <IconLogout className="home__link-icon" fill="var(--main-color-bg)" />
              выйти
            </Link>

            <Link to={'#'} className={cn('home__link', 'home__link-start', 'home__link__bg-red')}>
              старт
            </Link>
          </nav>
        </div>
        <div className="home__right-side">место для видео</div>
      </div>
    </main>
  );
};

Home.displayName = 'Home';

export default withLayoutMain(Home);
