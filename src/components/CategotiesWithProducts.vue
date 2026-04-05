<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { categories, products } from '../assets/data/productsApi';
import { useDarkMode } from "../components/useDarkMode";
import SkeletonProduct from './SkeletonProduct.vue';
import { showAddToCartSuccess } from '../utils/notifications';
import { showToast } from '../stores/toast';
import productApi from '../api/product';
import cartApi from "../api/cart";

const {darkMode, toggleMode} = useDarkMode();
const router = useRouter();
const cart = useCartStore();


const selectedCategory = ref(null)
const loading = ref(true)
const selectCategory =  (cat) => {
    selectedCategory.value = cat
}

const productAPI = ref([])

onMounted(async () => {
  const res = await productApi.getProducts()
  productAPI.value = res.data.data
})
function goToDetails(id) {
  router.push({ name: "product", params: { id } });
}
const addToCart = async (id) => {
  await cartApi.add(id, 1);
  showToast('تم إضافة المنتج الى السة');
}

// function addToCart(product_id) {
//     await cartApi.add({ id: product_id, quantity: 1 });
//     // router.push('/cart');
// }
// جلب المنتجات على حسب التصنيف
const previewProducts = computed(() => {
    if (!selectedCategory.value) return []
     return  productAPI.value.filter((p) => p.categories.includes(Number(selectedCategory.value.id))).slice(0, 4)
})

//  تحديد تصنيف تلقائي
onMounted(async () => {
    setTimeout(() => {
        if (categories.length > 0) {
            selectedCategory.value = categories[0]
        }
        loading.value = false
    }, 4000)
})
</script>

<template>
    <div class=" px-4 py-6">
        <section class="grip grid-cols-2 md:grip-cols-4 gap-4">
          <template v-if="loading">
            <skeleton-product v-for="n in 3" :key="n"/>
          </template>

          <template v-else>
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
                          <img  v-lazy="'https://i.pravatar.cc/100'"  class="h-24 mx-auto mb-4 opacity-0 transition duration-700" alt="product image">
                          <h3 class=" text-sm font-semibold">{{ product.name }}</h3>
                          <p class=" text-sm ">{{ product.newPrice }} ر.س</p>
                          <button title="عرض تفاصيل المنتج" @click="goToDetails(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-3 py-1 rounded m-1"><i class="fas fa-eye"></i></button>
                          <button title="  إضافة المنتج إلى السلة" @click="addToCart(id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-3 py-1 rounded "> <i class="fas fa-cart-plus"></i></button>
                      </div>
                  </div>
                  <!-- عرض المزيد -->
                   <div class="text-center mt-6">
                      <router-link :to="`/category/${selectedCategory.id}`">عرض المزيد</router-link>
                   </div>
               </div>
            </template>
        </section>
    </div>
</template>