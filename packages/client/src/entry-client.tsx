import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { store } from './store/store';
import { GamepadsProvider } from '@/context/game-context/gamepads-context'
import Gamepad from '@/components/gamepad'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <GamepadsProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Gamepad />
          <App />
        </BrowserRouter>
      </Provider>
    </GamepadsProvider>
  </React.StrictMode>
);
