import axios from "../utils/axiosConfig.js";
import { useState } from 'react';

//components
import Button from "../components/Buttons.jsx";
import InputField from "../components/InputFields.jsx";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    retypePassword: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState(""); //otp

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/forgot-password/request-otp', { email: form.email });
      alert(res.data.message);
    } catch (err) {
        console.error(err.message);
        alert("Network or server error")
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('/forgot-password/verify-otp', { email: form.email, code });
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

    if (form.password !== form.retypePassword) return alert("Passwords do not match");

    axios.post('/forgot-password/reset', { 
      email: form.email, 
      newPassword: form.password })
      .then(res => {
        console.log(res.data.message);
        alert(res.data.message);
        setTimeout(() => navigate("/login"), 1000);//1 sec
      })
      .catch(err => {
        console.log(err.response?.data);
        alert(err.response?.data?.message);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/*{!isVerified ? ( */}
        <>
        <p> Forgot Password </p>
        <label>Email</label>
        <InputField 
          name="email"
          value={form.email} 
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <Button label="Send OTP" onClick={handleSendOtp} />
        <label>OTP</label>
        <InputField 
          name="code"
          value={code} 
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter OTP"
        />
        <Button label="Verify" onClick={handleVerifyOtp} />
        </>
      {/* ) : ( */}
        <>
        <label>password</label>
        <InputField 
          name="password"
          value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
        <label>re-type password</label>
        <InputField 
          name="retypePassword"
          value={form.retypePassword} 
          onChange={(e) => setForm({ ...form, retypePassword: e.target.value })}
          placeholder="Confirm Password"
        />
        <Button label="Reset Password" onClick={handleSubmit} />
        </>
      {/* )} */}
      
    </>
  )
}

export default ForgotPassword;