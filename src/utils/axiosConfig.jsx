
import axios from "axios";
import { getCookie } from '../utils/cookiesConfig'; 
const token = getCookie('token');
console.log(token)
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000", 
  // baseURL: "https://task-backend-e-commerce.vercel.app",
  baseURL: "  https://task-backend-gwlh3kbjk-amir-saeeds-projects.vercel.app/ ",// Base URL for your API requests
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
