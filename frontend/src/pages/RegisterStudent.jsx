import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import InputField from "../components/InputFields.jsx"
import SelectField from "../components/SelectFields.jsx";
import Button from '../components/Buttons.jsx';
import RadioButtonGender from '../components/RadioButtonGender.jsx';

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
  const [sentOTP, setSentOTP] = useState(false);
  const username = formRegister.username;

  const handleSendOtp = async () => {
    try { // did not use axiosConfig here so it's the full url
      const res = await axios.post("http://localhost:3000/api/student/register/email-otp", { username: username });
      alert(res.data.message);

      if (res.data.isItSent) { //from backend res.json.. if message is sent
        setSentOTP(true);
      }
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
        !sentOTP ? (
          <div className='page-s-registration'>
            <div className="container" id="otp-code-container">
              <h1>OTP Verification</h1>
              <button type="button" className='back-button'> ← </button>
              <div className="form-group">
                <InputField 
                  label="School Id"
                  name="username"
                  id="school-id"
                  value={formRegister.username} 
                  onChange={handleChange}
                  placeholder="Enter student id" 
                  disabled={isVerified}
                />
              </div>
            <Button type="button" onClick={handleSendOtp} label='Send OTP' disabled={isVerified}/>
          </div>
        </div>
        ) : (
          <div className='page-s-registration'>
            <div className='container' id='otp-code-container'>
              <button type="button" className='back-button'> ← </button>
              <div className="form-group">
                <InputField 
                  label="OTP Code"
                  name="code" //otp
                  id="otp-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter OTP"
                  disabled={isVerified}
                />
              </div>
              <p className="resend-link">
                <a href="#" id="resend-otp">Didn't get a code? Resend</a>
              </p>
              <Button type="button" onClick={handleVerifyOtp} label='Verify' disabled={isVerified}/>
            </div>
          </div>
        )
      ) : (
        <div className='page-s-registration'>
          <div className="container" id="registration-container" >
          <h1> Registration Form </h1>
          <form id="registration-form" onSubmit={handleSubmit}>  
            <InputField 
              label="Email"
              name="email"
              id="email"
              type="email"
              value={`${formRegister.username}@pampangastateu.edu.ph`}
              placeholder="Enter Student ID"
              disabled={true}
            /> 
            <InputField 
              label="Password"
              name="password"
              id="password" 
              type="password"
              value={formRegister.password}
              onChange={handleChange}
              placeholder="Enter your password"
            /> 
            <InputField 
              label="Re-type Password"
              name="retypePassword"
              id="retype-password"
              value={formRegister.retypePassword}
              onChange={handleChange}
              placeholder="Re-type your password"
            /> 

            <div class="name-group">
              <InputField 
                label="First Name"
                name="firstName"
                id="first-name" 
                value={formRegister.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              /> 
              <InputField 
                label="Last Name"
                name="lastName"
                id="last-name" 
                value={formRegister.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>

            <div className='form-group'>
              <RadioButtonGender
                divClassName="form-group"
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
            </div>
            <SelectField
              divClassName="form-group"
              label="College Department"
              name="college"
              id="options"  
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
            
            <Button type="submit" label='Submit Registration idk'/>
            {/* triggers <form onSubmit={handleSubmit}/> */}
          </form>
          </div>
        </div>
      )}
    </>
  );
}
export default RegisterStudent;