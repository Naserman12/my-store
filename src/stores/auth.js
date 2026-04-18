import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router";
import { useCartStore } from "../stores/cart";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
   setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },

  actions: {
    async fetchUser() {
      const res = await authApi.me();
      this.user = res.data;
    },
      async register(form) {
      const res = await authApi.register(form)

      this.user = res.data.user
         localStorage.setItem("token", res.data.token);
         await cartStore.loadCart();
      this.redirectAfterLogin()
    },

    async login(form) {
      const res = await authApi.login(form)

      this.user = res.data.user
       localStorage.setItem("token", res.data.token); 
         // 🔥 إعادة تحميل السلة بعد تسجيل الدخول
      await cartStore.loadCart();
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