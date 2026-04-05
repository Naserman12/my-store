
<template>
    <div class="bg-black text-shadow-fuchsia-300 w-full h-screen flex items-center justify-center">
        <h1 class=" text-amber-50 text-center">المفضلة: </h1><br>
        <p class=" text-amber-50">لا توجد منتجات في المفضلة</p>
    </div>
</template>
<!-- <template>
<div class="max-w-6xl mx-auto p-6">

<h1 class="text-2xl font-bold mb-6">
❤️ المفضلة
</h1>

<div v-if="wishlist.items.length"
     class="grid md:grid-cols-3 gap-6">

<div
 v-for="product in wishlist.items"
 :key="product.id"
 class="border rounded-lg p-4">

<img :src="product.image"
     class="h-40 w-full object-cover rounded"/>

<h2 class="mt-3 font-semibold">
{{ product.name }}
</h2>

<p class="text-emerald-600">
{{ product.price }} ر.س
</p>

<button
 @click="wishlist.toggle(product)"
 class="mt-3 text-red-500">

إزالة من المفضلة
</button>

</div>

</div>

<p v-else class="text-gray-500 text-center">
لا توجد منتجات في المفضلة
</p>

</div>
</template> -->
<!-- 
<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { onMounted } from 'vue'

const wishlist = useWishlistStore()

onMounted(()=>{
   wishlist.fetchWishlist()
})
</script> -->