<template>
  <button 
    @click="logout" 
    class="text-red-600 font-bold underline"
  >
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

    localStorage.removeItem("token")

    showToast("تم تسجيل الخروج بنجاح")

    router.push("/login")
  } catch (err) {
    console.log(err)
    showToast("حدث خطأ أثناء تسجيل الخروج", "error")
  }
}
</script>
