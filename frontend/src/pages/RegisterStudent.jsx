import axios from 'axios';
import { useEffect, useState } from "react";
import InputField from "../components/InputFields.jsx"
import RadioButton from "../components/RadioButton.jsx";
import SelectField from "../components/SelectFields.jsx";

function RegisterStudent() {
  const [formRegister, setFormRegister] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    userGender: "",
    college: ""
  });

  const handleSubmit = (e) => { //i just grabbed this from my old shyt
    e.preventDefault();

    console.log(formRegister);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
    <InputField 
        label="School Id"
        name="username"
        value={formRegister.username} 
        onChange={handleChange}
        placeholder="Enter student id" 
    />
    <button>Verify</button>
    <form onSubmit={handleSubmit}>
      <h2> Registration Form </h2>
      <InputField 
        label="First Name"
        name="firstName"
        value={formRegister.firstName}
        onChange={handleChange}
        placeholder="Enter your first name"
      /> 
      <InputField 
        label="Last Name"
        name="lastName"
        value={formRegister.lastName}
        onChange={handleChange}
        placeholder="Enter your last name"
      />
      <SelectField
        label="Gender"
        name="userGender"
        value={formRegister.userGender}
        onChange={handleChange}
        options={[
          { label: "CCS", value: "CCS" },
          { label: "CEA", value: "CEA" },
          { label: "CBA", value: "CBA" },
          { label: "CHM", value: "CHM" },
          { label: "GA", value: "GA" }
        ]}
      />
      <RadioButton
        label="College Department"
        name="college"
        value={formRegister.college}
        onChange={handleChange}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ]}
      />
    </form>
    
    </>
  );
}
export default RegisterStudent;