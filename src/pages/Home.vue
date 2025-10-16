<!-- Home.vue -->
<template>
  <div :class="darkMode ? ' text-emerald-50' : 'text-emerald-800'"  class="p-2">
    <h1 class="text-3xl font-bold mb-6 text-center"> اهلا بك في متجر ,<span class="text-xl">  أبو شاكر</span></h1>
    <!-- السلايدر -->
     <div class=" relative h-64 overflow-hidden mb-6">
      <transition-group name="fade" tag="div">
         <img v-for="(slide, index) in sliderImages" :key="index" src="../assets//images/myStoreDark.png" alt="صورة السلايد" v-show="currentSlide === index" class=" absolute w-full h-full object-cover transition-all duration-1000">
      </transition-group>
     </div>
     <categoties-with-products/>
    <!-- قسم الأكثر مبيعا -->
     <section ref="bestSellingRef" class="py-10 px-4">
        <h2>الأكثر مبيعا</h2>
        <div class="flex overflow-x-auto gap-6 pd-4 sanp-x snap-mandatory scroll-smooth">
          <div v-for=" product in bestSelling" :key="product.id" class=" snap-center min-w-[250px] rounded-2xl shadow p-2 text-center hover:scale-105 transition">
             <img :src="product.image" alt="صورة المنتج" class="h-40 mx-auto mb-3 object-contain">
             <h3 class=" font-semibold">{{ product.name }}</h3>
             <p class="">{{ product.newPrice }} ر.س</p>
             <div class=" mt-2 flex justify-center gap-2">
              <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg">عرض</button>
              <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg">إضافة</button>
             </div>
          </div>
        </div>
     </section>
     <!-- احدث المنتجات -->
      <section ref="latestRef" class=" py-8 px-4">
        <h2 class=" text-2xl font-bold mb-4 text-center">الأحدث</h2>
        <div class="flex overflow-auto gap-6 pd-4 snap-x snap-mandatory scroll-smooth">
          <div v-for="product in latestProducts" :key="product.id" class=" snap-center min-w-[250px] rounded-2xl shadow p-4 text-center hover:scale-105 transition">
              <img :src="product.image" class=" h-40 mx-auto mb-3 object-contain" alt="صورة">
              <h3 class=" font-semibold">{{ product.name }}</h3>
              <p class="m-2">{{ product.newPrice }} ر.س </p>
              <div class=" mt-2 flex justify-center gap-2">
              <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg">عرض</button>
              <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-2 py-1 rounded-b-lg">إضافة</button>
             </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useDarkMode } from "../components/useDarkMode";
const {darkMode, toggleMode} = useDarkMode();
import ScrollReveal from 'scrollreveal';
import { products, categories } from "../assets/data/productsApi";
import CategotiesWithProducts from "../components/CategotiesWithProducts.vue";

const bestSelling = ref([])
const latestProducts = ref([])
const firstCategories = ref([])
const sr = ScrollReveal();

// صور السلايدر
const sliderImages =[
  "../images/GARY.png",
  "../images/GARY.png",
  "../images/GARY.png",
]

const currentSlide = ref([])

onMounted(() =>{
  // تغير الصورة كل ثلاث ثواني
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1)%
    sliderImages.length
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
