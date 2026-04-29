import axios from "axios";

const api = axios.create({
  baseURL: "https://my-store-api-production-904a.up.railway.app/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // 🔥 دائما جهز session_id
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId || sessionId === "null") {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }

  config.headers["X-Session-ID"] = sessionId;

  // 🔥 لو فيه login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;
});

export default api;