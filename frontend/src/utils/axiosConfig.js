import axiosLib  from 'axios';

console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);

const axios = axiosLib .create({
  baseURL: import.meta.env.VITE_API_BASE_URL, //(.env)
  withCredentials: true, 
});
console.log("Axios instance baseURL:", axios.defaults.baseURL);


export default axios;
