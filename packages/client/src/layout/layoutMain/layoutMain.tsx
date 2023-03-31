import React, { ComponentType } from 'react';
import './layoutMain.scss';

/**
 * HOC основного лейаута
 *
 * @category HOC
 */
function withLayoutMain<T extends object>(Component: ComponentType<T>) {
  return (props: T) => {
    return (
      <div className="layout-main">
        <p className="layout-main__label">
          <a href="https://github.com/FridayRelease/1game" target="_blank" className="layout-main__link">
            Friday release
          </a>{' '}
          /
          <a href="https://practicum.yandex.ru/middle-frontend/" className="layout-main__link">
            {' '}
            yandex 23
          </a>
        </p>
        <div className="layout-main__content">
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export default withLayoutMain;
