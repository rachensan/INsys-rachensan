import axiosLib  from 'axios';

console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);

const axios = axiosLib .create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //http://localhost:3000/api (.env)
  withCredentials: true, 
});

export default axios;
