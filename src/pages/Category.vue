<!-- pages/Category.vue -->
<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ categoryName }}</h2>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      <ProductCard
        v-for="product in filterProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { categories, products } from "../assets/data/productsApi";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  computed: {
    categoryId() {
      return parseInt(this.$route.params.id);
    },
    categoryName() {
       const category = categories.find(c => c.id === this.categoryId);
       return  category ? category.name : 'غير معروف';
      },
      filterProducts(){
        return products.filter(p => p.categories.includes(this.categoryId));
      },
  },
};
</script>
