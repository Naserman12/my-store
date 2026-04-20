<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"
import { useAuthStore } from "../stores/auth"
import { useDarkMode } from "../components/useDarkMode";

const auth = useAuthStore()
const { darkMode } = useDarkMode()

const wishlist = ref([])
const loading = ref(true)

const loadWishlist = async () => {
  try {
    const res = await api.get('/wishlist')
    wishlist.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
const remove = async (productId) => {
  await api.post('/wishlist/toggle', {
    product_id: productId
  })

  wishlist.value = wishlist.value.filter(
    item => item.product_id !== productId
  )
}
onMounted(() => {
  if (auth.isLoggedIn) {
    loadWishlist()
  } else {
    loading.value = false
  }
})
</script>
<template>
  <div class="min-h-screen p-6"
       :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'">

    <h1 class="text-2xl font-bold mb-6 text-center">المفضلة ❤️</h1>

    <!-- LOADING -->
    <div v-if="loading" class="text-center">
      جاري التحميل...
    </div>

    <!-- غير مسجل -->
    <div v-else-if="!auth.isLoggedIn" class="text-center space-y-4">

      <p class="text-lg">يجب تسجيل الدخول لعرض المفضلة</p>

      <button
        @click="$router.push('/login')"
        class="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
        تسجيل الدخول
      </button>

    </div>

    <!-- لا يوجد مفضلة -->
    <div v-else-if="wishlist.length === 0" class="text-center space-y-4">

      <p class="text-lg">لا توجد منتجات في المفضلة</p>

      <button
        @click="$router.push('/categories')"
        class="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
        تصفح المنتجات
      </button>

    </div>

    <!-- عرض المنتجات -->
    <div v-else class="grid md:grid-cols-3 gap-6">

      <div v-for="item in wishlist"
           :key="item.id"
           class="rounded-2xl shadow p-4 transition hover:scale-105"
           :class="darkMode ? 'bg-gray-800' : 'bg-white'">

        <img
          :src="item.product.images?.[0]?.image_url || 'https://via.placeholder.com/300'"
          class="w-full h-40 object-cover rounded-lg mb-3"
        />

        <h3 class="font-semibold">{{ item.product.name }}</h3>

        <p class="text-emerald-600 font-bold">
          {{ item.product.price }} ر.س
        </p>

        <button
          @click="remove(item.product_id)"
          class="mt-3 text-red-500 text-sm">
          إزالة من المفضلة
        </button>

      </div>

    </div>

  </div>
</template>