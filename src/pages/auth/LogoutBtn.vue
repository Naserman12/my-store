<template>
  <button 
    @click="logout" 
    class="text-gray-100 bg-gray-500 p-0.5 font-bold underline"
  >
  <i class="fas fa-sign-out-alt text-gray-100  m-2"></i>
  تسجيل الخروج
  </button>
</template>

<script setup>
import { useRouter } from "vue-router"
import api from "../../api/api"
import { showToast } from "../../stores/toast"

const router = useRouter()
const logout = async () => {
  try {
    await api.post("/auth/logout")
    localStorage.removeItem("token", null)
    localStorage.removeItem("user", null)
    showToast("تم تسجيل الخروج بنجاح")
    router.push("/login")
  } catch (err) {
    console.log(err)
    showToast("حدث خطأ أثناء تسجيل الخروج", "error")
  }
}
</script>
