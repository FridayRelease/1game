import './toggle-theme.scss';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions, themeSelectors } from '@/store/slices/theme-slice';

const ToggleTheme = () => {
  const theme = useSelector(themeSelectors.theme);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(themeActions.toggleTheme());
  }

  return (
    <label id="switch" className="switch">
      <input id="slider" type="checkbox" onChange={handleClick} checked={theme.isLightTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleTheme;
