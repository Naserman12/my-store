<!-- pages/Category.vue -->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">{{ categoryName }}</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      allProducts: [
        { id: 1, category_id: 1, name: "آلة قهوة", price: 200, image: "../images/myStoreeLogo.png" },
        { id: 2, category_id: 1, name: "مطحنة قهوة", price: 120, image: "https://th.bing.com/th/id/OIP.PAQO9Mc8B8bCYW4w55gw8QHaFS?w=255&h=183&c=7&r=0&o=5&pid=1.7" },
        { id: 3, category_id: 2, name: "رف مطبخ", price: 150, image: "https://th.bing.com/th/id/OIP._bSekl3N9LDqcHmVbrA2pAHaE8?w=280&h=187&c=7&r=0&o=7&pid=1.7&rm=3" },
        { id: 4, category_id: 3, name: "شامبو طبيعي", price: 50, image: "https://th.bing.com/th/id/OIP.DoM2axisQbL9bD7-5mPS2wHaKc?w=137&h=194&c=7&r=0&o=5&pid=1.7" },
      ]
    };
  },
  computed: {
    categoryId() {
      return parseInt(this.$route.params.id);
    },
    categoryName() {
      const categoryNames = {
        1: "أدوات القهوة",
        2: "أدوات المطبخ",
        3: "منتجات العناية",
        4: "منتجات المنزل",
      };
      return categoryNames[this.categoryId] || "منتجات";
    }
  },
  created() {
    this.products = this.allProducts.filter(p => p.category_id === this.categoryId);
  }
};
</script>
