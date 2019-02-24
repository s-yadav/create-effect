# create-effect
A small utility to create custom hooks with effects without worrying about the current scope. 

### Install
Through npm
`npm install create-effect --save`

## API
```js
const useCustomEffectHook = createEffect(effectDefinition, addDependencies);
```
- `effectDefinition`: A function which matches the definition of the API for which you are creating effect hook for. It should return a function which will be used to cleanup the effect. See example for the [useInterval hook](https://github.com/s-yadav/create-effect#interval-effect-useinterval)

- `addDependencies` (Default to true): By default it will figure out dependencies by the arguments you pass on the effectDefinition. If there are no dependencies on the argument, it will use an empty array as dependency causing effect to run only on the first render(mount). With addDependencies as false you can tell the createEffect that this effect has to run after each render. 


## Creating Effect Hooks

### Interval hook (useInterval)
```js
import createEffect from 'create-effect';

const useInterval = createEffect((handler, delay) => {
  const interval = setInterval(handler, delay);

  return () => {
    clearInterval(interval);
  }
});
```

### useInterval example 
```js
export default function TestUseInterval() {
  const [delay, setDelay] = useState(1000);

  const [currentTime, updateTime] = useState(new Date().toLocaleTimeString());

  useInterval(() => {
    updateTime(new Date().toLocaleTimeString());
  }, delay);

  return (
    <div>
      {currentTime}{" "}
      <button onClick={() => setDelay(delay + 1000)}>Update Delay</button>
    </div>
  );
}
```



### Timeout hook (useTimeout)
```js
import createEffect from 'create-effect';

const useTimeout = createEffect((handler, delay) => {
  const timeout = setTimeout(handler, delay);

  return () => {
    clearTimeout(timeout);
  }
});
```

### Window event's hook (useWindowEvent)
```js
const useWindowEvent = createEffect((event, handler, captureMode) => {
  window.addEventListener(event, handler, captureMode);

  return () => {
    window.removeEventListener(event, handler, captureMode);
  };
});
```

#### useWindowEvent example
```js
function App() {
  const [open, setOpen] = useState(false);

  useWindowEvent("click", handle() => {
    setOpen(!open);
  });

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <h2>{String(open)}</h2>
    </div>
  );
}
```

### Why not just useEffect?
Check this out, [https://overreacted.io/making-setinterval-declarative-with-react-hooks/](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

### Like it?
[:star: this repo](https://github.com/s-yadav/create-effect)
