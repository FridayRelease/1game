import { FC } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import Logotype from '../../assets/images/logotype.png';
import { cn } from '@/utils/cn';
import LeaderboardList from '@/components/leaderboard-list';
import './leaderboard.scss';

/**
 * Страница лидерборда
 *
 * @category page
 */
const Leaderboard: FC = () => {
  return (
    <div className="leaderboard">
      <main className={cn('main', 'container', 'leaderboard__container')}>
        <img src={Logotype} alt="Battle city" className="leaderboard__logotype" />
        <h1 className="leaderboard__title">лидерборд</h1>
        <LeaderboardList />
      </main>
    </div>
  );
};

Leaderboard.displayName = 'Leaderboard';

export default withLayoutMain(Leaderboard);
