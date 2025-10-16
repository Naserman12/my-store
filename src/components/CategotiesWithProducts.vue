<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { categories, products } from '../assets/data/productsApi';
import { useDarkMode } from "../components/useDarkMode";
const {darkMode, toggleMode} = useDarkMode();
const selectedCategory = ref(null)
const selectCategory =  (cat) => {
    selectedCategory.value = cat
}
// جلب المنتجات على حسب التصنيف
const previewProducts = computed(() => {
    if (!selectedCategory.value) return []
     return  products.filter((p) => p.categories.includes(Number(selectedCategory.value.id))).slice(0, 4)
})

//  تحديد تصنيف تلقائي
onMounted(() => {
    if (categories.length > 0) {
        selectedCategory.value = categories[0]
    }
})
</script>

<template>
    <div class=" px-4 py-6">
        <h2>التصنيفات</h2>
        <!-- شريط التصنيفات -->
         <div class="flex gap-6 overflow-x-auto pb-4">
            <div v-for="cat in categories" :key="cat.id" class="flex flex-col items-center min-w-[80px] cursor-pointer" @click="selectCategory(cat)">
                <div class="w-16 h-16 flex items-center justify-center rounded-full shadow transition" :class="{'ring-2 ring-blue-600': selectedCategory?.id === cat.id}">
                    <img src="../assets/images/myStoreDark.png" class=" w-10 h-10 object-contain" alt="">
                </div>
                <span class="mt-2 text-sm font-semibold" >{{ cat.name }}</span>

            </div>
        </div>
        <!-- المنجات التابعة للتصنيف المختار -->
         <div v-if="selectedCategory" class="mt-8">
            <h2 class=" text-xl font-bold mb-4 text-center">{{ selectedCategory.name }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div v-for="product in previewProducts" :key="product.id" class=" rounded-xl shadow p-3 text-center hover:scale-105 transition">
                    <img src="../images/myStoreDark.png" class=" h-24 mx-auto mb-4 object-contain" alt="">
                    <h3 class=" text-sm font-semibold">{{ product.name }}</h3>
                    <p class=" text-sm ">{{ product.newPrice }} ر.س</p>
                    <button :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-3 py-1 rounded-b-lg"> إضافة إلى السلة</button>
                </div>
            </div>
            <!-- عرض المزيد -->
             <div class="text-center mt-6">
                <router-link :to="`/category/${selectedCategory.id}`">عرض المزيد</router-link>
             </div>
         </div>
    </div>
</template>