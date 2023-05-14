import React, { useContext, useEffect, useState } from "react";

const myContext = React.createContext();

export default function UpdateMessageComponent() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("my message goes here");

  const handleClick = () => setCount(count + 1);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <myContext.Provider value={{ count, value }}>
      <CounterComponent />
      <button type="button" onClick={handleClick}>
        Increase Count
      </button>
      <input type="text" value={value} onChange={handleChange} />
      <MessageComponent />
    </myContext.Provider>
  );
}

const CounterComponent = () => {
  const { count } = useContext(myContext);
  return <strong>{count}</strong>;
};

const MessageComponent = () => {
  const { value } = useContext(myContext);
  useEffect(() => {
    console.log(`rendering MSG`);
  }, [value]);
  return <div>{value}</div>;
};
