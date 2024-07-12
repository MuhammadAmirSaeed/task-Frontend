
import axios from "axios";
import { getCookie } from '../utils/cookiesConfig'; 
const token = getCookie('token');
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000", 
  baseURL: "https://task-backend-e-commerce.vercel.app", // Base URL for your API requests
  
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
