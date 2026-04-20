<!-- components/ProductCard.vue -->
<template>
  <div v-if="product" :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'" class=" relative  rounded-2xl shadow items-center">
      <div class="m-1 rounded-lg flex flex-col items-center">
       <!-- Wishlist Button  -->
      <button
      @click.stop="toggleWishlist(product)"
      class="absolute top-2 left-2 z-10
      bg-white/80 backdrop-blur
      rounded-full p-2 shadow
      hover:scale-110 transition"
    >
      <i 
        class="fas fa-heart"
        :class="wishlist.isInWishlist(product.id) 
          ? 'text-red-500' 
          : 'text-gray-400'"
      ></i>
    </button>
        <!-- <img src="../images/myStoreLogo.png" :alt="product.name" @click="goToDetails(product.id)"  class="h-80 object-cover m-1 text-center items-center rounded-lg"/> -->
        <img src="https://i.pravatar.cc/100" :alt="product.name" @click="goToDetails(product.id)"  class="h-40 w-full object-cover m-0.5 text-center items-center"/>
      </div>
      <div class="w-full rounded-lg text-center">
        <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
        <p class="text-amber-600 mb-0.5">*****</p>
        <p class="text-gray-600 mb-1">{{ product.newPrice }} ر.س</p>
      </div>
      <div class="w-full m-0.5 bg-emerald-50 rounded-lg  p-0.5 text-center font-semibold">
        <button title="عرض تفاصيل المنتج" @click="goToDetails(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-800' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="text-xs w-1/3 px-4 ml-1 py-2 rounded-lg bg-gray-300">
         <i class="fas fa-eye"></i>
        </button>
        <button title="  إضافة المنتج إلى السلة" @click="addToCart(product)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-800' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="text-xs px-4 w-1/3 py-2 rounded-lg bg-gray-300">
         <i class="fas fa-cart-plus"></i>
        </button>
      </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDarkMode } from './useDarkMode';
import { useCartStore } from '../stores/cart';
import { showAddToCartSuccess } from '../utils/notifications';
import { showToast } from '../stores/toast';
import { useAuthStore } from '../stores/auth';
import cartApi from "../api/cart";
import { useWishlistStore } from '../stores/wishlist'

const {darkMode, toggleMode} = useDarkMode();
const router = useRouter()
const cart =useCartStore()
const wishlist = useWishlistStore()
const auth = useAuthStore()

// نستقبل prop من  الأب
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})
const p = ref(props.product);
function goToDetails(id) {
  router.push({ name: "product", params: { id: id } });
}
const addToCart = async (id) => {
  try {
    await cartApi.add(id, 1);
    showToast('تم إضافة المنتج إلى السلة');
  } catch (e) {
    console.error(e);
    showToast('حدث خطأ', 'error');
  }
}
const toggleWishlist = async (product) => {
  if (!auth.isLoggedIn) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    return
  }

  await wishlist.toggle(product.id)
}
// function addToCart(product) {
//     if (!product) return;
//     cart.addToCart({ ...product, quantity: 1 });
//     router.push('/cart');
//     showToast('تم إضافة المنتج الى السلة');
// }
</script>
