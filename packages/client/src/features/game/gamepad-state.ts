import { isEmptyObject } from '@/utils/functions'

class GamepadState {
  private keyMap = new Map();
  private _raf = window.requestAnimationFrame
  private gamepad: Record<string, string> = {};

  addMapping(code: string, callBack: (keyState: number) => void) {
    this.keyMap.set(code, callBack);
  }

  addGamepad = (gamepad: any) => {
    if (isEmptyObject(this.gamepad)) {
      this.gamepad = {
        buttons: gamepad.buttons,
        id: gamepad.id,
        axes: gamepad.axes
      }
    }
  };

  connectGamepadHandler = (e: GamepadEvent) => {
    this.addGamepad(e.gamepad);
  };


  init() {
    window.addEventListener("gamepadconnected", (e) => {
      this.connectGamepadHandler(e)
    });
  }

  listenTo() {
    const gamepad = navigator.getGamepads()[0];

    if (gamepad) {
      for (const key of this.keyMap.keys()) {
        if (gamepad.buttons[Number(key)].pressed) {
          this.keyMap.get(key)(gamepad.buttons[Number(key)].pressed)
        }
      }
    }

    setTimeout( () => {
      this._raf.call(window, this.listenTo.bind(this));
    }, 100);
  }
}

export { GamepadState };
