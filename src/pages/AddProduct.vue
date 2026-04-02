<template>
    <div v-if="showToast1" class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white rounded-xl px-4 py-2 shadow-lg">
    {{ toastText }}
    </div>
  <div class="p-4 max-w-4xl mx-auto">
     <div class="flex justify-end mb-4">
      <router-link
        :to="{ name: 'AdminProducts' }"
        class="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
      >
        عرض منتجات المدير
      </router-link>
    </div>
    <AdminSidebar />
    <h1 class="text-3xl font-bold mb-6 text-center">إضافة منتج جديد</h1>

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
                v-model="form.features[index]"
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
            حفظ المنتج
          </button>
          <p v-if="successMessage" class="text-emerald-700 bg-emerald-100 rounded-2xl px-4 py-3">
            {{ successMessage }}
          </p>
        </div>
      </form>

      <div v-if="savedProduct" class="mt-8 p-5 rounded-3xl bg-emerald-50 text-emerald-900">
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
          <img :src="savedProduct.imagePreview" alt="صورة المنتج" class="mt-3 w-full max-w-sm rounded-2xl shadow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { products, categories } from '../assets/data/productsApi';
import AdminSidebar from '../components/admin/AdminSidebar.vue';
import { showToast } from '../stores/toast';

const showToast1 = ref(false)
const toastText = ref('')
const form = ref({
  categoryId: '',
  name: '',
  quantity: 1,
  description: '',
  imageFile: null,
  imagePreview: '',
  features: [''],
});

const successMessage = ref('');
const savedProduct = ref(null);

function onImageChange(event) {
  const file = event.target.files[0];
  if (!file) {
    form.value.imageFile = null;
    form.value.imagePreview = '';
    return;
  }

  form.value.imageFile = file;
  form.value.imagePreview = URL.createObjectURL(file);
}

function addFeature() {
  form.value.features.push('');
}

function removeFeature(index) {
  if (form.value.features.length > 1) {
    form.value.features.splice(index, 1);
  }
}

function submitProduct() {
  const name = form.value.name.trim();
  const features = form.value.features.map((item) => item.trim()).filter(Boolean);

  if (!name || features.length === 0) {
    const errorMessage = 'يرجى تعبئة اسم المنتج وإضافة ميزة واحدة على الأقل.';
    successMessage.value = errorMessage;
    toastText.value = errorMessage;
    showToast1.value = true;
    showToast('يرجى تعبئة اسم المنتج وإضافة ميزة واحدة على الأقل. ❌', 'error');

    setTimeout(() => {
      showToast1.value = false;
    }, 2000);
    return;
  }

  const newProduct = {
    id: products.length + 1,
    name,
    quantity: form.value.quantity,
    categories: [form.value.categoryId],
    oldPrice: 0,
    discount: 0,
    newPrice: 0,
    images: form.value.imagePreview ? [form.value.imagePreview] : [],
    features,
    description: form.value.description.trim(),
  };

  products.push(newProduct);
  savedProduct.value = { ...newProduct };
  successMessage.value = 'تم إضافة المنتج بنجاح.';
  toastText.value = successMessage.value;
  showToast1.value = true;
  showToast('تم إضافة المنتج بنجاح 🎉');

  setTimeout(() => {
    showToast1.value = false;
  }, 2000);

  form.value = {
    categoryId: '',
    name: '',
    quantity: 1,
    description: '',
    imageFile: null,
    imagePreview: '',
    features: [''],
  };
}
</script>

<style scoped>
.btn-soft {
  transition: all 0.2s ease;
}
</style>
