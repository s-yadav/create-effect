# create-use-effect
A small utility to create custom hooks using useEffect

### Install
Through npm
`npm install create-effect --save`

## Creating Effects

### Interval effect (useInterval)
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



### Timeout effect (useTimeout)
```js
import createEffect from 'create-effect';

const useTimeout = createEffect((handler, delay) => {
  const timeout = setTimeout(handler, delay);

  return () => {
    clearTimeout(timeout);
  }
});
```

### Window event's effect (useWindowEvent)
```js
const useWindowEvent = createUseEffect((event, handler) => {
  window.addEventListener(event, handler);

  return () => {
    window.removeEventListener(event, handler);
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
