<!-- Home.vue -->
<template>
  <div class="p-2">
    <h1 class="text-2xl font-bold mb-6 text-center"> تسوق حسب التصنيف</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        
      />
    </div>
  </div>
</template>

<script>
import CategoryCard from "../components/CategoryCard.vue";

export default {
  components: { CategoryCard },
  data() {
    return {
      categories: [
        { id: 1, name: "أدوات القهوة", image: "/images/myStoreLogo.png" },
        { id: 2, name: "أدوات المطبخ", image: "/images/myStoreLogo.png" },
        { id: 3, name: "منتجات العناية", image: "/images/myStoreLogo.png" },
        { id: 4, name: "منتجات المنزل", image: "/images/myStoreLogo.png" },
      ]
    };
  },
};
</script>
