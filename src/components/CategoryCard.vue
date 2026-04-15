<!-- components/CategoryCard.vue -->
<template>
  <div
    :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50'" class=" rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
  >
  
    <div  class="bg-emerald-200 m-1 rounded-2xl">
      <img src="../assets/images/myStoreLogo.png" alt="صورة" class="h-80 w-full  object-cover rounded-2xl text-center items-center" />
    </div>
    <div  :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 '" class="m-0.5 rounded-2xl  p-1 text-center font-semibold">
      <h3 class="text-right text-xl ">{{ category.name }}</h3>
      <p class=" text-s m-4"> {{ category.description }}</p>
       <button @click="goToCategory(category.id)"  :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 hover:text-emarale-50'"  class="text-lg px-4 py-2 rounded-lg">
         تصفح المنتجات
        </button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useDarkMode } from './useDarkMode';
import productsApi from '../api/productsApi';
const {darkMode, toggleMode} = useDarkMode();
const router = useRouter()
// نستقبل prop من  الأب
const props = defineProps({
  category: {
    type: Object
  }
})
const category = ref(props.category);
function goToCategory(id) {
  router.push({ name: "category", params: { id: id } });
}
</script>
