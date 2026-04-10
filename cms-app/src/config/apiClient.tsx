import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 90000,
  timeoutErrorMessage: "Server timedout...",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

// TODO: interceptors

// UI ----> Axios ----> Interceptor(request)[Optional] ----> Internet ----> Server(API Server)

// API Server ----> Internet ----> Axios ----> Interceptor(response)[optional] ----> Component(UI)

export default axiosInstance;
