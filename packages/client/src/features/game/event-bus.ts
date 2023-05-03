type Callback = (...args: any) => void;

interface Bus {
  on(event: string, callback: Callback): void;
  off(event: string, callback: Callback): void;
  emit(event: string, ...args: []): void;
}

class EventBus implements Bus {
  private listeners: Array<{ name: string; callback: Callback }> = [];

  on(name: string, callback: Callback) {
    const listener = { name, callback };

    this.listeners.push(listener);
  }

  off(name: string, callback: Callback) {
    this.listeners = this.listeners.filter(listener => listener.callback !== callback && name !== listener.name);
  }

  emit(name: string, ...args: unknown[]) {
    this.listeners.forEach(listener => {
      if (listener.name === name) {
        listener.callback(...args);
      }
    });
  }
}

export { EventBus, type Bus, type Callback };

export default new EventBus();
