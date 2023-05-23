export interface Gamepad {
  axes: readonly number[],
  buttons: readonly GamepadButton[],
  id: string,
}

export interface IStateGamepad {
  gamepad?: Gamepad,
  current: number,
}

export interface GamepadsContextTypes extends IStateGamepad{
  hasGamepad: boolean;
}
