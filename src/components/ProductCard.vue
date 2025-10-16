<!-- components/ProductCard.vue -->
<template>
  <div v-if="product" :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'" class="  rounded-2xl shadow items-center">
      <div class="m-1 rounded-lg flex flex-col items-center">
        <!-- <img src="../images/myStoreLogo.png" :alt="product.name" @click="goToDetails(product.id)"  class="h-80 object-cover m-1 text-center items-center rounded-lg"/> -->
        <img src="../assets//images//GARY.png" :alt="product.name" @click="goToDetails(product.id)"  class="h-40 w-full object-cover m-0.5 text-center items-center"/>
      </div>
      <div class="w-full rounded-lg text-center">
        <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
        <p class="text-amber-600 mb-0.5">*****</p>
        <p class="text-gray-600 mb-1">{{ product.newPrice }} ر.س</p>
      </div>
      <div class="w-full m-0.5 bg-emerald-50 rounded-lg  p-0.5 text-center font-semibold">
        <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="text-xs px-4 py-2 rounded-lg ">
          إضافة إلى السلة
        </button>
      </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useDarkMode } from './useDarkMode';
import { ref } from 'vue';
const {darkMode, toggleMode} = useDarkMode();
const router = useRouter()
// نستقبل prop من  الأب
const props = defineProps({
  product: {
    type: Object
  }
})
const p = ref(props.product);
function goToDetails(id) {
  router.push({ name: "product", params: { id: id } });
}
</script>
