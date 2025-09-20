import axios from 'axios'; //did not use axiosConfig here so use the full url
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import InputField from "../components/InputFields.jsx"
import SelectField from "../components/SelectFields.jsx";
import Button from '../components/Buttons.jsx';
import RadioButtonGender from '../components/RadioButtonGender.jsx';

function RegisterTeacher() {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    username: "",
    schoolId: "",
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
    try {
      const res = await axios.post("http://localhost:3000/api/teacher/register/email-otp", { username: username });
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
      const res = await axios.post("http://localhost:3000/api/teacher/register/verify-otp", { username, code });
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
  
    axios.post("http://localhost:3000/api/teacher/register/user-info", formRegister)
      .then(res => {
        if (res.status === 201) {
          console.log(res.data.message);
          alert(res.data.message);
          navigate("/login");
        } else { 
          alert(res.data.message); //show error, no navigate
        }
      })
      .catch(err => {
        console.log(err.response?.data);
        alert(err.response?.data?.message || "Something went wrong");
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
              <Button className="back-button" label="←" onClick={() => navigate(-1)} />
              <div className="form-group">
                <label>Username</label>
                <InputField 
                  name="username"
                  value={formRegister.username} 
                  onChange={handleChange}
                  placeholder="Enter school id" 
                  disabled={isVerified}
                />
              </div>
            <Button onClick={handleSendOtp} label='Send OTP' disabled={isVerified}/>
          </div>
        </div>
        ) : (
          <div className='page-s-registration'>
            <div className='container' id='otp-code-container'>
              <Button className="back-button" label="←" onClick={() => setSentOTP(false)} />
              <div className="form-group">
                <label>OTP Code</label>
                <InputField 
                  name="code" //otp
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter OTP"
                  disabled={isVerified}
                />
              </div>
              <p className="resend-link">
                <a href="#" id="resend-otp">Didn't get a code? Resend</a>
              </p>
            <Button onClick={handleVerifyOtp} label='Verify' disabled={isVerified}/>
            </div>
          </div>
        )
    ) : (
      <div className='page-s-registration'>
        <div className="container" id="registration-container" >
        <h1> Registration Form </h1>
        <form id="registration-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <InputField 
            name="email"
            value={`${formRegister.username}@pampangastateu.edu.ph`}
            placeholder="Enter your first name"
            disabled={true}
          /> 
          <label>Password</label>
          <InputField 
            name="password"
            value={formRegister.password}
            onChange={handleChange}
            placeholder="Enter your password"
          /> 
          <label>Re-type Password</label>
          <InputField 
            name="retypePassword"
            value={formRegister.retypePassword}
            onChange={handleChange}
            placeholder="Re-type your password"
          /> 

          <div class="name-group">
            <label>First Name</label>
            <InputField 
              name="firstName"
              value={formRegister.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            /> 
            <label>Last Name</label>
            <InputField 
              name="lastName"
              value={formRegister.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <label>School ID</label>
          <InputField 
            name="schoolId"
            value={formRegister.schoolId}
            onChange={handleChange}
            placeholder="Enter your school ID"
          /> 

          <div className='form-group'>
            <RadioButtonGender
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
          
          <Button type="submit" label='Submit Registration idk'/>
        </form>
        </div>
      </div>
    )}
    </>
  );
}
export default RegisterTeacher;