<template>
  <div class="p-2 max-w-4xl mx-auto">
    <div v-if="showToast1" class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white rounded-xl px-4 py-2 shadow-lg">
    {{ toastText }}
    </div>
     <div class="flex justify-end mb-4">
    </div>
    <div class="bg-white shadow rounded-3xl p-6 dark:bg-emerald-900 dark:text-amber-100">
      <form @submit.prevent="submitProduct" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="block">
            <span class="text-sm font-medium">اسم المنتج</span>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="اكتب اسم المنتج"
              class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </label>
<!-- السعر -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <label class="block">
    <span class="text-sm font-medium">السعر</span>
    <input
      v-model.number="form.price"
      type="number"
      min="0"
      required
      placeholder="مثال: 120"
      class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
    />
  </label>

  <label class="block">
    <span class="text-sm font-medium">السعر بعد الخصم (اختياري)</span>
    <input
      v-model.number="form.sale_price"
      type="number"
      min="0"
      placeholder="مثال: 99"
      class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
    />
  </label>
</div>
        <!-- الكمية -->
          <label class="block">
            <span class="text-sm font-medium">الكمية</span>
            <input
              v-model.number="form.quantity"
              type="number"
              min="1"
              required
              placeholder="مثال: 10"
              class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </label>
        </div>
        <!-- رمز المنتج (SKU) -->
        <label class="block">
  <span class="text-sm font-medium">رمز المنتج (SKU)</span>
  <input
    v-model="form.sku"
    type="text"
    required
    placeholder="مثال: SKU-12345"
    class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
  />
</label>
<!-- خيارات المنتج -->
<div class="flex items-center gap-4 mt-4">
  <label class="flex items-center gap-2">
    <input type="checkbox" v-model="form.is_featured" />
    مميز
  </label>

  <label class="flex items-center gap-2">
    <input type="checkbox" v-model="form.is_hidden" />
    مخفي
  </label>
</div>


        <!-- الرابط (Slug) -->
        <label class="block">
  <span class="text-sm font-medium">الرابط (Slug)</span>
  <input
    v-model="form.slug"
    type="text"
    required
    placeholder="مثال: wireless-mouse"
    class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
  />
</label>
        <!-- التصنيف -->
        <label class="block">
  <span class="text-sm font-medium">التصنيف</span>
  <select
    v-model="form.categoryId"
    required
    class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
  >
    <option value="" disabled>اختر التصنيف</option>
    <option class="dark:bg-emerald-700" v-for="cat in categories" :key="cat.id" :value="cat.id">
      {{ cat.name }}
    </option>
  </select>
</label>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="block">
            <span class="text-sm font-medium">صورة المنتج</span>
            <input
              type="file"
              accept="image/*"
              @change="onImageChange"
              class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </label>

          <label class="block">
            <span class="text-sm font-medium">الوصف</span>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="اكتب وصف المنتج"
              class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
            ></textarea>
          </label>
        </div>

        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium">ميزات المنتج</span>
            <button
              type="button"
              @click="addFeature"
              class="text-sm text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-full"
            >
              إضافة ميزة
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="(feature, index) in form.features"
              :key="index"
              class="flex items-center gap-3"
            >
              <input
                v-model="form.features[feature]"
                type="text"
                required
                placeholder="اكتب الميزة"
                class="flex-1 rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <button
                type="button"
                @click="removeFeature(index)"
                class="text-red-600 hover:text-red-800"
              >
                حذف
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <button
            type="submit"
            class="w-full md:w-auto bg-emerald-600 text-white rounded-full px-6 py-3 hover:bg-emerald-700"
          >
            <span v-if="!loading"> {{ isEditing ? 'حفظ التعديلات' : 'حفظ المنتج' }} </span>
                <!-- spinner -->
                 <span v-else
                 class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 "
                 ></span>
           
          </button>
          <p v-if="successMessage" class="text-emerald-700 bg-emerald-100 rounded-2xl px-4 py-3">
            {{ successMessage }}
          </p>
        </div>
      </form>

      <!-- <div v-if="savedProduct" class="mt-8 p-5 rounded-3xl bg-emerald-50 text-emerald-900">
        <h2 class="text-xl font-semibold mb-3">تم إضافة المنتج بنجاح</h2>
        <p><strong>اسم المنتج:</strong> {{ savedProduct.name }}</p>
        <p><strong>الكمية:</strong> {{ savedProduct.quantity }}</p>
        <p class="mt-3"><strong>الوصف:</strong> {{ savedProduct.description }}</p>
        <div v-if="savedProduct.features.length" class="mt-3">
          <strong>الميزات:</strong>
          <ul class="list-disc list-inside">
            <li v-for="(item, idx) in savedProduct.features" :key="idx">{{ item }}</li>
          </ul>
        </div>
        <div v-if="savedProduct.imagePreview" class="mt-4">
          <strong>معاينة الصورة:</strong>
          <img :src="`http://localhost:8000/storage/${savedProduct.image}`"  alt="صورة المنتج" class="mt-3 w-full max-w-sm rounded-2xl shadow" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch  } from 'vue';
