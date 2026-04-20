import axios from "axios";

const api = axios.create({
  baseURL: "https://my-store-api-production-904a.up.railway.app/api",
  headers: {
    Accept: "application/json",
  },
});

// Interceptor واحد فقط
api.interceptors.request.use((config) => {
  // session cart
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }

  config.headers["X-Session-ID"] = sessionId;

  // token
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
