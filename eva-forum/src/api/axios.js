// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests automatically
api.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage (matches your AuthContext)
    const token = sessionStorage.getItem("token");

    // console.log("Token from sessionStorage:", token); // Debug log

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization); // Debug log
    } else {
      console.log("No token found in sessionStorage!"); // Debug log
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.log("Response error:", error.response?.status); // Debug log
    if (error.response?.status === 401) {
      //console.log("401 error - clearing session and redirecting"); // Debug log

      // Token expired or invalid - clear storage and redirect to login
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
