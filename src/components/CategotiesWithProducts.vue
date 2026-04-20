<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useDarkMode } from "../components/useDarkMode";
import SkeletonProduct from './SkeletonProduct.vue';
import { showToast } from '../stores/toast';
import  productsApi from '../api/productsApi';
import cartApi from "../api/cart";
import api from "../api/api";

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const {darkMode, toggleMode} = useDarkMode();
const router = useRouter();
const categoriesAPI = ref([])
const selectedCategory = ref(null)
const productsAPI = ref([])
const loading = ref(true)
const adding = ref(false);

onMounted(async () => {
  try {
         const res = await productsApi.getCategoriesWithProducts();
        //  الوصول للبيانات
        categoriesAPI.value = res.data.data.categories;
        productsAPI.value = res.data.data.products;
        if (categoriesAPI.value.length > 0) {
            selectedCategory.value = categoriesAPI.value[0];
        }
    } catch (e) {
        console.error("API ERROR:", e);
    } finally {
        loading.value = false;
    }

});

// اختيار التصنيف
const selectCategory =  (cat) => {
    console.log(cat, 'selected');
   selectedCategory.value = cat
}

// التنقل للتفاصيل
const goToDetails = (productId) => {
  router.push({ name: "product", params: {  product_id: productId } });
}


// إضافة للسلة
const addToCart = async (productId) => {
    adding.value = true;
    console.log("Adding product to cart:", productId);
    try {
        await cartApi.add(productId, 1);
        showToast('تمت إضافة المنتج للسلة ✓');
    } catch (e) {
        console.error(e.response || e);
        showToast('حدث خطأ أثناء الإضافة', 'error');
    } finally {
        adding.value = false;
    }
}

//المنتجات  المعروضة )(ال3 الاولى)
const previewProducts = computed(() => {
    if (!selectedCategory.value) return [];
    return selectedCategory.value.products.slice(0, 3)
})


// الحصول على الصورة الرئيسية
const getPrimaryImage = (product) => {
    const primaryImg = product.images?.find(img => img.is_primary);
    if (primaryImg?.image_url) {
        return 'http://localhost:8000/' + primaryImg.image_url;
    }
    return '/fallback.png';
};


</script>

<template>
    <div class=" px-4 py-6">
        <section class="grip grid-cols-2 md:grip-cols-4 gap-4">
          <template v-if="loading">
            <skeleton-product v-for="n in 4" :key="n"/>
          </template>

          <template v-else>
              <h2 class="text-xl font-bold mb-4">التصنيفات</h2>
              <!-- شريط التصنيفات -->
               <div class="flex gap-6 overflow-x-auto pb-4">
                  <div v-for=" cat in categoriesAPI " :key="cat.id" class="flex flex-col items-center min-w-[80px] cursor-pointer" @click="selectCategory(cat)">
                      <div class="w-16 h-16 flex items-center justify-center rounded-full shadow transition" :class="{'ring-2 ring-blue-600': selectedCategory?.id === cat.id}">
                          <img src="../assets/images/myStoreDark.png" class=" w-10 h-10 object-contain" alt="">
                      </div>
                      <span class="mt-2 text-sm font-semibold" >{{ cat.name }}</span>
                  </div>
              </div>
              <!-- المنجات التابعة للتصنيف المختار -->
               <div v-if="selectedCategory && previewProducts.length > 0" class="mt-8">
                  <h2 class=" text-xl font-bold mb-4 text-center">{{ selectedCategory.name }}</h2>
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div v-for="product in  previewProducts" :key="product.id" class=" rounded-xl shadow p-3 text-center hover:scale-105 transition">
                          <img 
                           :src="product.iamge"
                           @error="$event.target.src = '/fallback.png'"
                           class="h-24 mx-auto mb-4 opacity-0 transition duration-700" 
                           alt="product image">
          
                          <h3 class=" text-sm font-semibold">{{ product.name }}</h3>
                          <p class=" text-sm ">{{ product.price }} ر.س</p>
                          <button title="عرض تفاصيل المنتج" @click="goToDetails(product.id)" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" class="px-3 py-1 rounded m-1"><i class="fas fa-eye"></i></button>
                          <button 
                          @click="addToCart(product.id)" 
                          :disabled="adding"  title="  إضافة المنتج إلى السلة" 
                          :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50'" 
                          class="px-3 py-1 rounded ">
                            <span v-if="!adding">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                          <span v-else class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"></span>
                          </button>
                      </div>
                  </div>
                  
                  <!-- عرض المزيد -->
                   <div class="text-center mt-6">
                      <router-link :to="`/category/${selectedCategory.id}`">عرض المزيد</router-link>
                   </div>
               </div> 
            <!-- لا توجد منتجات -->
            <div v-else class="text-center mt-8 text-gray-500">
                <p>لا توجد منتجات في هذا التصنيف</p>
            </div>
               
            </template>
        </section>
    </div>
</template>