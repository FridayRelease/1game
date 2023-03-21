const PRESSED = 1;
const RELEASED = 0;

class KeyboardState {
  private keyStates = new Map<string, typeof PRESSED | typeof RELEASED>();
  private keyMap = new Map();

  addMapping(code: string, callBack: (keyState: number) => void) {
    this.keyMap.set(code, callBack);
  }

  handleEvent(event: KeyboardEvent) {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    this.keyStates.set(code, keyState);

    this.keyMap.get(code)(keyState);
  }

  listenTo(window: Window) {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event as KeyboardEvent);
      });
    });
  }
}

export { KeyboardState };
