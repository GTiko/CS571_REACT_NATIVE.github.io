import { useContext } from "react";
import {GlobalContext} from "../workShop"
import axios from "axios";

export default function ListStudents() {

    const [data, setData] = useContext(GlobalContext);

    const deleteStd = async (id) => {
        const remainingStd = data.filter(std => std._id !== id);
        setData(remainingStd);
        localStorage.setItem("studentData", JSON.stringify(remainingStd));

        const result = await axios.delete(`http://localhost:4000/schools/:schoolId/students/${id}`);
        console.log(result);
    }

  return (
    <center>
    <h1>Student of List</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((std, index)=>
                <tr key={index}>
                    <td>{std.name}</td>
                    <td>{std.email}</td>
                    <td><button onClick={()=>{deleteStd(std._id)}}>delete</button></td>
                </tr>
            )}
        </tbody>
    </table>
    </center>
  );
}
