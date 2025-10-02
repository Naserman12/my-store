<!-- components/CategoryCard.vue -->
<template>
  <div
    class="bg-amber-200 rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
  >
    <div class="bg-gray-50 m-1 rounded-2xl">
      <img src="../images/myStoreLogo.png" alt="صورة" class="h-80 w-full object-cover rounded-2xl text-center items-center" />
    </div>
    <div class="m-1 bg-amber-50 rounded-2yl  p-2 text-center font-semibold">{{ category.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  }
};
</script>
