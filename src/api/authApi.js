import Register from "../pages/Register.vue";
import api from "./api";

export default {
  register(data) {
    return api.post("/auth/register", data, {
    headers: {
      "X-Session-ID": localStorage.getItem("session_id")
    }
  });
  },
  login(data) {
    return api.post("/auth/login", data, {
    headers: {
      "X-Session-ID": localStorage.getItem("session_id")
    }
  });
  },

  me() {
    return api.get("/auth/user");
  },
  logout() {
    return api.post("/auth/logout");
  }
};