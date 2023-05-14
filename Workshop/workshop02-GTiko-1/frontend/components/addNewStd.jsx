import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { GlobalContext } from "../workShop"
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "SET_STUDENT": {
            return { ...state, [action.filedName]: action.payload };
        }
        default: {
            return state;
        }
    }
}

export default function AddNewStudents() {
    const [data] = useContext(GlobalContext);
    const [state, dispatch] = useReducer(reducer, { name: "", email: "" });
    const [id, setId] = useState(Math.floor(Math.random() * 991) + 10);
    const countRef = useRef();
    
    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({ type: "SET_STUDENT", filedName: name, payload: value });
    }

    useEffect(() => {
        countRef.current = setInterval(() => {
            console.log("rendering...on random number....");
            setId(Math.floor(Math.random() * 991) + 10);
        }, 5000);

        return () => {
            clearInterval(countRef.current);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verify = data.find((item) => item.email === state.email);
        if (!verify) {
            data.push({ _id: id, ...state });
            localStorage.setItem("studentData", JSON.stringify(data));

            axios.post("http://localhost:4000/schools/:schoolId/students", { _id: id, ...state });

        } else {
            alert("already exist");
        }
    };

    return (
        <>
        <h1>Add new Student</h1>
            <form onSubmit={handleSubmit}>
                <input
                    disabled
                    type="text"
                    name="id"
                    value={id}
                    placeholder="Id"
                /> <br />
                <input
                    required
                    type="text"
                    name="name"
                    value={state.name}
                    placeholder="name"
                    onChange={handleChange}
                /> <br />
                <input
                    required
                    type="text"
                    name="email"
                    value={state.email}
                    placeholder="email"
                    onChange={handleChange}
                /> <br />
                <button onSubmit={handleSubmit}>submit</button>
            </form>
        </>
    );
}
