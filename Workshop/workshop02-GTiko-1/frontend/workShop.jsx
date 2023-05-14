import React, { useEffect, useReducer, useState } from "react";
import AddNewStudents from "./components/addNewStd";
import ListStudents from "./components/listStd";
import Welcome from "./components/welcome";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_HIDE": {
      return { ...state, showHide: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const GlobalContext = React.createContext();

export default function School() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("studentData")) || []
  );

  useEffect(() => {
    console.log("rendering ...data...");
    axios.get("http://localhost:4000/schools/:schoolId/students").then((res) => {
      localStorage.setItem("studentData", JSON.stringify(res.data));
    });
  }, []);

  const [state, dispatch] = useReducer(reducer, { showHide: true });

  const onShowHide = () => {
    dispatch({ type: "SHOW_HIDE", payload: !state.showHide });
  };

  return (
    <GlobalContext.Provider value={[data, setData]}>
      <Welcome name={"Gemechu Tiko"}/>
      <button onClick={onShowHide}>
        {state.showHide ? "Add New Student" : "List Students"}
      </button>
      {state.showHide ? <ListStudents /> : <AddNewStudents />}
    </GlobalContext.Provider>
  );
}
