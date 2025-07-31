import axios from "../utils/axiosConfig.js";
import { useEffect, useState } from "react";
import InputField from "../components/InputFields.jsx"
import Button from "../components/Buttons.jsx"

import { useNavigate } from 'react-router-dom'; //temporary? idk

function Login() {
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });

useEffect(() => {
          axios.get('/protected', { withCredentials: true })
            .then(res => console.log('✅ JWT works:', res.data))
            .catch(err => console.log('❌ JWT failed:', err.response?.data || err.message));
        }, []);


        

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/login", formLogin, { withCredentials: true })
      .then(res => {
        console.log(res.data.message);
        alert(res.data.message); 
        navigate('/home');
      })
      .catch(err => {
        console.log(err.response?.data);
        alert("tingin ka sa console, andun error")
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Email"
          name="email"
          value={formLogin.email} 
          onChange={handleChange}
          placeholder="Enter student id oky? this is your username" 
        />
        <InputField 
          label="Password"
          name="password"
          value={formLogin.password} 
          onChange={handleChange}
          placeholder="Enter student id oky? this is your username" 
        />
        <a href="/forgot-password">Forgot Password?</a>
        <Button label="Login" type="submit" />
      </form>
    </div>
    </>
  )

}

export default Login;