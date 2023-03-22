type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, boolean | undefined | null>;

type Argument = Value | Mapping | Array<Value>;

function cn(...args: Argument[]): string {
  const list = args.reduce((prev: string[], current: Argument) => {
    if (typeof current === 'string') {
      return [...prev, current];
    }
    if (typeof current === 'number' && current !== 0) {
      return [...prev, String(current)];
    }
    if (Array.isArray(current)) {
      return [...prev, ...current.map(a => cn(a))];
    }
    if (typeof current === 'object' && current !== null) {
      const keys = Object.keys(current).filter(
        key =>
          Object.prototype.hasOwnProperty.call(current, key) &&
          current[key] === true
      );
      return prev.concat(keys);
    }

    return prev;
  }, []);

  return list.join(' ').trim();
}

export { cn };
