// src/api/client.js
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://101511850-comp3123-assignmnet2-backend-ndts2vjzf.vercel.app/api/v1/";

export const api = axios.create({
  baseURL: API_BASE,
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["x-access-token"] = token;
  }
  return config;
});
