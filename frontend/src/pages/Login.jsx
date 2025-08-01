import axios from "../utils/axiosConfig.js";
import { useEffect, useState } from "react";
import InputField from "../components/InputFields.jsx"
import Button from "../components/Buttons.jsx"
import { useAuth } from "../context/AuthContext.jsx";

import { useNavigate } from 'react-router-dom'; //temporary? idk

function Login() {
  const navigate = useNavigate();
  const { setAccessToken, setUser, accessToken } = useAuth();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });

          useEffect(() => {
            if (!accessToken) return;
            axios.get('/protected',  {
              headers: {
                Authorization: `Bearer ${accessToken}`
            }});
          }, [accessToken]);


        

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/login", formLogin, { withCredentials: true })
      .then(res => {
        const token = res.data.accessToken; //get token from backend

        setAccessToken(token); //store token in global context
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      
        setUser({ //store user info in context
          fullName: res.data.user.fullName,
          user_id: res.data.user.id,
          school_id: res.data.user.school_id,
          role: res.data.user.role
        });     

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