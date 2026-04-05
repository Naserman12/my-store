import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const res = await authApi.me();
      this.user = res.data;
    },
      async register(form) {
      const res = await authApi.register(form)

      this.user = res.data.user
         localStorage.setItem("token", res.data.token);
      this.redirectAfterLogin()
    },

    async login(form) {
      const res = await authApi.login(form)

      this.user = res.data.user
       localStorage.setItem("token", res.data.token); 

      this.redirectAfterLogin()
    },
       redirectAfterLogin() {

      // ✅ admin
      if (this.user.role === "admin") {
        router.push("/admin")
        return
      }

      // ✅ customer
      if (this.intendedRoute) {
        router.push(this.intendedRoute)
        this.intendedRoute = null
      } else {
        router.push("/")
      }
    },

    async logout() {
      localStorage.removeItem("token");
      this.user = null;
    }
  }
});