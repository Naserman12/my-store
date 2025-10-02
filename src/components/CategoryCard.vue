<!-- components/CategoryCard.vue -->
<template>
  <div
    class="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
  >
    <div class="bg-gray-50 m-1 rounded-2xl">
      <img src="../images/myStoreLogo.png" alt="صورة" class="h-80 w-full object-cover rounded-2xl text-center items-center" />
    </div>
    <div class="m-1 bg-amber-50 rounded-2xl  p-2 text-center font-semibold">
      <h3 class="text-right">{{ category.name }}</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum nisi harum laudantium enim rerum fugit qui provident omnis nam officia minus vero animi mollitia, eos dolor id autem recusandae?</p>
       <button @click="goToCategory(category.id)" class=" bg-amber-200 text-gray-700 text-lg px-4 py-2 rounded-lg hover:bg-amber-300">
         تصفح المنتجات
        </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: Object
  },
  methods: {
    goToCategory(id) {
      this.$router.push({ name: "category", params: { id } });
    }
  }
};
</script>
