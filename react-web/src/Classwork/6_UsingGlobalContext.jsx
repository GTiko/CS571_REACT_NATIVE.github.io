import React, { useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SET_COUNT": {
      return { ...state, count: action.payload };
    }
    case "SET_VALUE": {
      return { ...state, value: action.payload };
    }
    default: {
      return state;
    }
  }
}

const myContext = React.createContext();

export default function UsingGlobalContext() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    value: "my message goes here",
  });

  const handleClick = () =>
    dispatch({ type: "SET_COUNT", payload: state.count + 1 });
  const handleChange = (e) =>
    dispatch({ type: "SET_VALUE", payload: e.target.value });

  return (
    <myContext.Provider value={{ state }}>
      <CounterComponent />
      <button type="button" onClick={handleClick}>
        Increase Count
      </button>
      <input type="text" value={state.value} onChange={handleChange} />
      {<MessageComponent value={state.value} />}
    </myContext.Provider>
  );
}

const CounterComponent = () => {
  const { state } = useContext(myContext);
  return <strong>{state.count}</strong>;
};

const MessageComponent = React.memo((props) => {
  console.log(`rendering MSG`);
  return <div>{props.value}</div>;
});
