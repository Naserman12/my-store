import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router";
import { useCartStore } from "../stores/cart";
import { showToast } from '../stores/toast'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
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
      return res 
    },
    async login(form) {
      console.log("SESSION BEFORE LOGIN:", localStorage.getItem("session_id"))   
      try { 
        const cartStore = useCartStore()
        const res = await authApi.login(form)
        console.log("Login response =>", res.data)
        console.log("Login user =>", res.data.user)
        console.log("Login cart =>", res.data.cart)
        
        // تأكد أن البيانات موجودة
        if (!res.data || !res.data.user || !res.data.token) {
          showToast("بيانات تسجيل الدخول غير صحيحة", "error")
          return;
        }
        
        // تخزين المستخدم
        this.user = res.data.user
        localStorage.setItem("user", JSON.stringify(this.user))
        console.log("SESSION After LOGIN:", localStorage.getItem("session_id"))   
        if (!this.user) {
          showToast("حدث خطأ أثناء تسجيل الدخول", "error")
        return;
      }
      localStorage.setItem("token", res.data.token); 
         // 🔥 إعادة تحميل السلة بعد تسجيل الدخول
        await cartStore.setCart(res.data.cart);
      // await cartStore.loadCart();
      this.redirectAfterLogin()
      return res;
        } catch (e) {
    console.log("Login error =>", e.response  || e, 'Form => ', form)
    showToast("بيانات تسجيل الدخول غير صحيحة", "error")
    return null;
  }

    },
       redirectAfterLogin() {

      // ✅ customer
      if (this.intendedRoute) {
        // router.push(this.intendedRoute)
        this.intendedRoute = null
        const redirect = localStorage.getItem('redirect_after_login');
      if (redirect) {
        localStorage.removeItem('redirect_after_login');
        router.push(redirect);
      }
      } else {
            // ✅ admin
      if (this.user.role === "admin") {
        router.push("/admin")
        return
      }
        router.push("/")
      }
    },

    async logout() {
      localStorage.removeItem("token");
      this.user = null;
    }
  }
});