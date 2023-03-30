import { userSelectors } from '@/features/authentication';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector(userSelectors.user);

  return (
    <div className="App">
      Вот тут будет жить ваше приложение :)
      <h2>{user.info?.first_name}</h2>
    </div>
  );
}

export default Home;
