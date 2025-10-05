import axios from "../utils/axiosConfig.js";
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  const [message, setMessage] = useState(""); // ✅ success message
  const [error, setError] = useState(""); // ✅ error message

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/forgot-password/request-otp', { email: form.email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      console.error(err.message);
      setError("Network or server error");
      setMessage("");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('/forgot-password/verify-otp', { email: form.email, code });
      setMessage(res.data.message);
      setError("");
      setIsVerified(true);
    } catch (err) {
      console.log(err.response?.data);
      setError("Invalid OTP");
      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isVerified) return alert("Verify your email first");
    if (form.password !== form.retypePassword) return setError("Passwords do not match");

    try {
      const res = axios.post('/forgot-password/reset', { 
        email: form.email, 
        newPassword: form.password 
      });
      console.log(res.data.message);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);//1 sec
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message);
    }
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