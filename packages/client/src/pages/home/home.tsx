import { FC } from 'react';
import { userSelectors } from '@/features/authentication';
import { useSelector } from 'react-redux';
import Logotype from '../../assets/images/logotype.png';
import { cn } from '@/utils/cn';
import './home.scss';
import { Link } from 'react-router-dom';
import { ForumUrl, GameUrl, LeaderboardUrl, ProfileUrl } from '@/constant/router';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import { Icons } from '@/components/icon/icon';
import Icon from '@/components/icon';
import { LinkType } from '@/types/link';

const Home: FC = () => {
  const user = useSelector(userSelectors.user);

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
      url: '#',
      className: cn('home__link', 'home__link__bg-green'),
      icon: { type: Icons.Logout, className: cn('home__link-icon'), fill: 'var(--main-color-bg)' },
    },
    {
      text: 'старт',
      url: GameUrl,
      className: cn('home__link', 'home__link-start', 'home__link__bg-red'),
    },
  ];

  const listItems = links.map(({ url, className, text, icon }) => (
    <Link to={url} className={className} key={text}>
      {icon && <Icon type={icon.type} className={icon.className} fill={icon.fill} stroke={icon.stroke} />}
      {text}
    </Link>
  ));

  return (
    <main className="home">
      <div className="home__header">
        <img src={Logotype} alt="Battle city" className="home__logotype" />
      </div>
      <div className="home__content">
        <div className="home__left-side">
          <h2 className="home__greeting">Привет, {user.info?.first_name}!</h2>
          <h3 className="home__trophy-result">Твой лучший результат: {'123'}</h3>
          <nav className="home__nav">{listItems}</nav>
        </div>
        <div className="home__right-side">место для видео</div>
      </div>
    </main>
  );
};

Home.displayName = 'Home';

export default withLayoutMain(Home);
