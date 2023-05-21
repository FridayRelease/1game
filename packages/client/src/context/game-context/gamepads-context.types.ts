export interface Gamepad {
  axes: Array<number>,
  buttons: Array<GamepadButton>,
  id: string,
}

export interface IStateGamepad {
  gamepad: Gamepad | undefined,
  current: number,
}

export interface GamepadsContextTypes extends IStateGamepad{
  hasGamepad: boolean;
}
