<!-- Home.vue -->
<template>
  <div :class="darkMode ? ' text-emerald-50' : 'text-emerald-800'"  class="p-2">
    <h1 class="text-3xl font-bold mb-6 text-center"> اهلا بك في متجر ,<span class="text-xl">  أبو شاكر</span></h1>
    
    <!-- السلايدر -->
     <div class=" relative h-64 overflow-hidden mb-6">
      <transition-group name="fade" tag="div">
        
         <img v-for="(slide, index) in sliderImages" :key="index" :src="slide" alt="صورة السلايد" v-show="currentSlide === index" class=" absolute w-full h-full object-cover transition-all duration-1000">
      </transition-group>
     </div>
     <categoties-with-products :product="products" />

    <!-- قسم الأكثر مبيعا -->
     <section ref="bestSellingRef" class="py-10 px-4">
        <h2>الأكثر مبيعا</h2>
        <div class="flex overflow-x-auto gap-6 pd-4 sanp-x snap-mandatory scroll-smooth">
                 <!-- Wishlist Button  -->

          <div v-for=" product in bestSelling" :key="product.id" class=" relative  snap-center min-w-[250px] rounded-2xl shadow p-2 text-center hover:scale-105 transition" >
                  <button
      @click="toggleWishlist(product.id)"
      class="absolute top-2 left-2 z-10
      bg-white/80 backdrop-blur
      rounded-full p-1 shadow
      hover:scale-110 transition"
    >
      <i 
        class="fas fa-heart"
        :class="wishlist.isInWishlist(product.id) 
          ? 'text-red-500' 
          : 'text-gray-400'"
      ></i>
    </button>
             <img @click="goToDetails(product.id)" :src="'https://picsum.photos/300'" alt="صورة المنتج" class="h-40 mx-auto mb-3 object-contain">
             <h2>{{ product.images }}</h2>
             <h3 class=" font-semibold">{{ product.name }}</h3>
             <p class="">{{ product.newPrice }} ر.س</p>
             <div class=" mt-2 flex justify-center gap-2">
              <button title="عرض تفاصيل المنتج" @click="goToDetails(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg"><i class="fas fa-eye"></i></button>
              <button title="  إضافة المنتج إلى السلة" @click="addToCart(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg"><i class="fas fa-cart-plus"></i></button>
             </div>
          </div>
        </div>
     </section>
     <!-- احدث المنتجات -->
      <section ref="latestRef" class=" py-8 px-4">
        <h2 class=" text-2xl font-bold mb-4 text-center">الأحدث</h2>
        <div class="relative  flex overflow-auto gap-6 pd-4 snap-x snap-mandatory scroll-smooth">
          <div v-for="product in latestProducts" :key="product.id" class="relative  snap-center min-w-[250px] rounded-2xl shadow p-4 text-center hover:scale-105 transition">
                              <button
      @click="toggleWishlist(product.id)"
      class="absolute top-2 left-2 z-10
      bg-white/80 backdrop-blur
      rounded-full p-1 shadow
      hover:scale-110 transition"
    >
      <i 
        class="fas fa-heart"
        :class="wishlist.isInWishlist(product.id) 
          ? 'text-red-500' 
          : 'text-gray-400'"
      ></i>
    </button>
              <img @click="goToDetails(product.id)" :src="'https://dummyimage.com/300x300/000/fff'" class=" h-40 mx-auto mb-3 object-contain" alt="صورة">
              <h3 class=" font-semibold">{{ product.name }}</h3>
              <p class="m-2">{{ product.newPrice }} ر.س </p>
              <div class=" mt-2 flex justify-center gap-2">
              <button title="عرض تفاصيل المنتج" @click="goToDetails(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg"><i class="fas fa-eye"></i></button>
              <button title="  إضافة المنتج إلى السلة" @click="addToCart(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg"><i class="fas fa-cart-plus"></i></button>
             </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useDarkMode } from "../components/useDarkMode";
const { darkMode, toggleMode } = useDarkMode();
import ScrollReveal from 'scrollreveal';
import { products, categories } from "../assets/data/productsApi";
import CategotiesWithProducts from "../components/CategotiesWithProducts.vue";
import { useWishlistStore } from '../stores/wishlist'
import { showAddToCartSuccess } from '../utils/notifications';
import { showToast } from '../stores/toast';
import { useAuthStore } from '../stores/auth';
import api from '../api/api';

const auth = useAuthStore()

const router = useRouter();
const cart = useCartStore();
const bestSelling = ref([]);
const latestProducts = ref([]);
const firstCategories = ref([]);
const sr = ScrollReveal();
const wishlist = useWishlistStore();

const toggleWishlist = async (productId) => {
  if (!auth.isLoggedIn) {
    showToast('يجب تسجيل الدخول أولاً', 'error')
    return
  }
  try {
     await wishlist.toggle(productId);
  } catch (e) {
    console.error('Error toggling wishlist:', e.response || e);
    showToast('حدث خطأ', 'error');
  }

}
  const loadWishlist = async () => {
    try {
      const res = await api.get('/wishlist')
      wishlist.value = res.data.data || res.data || []
    } catch (e) {
      console.log('Error loading wishlist:', e.response || e)
    }
  }

// صور السلايدر
const sliderImages =[
  "https://dummyimage.com/300x300/000/fff",
  "https://i.pravatar.cc/100",
  "https://dummyimage.com/300x300",
  "https://picsum.photos/300/3000",
  "https://picsum.photos/100/200",
]

const currentSlide = ref(0)

function goToDetails(id) {
  router.push({ name: "product", params: { id } });
}


function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.addToCart({ ...product, quantity: 1 });
  showToast('تم إضافة المنتج الى السة');
}

onMounted(() =>{
  loadWishlist();
  // تغير الصورة كل ثلاث ثواني
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % sliderImages.length;
  }, 3000)

  // تحديد الاكثر مبيعا
  bestSelling.value = [...products].sort((a,b) => b.sales - a.sales).slice(0,3)

  // اخر ثلاث إضافات
  latestProducts.value = [...products].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,3)

  // Scroll Reveal Animation

  sr.reveal("[ref='bestSellingRef']", {
    delay: 200,
    distance: "50px",
    origin: "bottom",
    duration: 800,
  })
  sr.reveal("[ref='latestRef']", {
    delay: 400,
    distance: "50px",
    origin: "bottom",
    duration: 800,
  })

})
</script>
<style scoped>
  .fida-enter-active, .fida-leave-active{
    /* transition: 1s; */
   opacity: 1s;
  }
  .fida-from-active, .fida-to-active{
    opacity: 0;
  }

</style>
