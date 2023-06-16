import { FC, useCallback } from 'react';
import { userActions, userSelectors } from '@/features/authentication';
import { useDispatch, useSelector } from 'react-redux';
import Logotype from '@/components/logotype';
import { cn } from '@/utils/cn';
import './home.scss';
import { ForumUrl, GameUrl, LeaderboardUrl, ProfileUrl } from '@/constant/router';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import { Icons } from '@/components/icon/icon';
import { LinkType } from '@/types/link';
import MenuItem from '@/features/home';

const Home: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);

  const onClick = useCallback(() => {
    dispatch(userActions.signout());
  }, []);

  const links: LinkType[] = [
    {
      text: 'профиль',
      url: ProfileUrl,
      className: cn('home__link', 'home__link__bg-green'),
      icon: { type: Icons.Profile, className: cn('home__link-icon'), fill: 'var(--main-color-bg)' },
    },
    {
      text: 'доска лидеров',
      url: LeaderboardUrl,
      className: cn('home__link', 'home__link__bg-green'),
      icon: { type: Icons.Trophy, className: cn('home__link-icon'), stroke: 'var(--main-color-bg)' },
    },
    {
      text: 'форум',
      url: ForumUrl,
      className: cn('home__link', 'home__link__bg-green'),
      icon: { type: Icons.Forum, className: cn('home__link-icon'), stroke: 'var(--main-color-bg)' },
    },
    {
      text: 'выйти',
      onClick,
      className: cn('home__link', 'home__link__bg-green'),
      icon: { type: Icons.Logout, className: cn('home__link-icon'), fill: 'var(--main-color-bg)' },
    },
    {
      text: 'старт',
      url: GameUrl,
      className: cn('home__link', 'home__link-start', 'home__link__bg-red'),
    },
  ];

  return (
    <main className="home">
      <div className="home__header">
        <Logotype className="home__logotype" />
      </div>
      <div className="home__content">
        <div className="home__left-side">
          <h2 className="home__greeting">Привет, {user.info?.first_name}!</h2>
          <h3 className="home__trophy-result">Твой лучший результат: {'123'}</h3>
          <nav className="home__nav">
            {links.map(item => (
              <MenuItem {...item} key={item.text} />
            ))}
          </nav>
        </div>
        <div className="home__right-side">место для видео</div>
      </div>
    </main>
  );
};

Home.displayName = 'Home';

export default withLayoutMain(Home);
