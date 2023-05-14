import { useContext, useReducer } from "react";
import { GLOBAL_CONTEXT } from "./GlobalContext";

function reducer(state, action) {
    switch (action.type) {
        case "SET_CHANGES": {
            return { ...state, [action.fieldName]: action.payload };
        }
        case "SET_SHOW_LIST": {
            return { ...state, showList: action.payload }
        }
        case "CLEAR_FIELD": {
            return { ...state, id: "", fName: "", lName: "" }
        }
        case "SET_UPDATE_FIELDS": {
            return { ...state, id: action.id, fName: action.fName, lName: action.lName }
        }
        default: {
            return state;
        }
    }
}

export default function ListStudents() {
    const { state, deleteStudent, updateStudent } = useContext(GLOBAL_CONTEXT);
    const [updatedField, dispatch] = useReducer(reducer, { id: "", fName: "", lName: "", showList: true })

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_CHANGES", fieldName: name, payload: value });
    };

    const editStudent = (id) => {
        const findItem = state.studentList.find(each => each.id === id);
        if (findItem) {
            dispatch({ type: "SET_UPDATE_FIELDS", id: findItem.id, fName: findItem.fName, lName: findItem.lName });
        }
        dispatch({ type: "SET_SHOW_LIST", payload: false });
    };

    const update = () => {
        const updatedStudentList = [...state.studentList];
        for (let each of updatedStudentList) {
            if (each.id === updatedField.id) {
                each.fName = updatedField.fName;
                each.lName = updatedField.lName;
                break;
            }
        }
        updateStudent(updatedStudentList);
        dispatch({ type: "CLEAR" });
        dispatch({ type: "SET_SHOW_LIST", payload: true });
    };

    return (
        <>
            <h1>{updatedField.showList ? "List of" : "Update"} Students</h1>
            {updatedField.showList ?
                <ul>
                    {state.studentList.map((each, index) => (
                        <li key={index}>
                            {each.fName} {each.lName}
                            <button onClick={() => deleteStudent(each.id)}>delete</button>
                            <button onClick={() => editStudent(each.id)}>edit</button>
                        </li>
                    ))}
                </ul> :
                <>
                    First Name &nbsp;
                    <input type="text" name="fName" value={updatedField.fName} onChange={handleChange} /> <br />
                    Last Name &nbsp;
                    <input type="text" name="lName" value={updatedField.lName} onChange={handleChange} /> <br />
                    <button onClick={update}>update</button>
                </>
            }
        </>
    );
}
