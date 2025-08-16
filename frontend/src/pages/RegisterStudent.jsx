import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import InputField from "../components/InputFields.jsx"
import RadioButton from "../components/RadioButton.jsx";
import SelectField from "../components/SelectFields.jsx";
import Button from '../components/Buttons.jsx';

function RegisterStudent() {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    username: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
    userGender: "",
    college: ""
  });

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState(""); //otp
  const username = formRegister.username;

  const handleSendOtp = async () => {
    try { // did not use axiosConfig here so it's the full url
      const res = await axios.post("http://localhost:3000/api/student/register/email-otp", { username: username });
      alert(res.data.message);
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/student/register/verify-otp", { username, code });
      alert(res.data.message);
      setIsVerified(true);
    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) return alert("Verify your email first");

    if (formRegister.password !== formRegister.retypePassword) return alert("Passwords do not match");

    axios.post("http://localhost:3000/api/student/register/user-info", formRegister)
      .then(res => {
        console.log(res.data.message);
        alert(res.data.message);
        navigate("/login");
      })
      .catch(err => {
        console.log(err.response?.data);
      });
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
      {!isVerified ? (
        <>
        <InputField 
          label="School Id"
          name="username"
          value={formRegister.username} 
          onChange={handleChange}
          placeholder="Enter student id" 
          disabled={isVerified}
        />
        <Button onClick={handleSendOtp} label='Send OTP' disabled={isVerified}/>
        <InputField 
            name="code" //otp
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter OTP"
            disabled={isVerified}
          />
          <Button onClick={handleVerifyOtp} label='Verify' disabled={isVerified}/>
        </>
        
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2> Registration Form </h2>
            <InputField 
              label="Email"
              name="email"
              value={`${formRegister.username}@pampangastateu.edu.ph`}
              placeholder="Enter your first name"
              disabled={true}
            /> 
            <InputField 
              label="Password"
              name="password"
              value={formRegister.password}
              onChange={handleChange}
              placeholder="Enter your password"
            /> 
            <InputField 
              label="Re-type Password"
              name="retypePassword"
              value={formRegister.retypePassword}
              onChange={handleChange}
              placeholder="Re-type your password"
            /> 
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
              label="College Department"
              name="college"
              value={formRegister.college}
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
              label="Gender"
              name="userGender"
              value={formRegister.userGender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" }
              ]}
            />
            <Button type="submit" label='Submit Registration idk'/>
            {/* triggers <form onSubmit={handleSubmit}/> */}
          </form>
        </>
      )}
    </>
  );
}
export default RegisterStudent;