<!-- components/ProductCard.vue -->
<template>
  <div v-if="product" class="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
    <img :src="product.image" :alt="product.name" @click="goToDetails(product.id)"  class="h-32 object-cover mb-4 rounded-lg"/>
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-2">{{ product.price }} ر.س</p>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      إضافة إلى السلة
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
   methods: {
    goToDetails(id) {
       this.$router.push(`/product/${id}`);
    }
  }
};
</script>
