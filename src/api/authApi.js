import Register from "../pages/Register.vue";
import api from "./api";

export default {
  register(data) {
    return api.post("/auth/register", data);
  },
  login(data) {
    return api.post("/auth/login", data);
  },

  me() {
    return api.get("/auth/user");
  },
  logout() {
    return api.post("/auth/logout");
  }
};