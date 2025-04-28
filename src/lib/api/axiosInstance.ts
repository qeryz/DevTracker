import axios from "axios";
import { API_BASE } from "./api";
import {
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
} from "@/lib/api/auth";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((callback) => {
    if (token) {
      callback(token);
    } else {
      callback(""); // Reject the request if no token
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  // Skip auth-related endpoints
  if (config.url?.includes("/auth/")) return config;

  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // No refresh token available - full logout
        document.cookie = "access=; path=/; max-age=0";
        document.cookie = "refresh=; path=/; max-age=0";
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push((newToken: string) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken(refreshToken);

        // Update the Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Process queued requests
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear everything and redirect to login
        processQueue(refreshError, null);
        document.cookie = "access=; path=/; max-age=0";
        document.cookie = "refresh=; path=/; max-age=0";
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
