import { useContext, useState } from "react";
import { GLOBAL_CONTEXT } from "./GlobalContext";
import ListStudents from "./ListStd";
import AddStudent from "./Add";

export default function Welcome() {
    const { state } = useContext(GLOBAL_CONTEXT);
  
    const [showHide, setShowHide] = useState(true);

    const handleShowHide = () => {
        setShowHide(!showHide);
    }

    return (
        <>
            <h1> Welcome {state.fName} {state.lName}</h1>
            <button onClick={handleShowHide}>
                {showHide ? "Add new student" : "List of students"}
            </button>
            {showHide ? <ListStudents /> : <AddStudent />}
        </>
    );
}
