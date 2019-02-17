export default function createUseEffect(effectCreator) {
  return (...args) => {
    const ref = useRef({});
    ref.current.args = args;

    const dependencies = args.filter(arg => typeof arg !== "function");

    useEffect(() => {
      const referencedArgs = args.map((arg, index) => {
        if (typeof arg === "function") {
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
