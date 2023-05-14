import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { GLOBAL_CONTEXT } from "./GlobalContext";

function reducer(state, action) {
    switch (action.type) {
        case "SET_FULL_NAME": {
            return { ...state, [action.filedName]: action.payload };
        }
        case "CLEAR_INPUTS": {
            return { ...state, fName: "", lName: "" };
        }
        default: {
            return state;
        }
    }
}

export default function AddStudent() {
    const { addNewStudent } = useContext(GLOBAL_CONTEXT);
    const [id, setId] = useState((Math.floor(Math.random() * 991) + 10))
    const idRef = useRef();

    const [state, dispatch] = useReducer(reducer, { fName: "", lName: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FULL_NAME", filedName: name, payload: value })
    }

    useEffect(() => {
        idRef.current = setInterval(() => {
            console.log("id generated...");
            setId(Math.floor(Math.random() * 991) + 10);
        }, 1000)
        return () => clearInterval(idRef.current);
    });

    const handleSubmit = () => {
        addNewStudent({ id: id, ...state });
        dispatch({ type: "CLEAR_INPUTS" });
    }

    return (
        <>
            <h1>Add New Student</h1>
            First Name &nbsp;
            <input type="text" name="fName" value={state.fName} onChange={handleChange} /> <br />
            Last Name &nbsp;
            <input type="text" name="lName" value={state.lName} onChange={handleChange} /> <br />
            <button onClick={handleSubmit}>Add student</button>
        </>
    );
}
