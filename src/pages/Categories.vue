<!-- Home.vue -->
<template>
  <div class="p-2">
    <h1 :class="darkMode ? ' text-emerald-50' : 'text-emerald-800'" class="text-2xl font-bold mb-6 text-center"> تسوق حسب التصنيف</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <CategoryCard
        v-for="category in productApi"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
import CategoryCard from "../components/CategoryCard.vue";
// import { products, categories } from "../assets/data/productsApi";
import productApi from "../api/product";

import { useDarkMode } from "../components/useDarkMode";
import { ref } from 'vue';
const {darkMode, toggleMode} = useDarkMode();
const category = ref(productApi);
const categories = productApi.getProducts()
</script>
