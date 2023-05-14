import { useEffect, useReducer } from "react";
import { GLOBAL_CONTEXT } from "./GlobalContext";
import Welcome from "./Welcome";

const KEY = "STUDENT_DATA";

function reducer(state, action) {
    switch (action.type) {
        case "SET_FULL_NAME": {
            return { ...state, [action.fieldName]: action.payload }
        }
        case "SHOW_MAIN": {
            return { ...state, showMain: action.payload }
        }
        case "LOAD_DATA": {
            return { ...state, studentList: action.payload }
        }
        default: {
            return state;
        }
    }
}

export default function Main() {
    const [state, dispatch] = useReducer(reducer, { fName: "", lName: "", showMain: true, studentList: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FULL_NAME", fieldName: name, payload: value })
    }
    const submitFullName = () => {
        dispatch({ type: "SHOW_MAIN", payload: false });
    }
    useEffect(() => {
        const stdData = JSON.parse(localStorage.getItem(KEY));
        if (stdData) {
            dispatch({ type: "LOAD_DATA", payload: stdData });
        }
    }, []);

    const addNewStudent = (studentObj) => {
        const newData = [...state.studentList];
        newData.push(studentObj);
        dispatch({ type: "LOAD_DATA", payload: newData });
        localStorage.setItem(KEY, JSON.stringify(newData));
    }
    const deleteStudent = (id) => {
        const remainingStudents = state.studentList.filter((each) => each.id !== id);
        dispatch({ type: "LOAD_DATA", payload: remainingStudents });
        localStorage.setItem(KEY, JSON.stringify(remainingStudents));
    }
    const updateStudent = (updatedData) => {
        dispatch({ type: "LOAD_DATA", payload: updatedData });
        localStorage.setItem(KEY, JSON.stringify(updatedData));
    }

    return (
        <GLOBAL_CONTEXT.Provider value={{ state, dispatch, addNewStudent, deleteStudent, updateStudent }}>
            {state.showMain ?
                <>
                    <h1>Login</h1>
                    First Name &nbsp;
                    <input type="text" name="fName" value={state.fName} onChange={handleChange} /> <br />
                    Last Name &nbsp;
                    <input type="text" name="lName" value={state.lName} onChange={handleChange} /> <br />
                    <button onClick={submitFullName}>submit</button>
                </>
                : <Welcome />
            }
        </GLOBAL_CONTEXT.Provider>
    )
}
