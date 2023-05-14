import { useEffect, useRef, useState } from "react";
export default function AppCounter() {
  const [showHide, setShowHide] = useState(true);
  const onShowHide = () => {
    setShowHide(!showHide);
  };
  return (
    <>
      <button onClick={onShowHide}>show/hide</button>
      {showHide ? <Counter /> : null}
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(1);
  const countRef = useRef();

  const onBtnClicked = () => {
    countRef.current = setInterval(() => {
      console.log("count");
      setCount(count++);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(countRef.current);
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onBtnClicked}>start</button>
    </div>
  );
}