import { showToast } from '../../stores/toast';
import axios from '../../api/api'

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
});
const categories = ref([])
const showToast1 = ref(false)
const toastText = ref('')
const loading = ref(false)
const savedProduct = ref(null);
const showForm = ref(false)
const editingId = ref(null)

const isEditing = computed(() => props.product !== null);
console.log('isEditing:', isEditing.value, 'editingId:', editingId.value)
const emit = defineEmits(['saved']);


// نموذج بيانات المنتج الجديد
const form = ref({
  categoryId: '',
  name: '',
  slug: '',
  price: 0,
  sale_price: null,
  sku: '',
  quantity: 1,
  description: '',
  is_featured: false,
  is_hidden: false,
  image: null,
  features: [''],
});
// وظيفة إعادة تعيين النموذج بعد الإضافة الناجحة
const resetForm = () => {
  if (!isEditing) {
    form.value = {
      categoryId: '',
      name: '',
      slug: '',
      price: 0,
      sale_price: null,
      sku: '',
      quantity: 1,
      description: '',
      is_featured: false,
      is_hidden: false,
      image: null,
      features: [''],
    }
  }
}
const successMessage = ref('');
const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.imageFile = file;

  }
};

function addFeature() {
  form.value.features.push('');
}

const removeFeature = (index) => {
  if (form.value.features.length > 1) {
    form.value.features.splice(index, 1);
  }
}

// عند وصول بيانات المنتج → نملأ النموذج
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      // وضع بيانات التعديل
      form.value = {
        categoryId: newVal.category?.id || '',
        name: newVal.name,
        slug: newVal.slug,
        price: newVal.price,
        sale_price: newVal.sale_price,
        sku: newVal.sku,
        quantity: newVal.quantity,
        description: newVal.description,
        is_featured: newVal.is_featured,
        is_hidden: newVal.is_hidden,
        image: null,
        features: newVal.features?.length ? [...newVal.features] : [''],
      };
    } else {
      // إعادة النموذج فارغ عند الإضافة
      resetForm();
    }
  },
  { immediate: true }
);
// وظيفة إرسال البيانات إلى السيرفر لإضافة المنتج الجديد
const submitProduct = async () => {
 loading.value = true;
 showToast.value = '';
 showToast1.value = false;
   const name = form.value.name.trim();
  const features = form.value.features.map((item) => item.trim()).filter(Boolean);
  try {
    const formData = new FormData()
    console.log('Form Data: ', form)
    formData.append('name', form.value.name)
    formData.append('description', form.value.description || '')
    formData.append('quantity', form.value.quantity)
    formData.append('category_id', form.value.categoryId)
    formData.append('slug', form.value.slug)
    formData.append('price', form.value.price)
    formData.append('sale_price', form.value.sale_price || '')
    formData.append('sku', form.value.sku)
    formData.append('is_featured', form.value.is_featured ? 1 : 0)
    formData.append('is_hidden', form.value.is_hidden ? 1 : 0)

    if (form.value.imageFile) {
      formData.append('image', form.value.imageFile)
    }
    // ارسال الميزات
    form.value.features.forEach((f, i) => {
         if (f.trim()) {
              formData.append(`features[${i}]`, f);
          }
    
    })
    let res;
     if (isEditing.value) {
      // تحديث
      res = await axios.post(
        `/admin/products/${props.product.id}?_method=PUT`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      showToast('تم تحديث المنتج بنجاح 🎉');
    } else {
      // إضافة
      res = await axios.post(
        '/admin/products',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
              showToast('تم إضافة المنتج بنجاح 🎉');
    }
    console.log(res.data)
    savedProduct.value = res.data
    showToast('تم إضافة المنتج بنجاح 🎉')
    emit('saved', res.data);
    loading.value = false;
    resetForm()
     emit('saved', res.data);
  } catch (e) {
        console.error('Error:', e);
        const message = e.response?.data?.message || e.response?.data?.error || 'حدث خطأ أثناء الإضافة';
        toastText.value = message;
        showToast1.value = true;
        showToast(message, 'error');
        setTimeout(() => {
            showToast1.value = false;
        }, 3000);
  }finally {
        loading.value = false;
    }
}

// تحميل التصنيفات من السيرفر
const loadCategories = async () => {
  const res = await axios.get('/categories')
  categories.value = res.data
}
onMounted(loadCategories)
</script>

<style scoped>
.btn-soft {
  transition: all 0.2s ease;
}
</style>

