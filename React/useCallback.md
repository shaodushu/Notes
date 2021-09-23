### 避免子组件重复渲染

```react
import { useCallback, useState, memo } from "react";

const Demo = memo((props) => {
  console.log("demo");
  return <div onClick={props.onClick}>children</div>;
});

export default function App() {
  const [state, setState] = useState(0);
  console.log(state);

  const onClick = useCallback(() => {
    console.log("app");
  }, []);

  return (
    <div className="App">
      <h2>{state}</h2>
      <button onClick={() => setState((v) => ++v)}>+</button>
      <Demo onClick={onClick} />
    </div>
  );
}
