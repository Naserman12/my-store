<!-- pages/Category.vue -->
<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">{{ categoryName }}</h2>
     <div  v-if="loading" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      <div v-for="n in 8" :key="n" class="animate-pulse">
        <div class="bg-gray-200 h-48 rounded-lg mb-2"></div>
        <div class="bg-gray-200 h-4 w-3/4 rounded mb-1"></div>
        <div class="bg-gray-200 h-4 w-1/2 rounded "></div>
      </div>
    </div>
    <div v-else-if="products.length > 0 " class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else class="text-center text-gray-500 py-8">
      <p>لا توجد منتجات في هذا التصنيف</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import { categories, products } from "../assets/data/productsApi";
import ProductCard from "../components/ProductCard.vue";
import productsApi from "../api/productsApi";

const route = useRoute();
const products = ref([]);
const loading = ref(true);
const categoryName = ref('');
onMounted(async () => {
  try {
    const categoryId = route.params.id;
    const res = await productsApi.getCategoryProducts(categoryId);
    console.log('res', res)
    products.value = res.data.data.products
    categoryName.value = res.data.data.category_name || 'غير معروف'
  } catch (e) {
    console.error("API ERROR:", e);
  } finally {
        loading.value = false;
  }
});

// export default {
//   components: { ProductCard },
//   computed: {
//     categoryId() {
//       return parseInt(this.$route.params.id);
//     },
//     categoryName() {
//        const category = categories.find(c => c.id === this.categoryId);
//        return  category ? category.name : 'غير معروف';
//       },
//       filterProducts(){
//         return products.filter(p => p.categories.includes(this.categoryId));
//       },
//   },
// };

</script>