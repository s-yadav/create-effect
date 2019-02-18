import { useRef, useEffect } from 'react';

export default function createEffect (effectCreator, addDependencies = true) {
  return (...args) => {
    const ref = useRef({});
    ref.current.args = args;

    const dependencies = addDependencies
      ? args.filter(arg => typeof arg !== 'function') : undefined;

    useEffect(() => {
      const referencedArgs = args.map((arg, index) => {
        if (typeof arg === 'function') {
          return (...handleArgs) => {
            ref.current.args[index](...handleArgs);
          };
        }

        return arg;
      });

      return effectCreator(...referencedArgs);
    }, dependencies);
  };
}
