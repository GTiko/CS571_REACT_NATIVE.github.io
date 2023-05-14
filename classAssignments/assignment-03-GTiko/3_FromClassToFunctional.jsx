import React, { useState } from "react";

const CounterComponent = (props) => <strong>{props.count}</strong>;

const MessageComponent = (props) => {
  console.log(`rendering MSG`);
  return <div>{props.message}</div>;
};

export default function FunctionalApp() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("my message goes here");

  const handleClick = () => setCount(count + 1);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <>
      <CounterComponent count={count} />
      <button type="button" onClick={handleClick}>
        Increase Count
      </button>
      <input type="text" value={value} onChange={handleChange} />
      <MessageComponent message={value} />
    </>
  );
}
