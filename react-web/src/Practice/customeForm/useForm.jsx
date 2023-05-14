import { useState } from "react";

function useForm() {
  const [fullName, setFullName] = useState({ fName: "", lName: "" });
  function handleChange(e) {
    const { value, name } = e.target;
    setFullName((preValue) => ({...preValue, [name]: value}));
  }
  return [fullName, handleChange];
}

function CustomForm() {
  const [fullName, handleChange] = useForm();
  return (
    <>
      {fullName.fName} {fullName.lName} <br />
      <input
        type="text"
        name="fName"
        value={fullName.fName}
        onChange={handleChange}
      />{" "}
      <br />
      <input
        type="text"
        name="lName"
        value={fullName.lName}
        onChange={handleChange}
      />
    </>
  );
}

export default CustomForm;
