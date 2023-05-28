import './toggle-theme.scss';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions, themeSelectors } from '@/store/slices/theme-slice';
import { Themes } from './types';
import useTheme from '@/hooks/use-theme';
import { useEffect, useRef } from 'react';
import { getLocalStorage } from '@/utils/local-storage';
import { setSelectedAttribute } from '@/utils/set-selected-attribute';

const ToggleTheme = () => {
  const theme = useSelector(themeSelectors.theme);
  const dispatch = useDispatch();
  const selectRef = useRef(null);

  useTheme();

  // Switching theme.
  useEffect(() => {
    // Handling the storage event is necessary to switch the theme in multiple tabs.
    const handler = () => {
      const theme = getLocalStorage('theme');
      dispatch(themeActions.setTheme(theme.value));

      const selectThemeElement = selectRef.current;
      setSelectedAttribute(selectThemeElement, theme.value);
    };

    globalThis.addEventListener('storage', handler);

    return () => globalThis.removeEventListener('storage', handler);
  }, []);

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(themeActions.setTheme(event.target.value));
  }

  const itemList = Object.values(Themes).map(value => {
    return (
      <option className="toggle-theme__option" value={value} key={value}>
        {value}
      </option>
    );
  });

  return (
    <select id="theme-picker" className="toggle-theme" onChange={handleClick} value={theme.value} ref={selectRef}>
      {itemList}
    </select>
  );
};

export default ToggleTheme;
