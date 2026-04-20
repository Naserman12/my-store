import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router";
import { useCartStore } from "../stores/cart";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const cartStore = useCartStore()
      const res = await authApi.me();
      this.user = res.data;
    },
      async register(form) {
      const cartStore = useCartStore()
      const res = await authApi.register(form)

      this.user = res.data.user
         localStorage.setItem("token", res.data.token);
         await cartStore.loadCart();
      this.redirectAfterLogin()
    },

    async login(form) {
      try { 
      const cartStore = useCartStore()
      const res = await authApi.login(form)
      console.log("Login response =>", res.data)
         // تأكد أن البيانات موجودة
      if (!res.data || !res.data.user || !res.data.token) {
        showToast("بيانات تسجيل الدخول غير صحيحة", "error")
        return
      }

    // تخزين المستخدم
    this.user = res.data.user
    localStorage.setItem("user", JSON.stringify(this.user))
    if (!this.user) {
        showToast("حدث خطأ أثناء تسجيل الدخول", "error")
        return;
      }
      localStorage.setItem("token", res.data.token); 
         // 🔥 إعادة تحميل السلة بعد تسجيل الدخول
      await cartStore.loadCart();
      this.redirectAfterLogin()
        } catch (e) {
    console.log("Login error =>", e)
    showToast("بيانات تسجيل الدخول غير صحيحة", "error")
    return null
  }

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