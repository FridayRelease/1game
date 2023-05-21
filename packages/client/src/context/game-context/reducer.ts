import { IStateGamepad } from '@/context/game-context/gamepads-context.types'

export type Action =
  | { type: 'ADD_GAMEPAD'; value: any }
  | { type: 'CURRENT'; value: number }

export const initialStateGamepadContext: IStateGamepad = {
  gamepad: undefined,
  current: 0,
};

export const reducerGamepad = (state: IStateGamepad, action: Action) => {
  switch (action.type) {
    case 'ADD_GAMEPAD':
      return {
        ...state,
        gamepad: action.value,
      };
    case 'CURRENT':
      return {
        ...state,
        current: action.value,
      };
    default:
      return state;
  }
};
