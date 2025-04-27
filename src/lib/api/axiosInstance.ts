import axios from "axios";
import { API_BASE } from "./api";
import { getCookie } from "@/lib/api/auth";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the Bearer token
// Ideally, we should use HTTPOnly cookies for improved security
// but for demo purposes, we are storing tokens in cookies and
// sending them in the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
