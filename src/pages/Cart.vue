<template>
  <div :class="darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'" class="max-w-6xl mx-auto p-6" >

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-center mb-10">
      🛒 سلة التسوق
    </h1>

    <div class="grid md:grid-cols-3 gap-6">

      <!-- 🛒 المنتجات -->
      <div class="md:col-span-2 space-y-4">

        <div v-if="loading">
          <skeleton-product v-for="n in 3" :key="n" />
        </div>

        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white rounded-xl shadow p-4 flex justify-between items-center"
        >
          <div>
            <h2 class="font-bold text-lg">{{ item.product.name }}</h2>
            <p class="text-gray-500 text-sm mt-1">
              {{ item.product.price }} ر.س
            </p>

            <div class="flex items-center mt-3 gap-2">

              <button
                @click="decrease(item.id)"
                class="px-3 py-1 bg-gray-200 rounded hover:bg-red-400 hover:text-white"
              >-</button>

              <span class="px-3">{{ item.quantity }}</span>

              <button
                @click="increase(item.id)"
                class="px-3 py-1 bg-gray-200 rounded hover:bg-green-400 hover:text-white"
              >+</button>

            </div>
          </div>

          <!-- حذف -->
          <button
            @click="remove(item.id)"
            class="text-red-500 hover:bg-red-100 px-3 py-2 rounded"
          >
            🗑
          </button>
        </div>

        <p v-if="!cartItems.length" class="text-center text-gray-400">
          السلة فارغة 😢
        </p>

      </div>

      <!-- 💰 Summary -->
      <div class="bg-white shadow-xl rounded-xl p-6 h-fit">

        <h2 class="text-xl font-bold mb-4">ملخص الطلب</h2>

        <div class="space-y-2 text-gray-600">

          <div class="flex justify-between">
            <span>عدد المنتجات</span>
            <span>{{ cartItems.length }}</span>
          </div>

          <div class="flex justify-between">
            <span>الإجمالي</span>
            <span class="font-bold text-black">{{ total }} ر.س</span>
          </div>

        </div>

        <button
          @click="goToCheckout"
          class="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          متابعة الطلب →
        </button>

        <button
          @click="goBack"
          class="w-full mt-3 border py-2 rounded-lg"
        >
          ← متابعة التسوق
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import cartApi from "../api/cart"
import { useAuthStore } from "../stores/auth"
import { showToast } from "../stores/toast"
import SkeletonProduct from "../components/SkeletonProduct.vue"
import { useDarkMode } from "../components/useDarkMode"

const { darkMode } = useDarkMode()

const router = useRouter()
const auth = useAuthStore()

const cartItems = ref([])
const total = ref(0)
const loading = ref(true)

const loadCart = async () => {
  try {
    const res = await cartApi.getCart()
    console.log('Cart loading...', res.data);
    cartItems.value = res.data.items
    total.value = res.data.total
  } catch (e) {
    console.log(e.response || e)
  }

  loading.value = false
}

const increase = async (id) => {
  await cartApi.updateQuantity(id, 2) // عدلها حسب منطقك
  loadCart()
}

const decrease = async (id) => {
  await cartApi.updateQuantity(id, 1)
  loadCart()
}

const remove = async (id) => {
  await cartApi.remove(id)
  loadCart()
}

const goToCheckout = () => {

  if (!auth.isLoggedIn) {
    showToast("⚠️ لازم تسجل دخول أول")
    localStorage.setItem("redirect_after_login", "/checkout")
    router.push("/login")
    return
  }

  router.push("/checkout")
}

const goBack = () => {
  router.go(-1)
}

onMounted(loadCart)
</script>