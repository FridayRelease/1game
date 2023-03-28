import { RootState } from '@/store';
import { useSelector } from 'react-redux';

function Home() {
  const hello = useSelector((state: RootState) => state.userReducer.hello);

  return (
    <div className="App">Вот тут будет жить ваше приложение :){hello}</div>
  );
}

export default Home;
