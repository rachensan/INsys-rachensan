import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import axios from "../utils/axiosConfig.js";
import { useAuth } from '../context/AuthContext.jsx';

function LogoutButton() {
  
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const handleLogout = () => {
    axios.post("/logout", {}, { withCredentials: true })
      .then(res => {
        console.log(res.data.message);
        setAccessToken(null); //clear token
        setUser(null); //clear user
        navigate("/login"); //redirect to login page
      })
      .catch(err => console.error(err));
  };

  return (
    <>
    <Button label="Logout" onClick={handleLogout} />
    </>
  )
}

export default LogoutButton;