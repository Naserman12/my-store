<!-- components/ProductCard.vue -->
<template>
  <div v-if="product" class=" bg-emerald-50 rounded-2xl shadow items-center">
      <div class="bg-emerald-200 m-1 rounded-lg flex flex-col items-center">
        <!-- <img src="../images/myStoreLogo.png" :alt="product.name" @click="goToDetails(product.id)"  class="h-80 object-cover m-1 text-center items-center rounded-lg"/> -->
        <img src="../images/myStoreDark.png" :alt="product.name" @click="goToDetails(product.id)"  class="h-40 w-full object-cover m-0.5 text-center items-center"/>
      </div>
      <div class="w-full bg-emerald-50 rounded-lg text-center">
        <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
        <p class="text-amber-600 mb-0.5">*****</p>
        <p class="text-gray-600 mb-1">{{ product.newPrice }} ر.س</p>
      </div>
      <div class="w-full m-0.5 bg-emerald-50 rounded-lg  p-2 text-center font-semibold">
        <button class="  bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-emerald-700">
          إضافة إلى السلة
        </button>
      </div>
  </div>
</template>
<script>
  import { products, categories } from '../assets/data/productsApi';
export default {
  
  props: {
    product: products
  },
   methods: {
    goToDetails(id) {
       this.$router.push(`/product/${id}`);
    }
  }
};
</script>
