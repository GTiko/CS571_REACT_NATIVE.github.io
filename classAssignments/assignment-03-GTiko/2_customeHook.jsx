const { useState } = require("react");

function useForm() {
  const [info, setInfo] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { value, name } = e.target;

    setInfo((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  return [info, handleChange];
}

const CustomHook = () => {
  const [formValues, handleChange] = useForm({ email: "", password: "" });
  console.log(formValues);
  return (
    <div>
      <input
        name="email"
        placeholder="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formValues.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomHook;
