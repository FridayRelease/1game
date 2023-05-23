import React, { createContext, ReactNode, useEffect, useReducer, useRef } from 'react'
import useInterval from '@/hooks/use-interval'
import { initialStateGamepadContext, reducerGamepad } from '@/context/game-context/reducer'
import { GamepadsContextTypes } from '@/context/game-context/gamepads-context.types'

const GamepadsContext = createContext({} as GamepadsContextTypes);

const GamepadsProvider = ({ children }: { children: ReactNode }) => {
  const haveEvents = 'ongamepadconnected' in window
  const rAF = window.requestAnimationFrame;
  const requestRef = useRef<any>();
  const [state, dispatch] = useReducer(reducerGamepad, initialStateGamepadContext)

  const updateLoop = () => {
    const gp = navigator.getGamepads()[0];

    if (gp) {
      switch (true) {
        case gp.buttons[0].pressed:
          break;
        default:
          break;
      }

      setTimeout(() => rAF(updateLoop), 150);
    }
  }

  const addGamepad = (gamepad: globalThis.Gamepad) => {
    if (gamepad) {
      dispatch({ type: 'ADD_GAMEPAD', value: {
          buttons: gamepad.buttons,
          id: gamepad.id,
          axes: gamepad.axes
        }
      })
    }
  };

  const connectGamepadHandler = (e: GamepadEvent) => {
    addGamepad(e.gamepad);
  };

  const scanGamepads = () => {
    const detectedGamepads = navigator.getGamepads ? navigator.getGamepads() : []

    if (detectedGamepads[0]) addGamepad(detectedGamepads[0])
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", (e) => {
      connectGamepadHandler(e)
    });

    return window.removeEventListener("gamepadconnected", connectGamepadHandler);
  }, []);


  const animate = () => {
    if (!haveEvents) scanGamepads();
    requestRef.current = requestAnimationFrame(animate);
    updateLoop()
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);


  useInterval(() => {
    if (!haveEvents) scanGamepads();
  }, 1000);

  const core: GamepadsContextTypes = {
    ...state,
    hasGamepad: !!(state.gamepad && Object.keys(state.gamepad).length)
  }

  return (
    <GamepadsContext.Provider value={core}>
      { children }
    </GamepadsContext.Provider>
  );
};

export { GamepadsProvider, GamepadsContext };
