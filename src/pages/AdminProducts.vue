<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl font-bold">إدارة المنتجات</h1>

        <button
          @click="goToAddProduct"
          class="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          إضافة منتج جديد
        </button>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <input
          v-model="searchText"
          type="search"
          placeholder="بحث باسم المنتج..."
          class="rounded-3xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
        />

        <select
          v-model="filterCategoryId"
          class="rounded-3xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <option value="">جميع التصنيفات</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <div class="rounded-3xl border px-4 py-3">
          عدد المنتجات: <strong>{{ filteredProducts.length }}</strong>
        </div>
      </div>

      <div class="overflow-x-auto rounded-3xl border bg-white shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-emerald-50 text-emerald-900">
            <tr>
              <th class="p-3 text-left">#</th>
              <th class="p-3 text-left">المنتج</th>
              <th class="p-3 text-left">التصنيف</th>
              <th class="p-3 text-left">الكمية</th>
              <th class="p-3 text-left">الحالة</th>
              <th class="p-3 text-left">خيارات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="product.id" class="border-t">
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3">
                <div class="font-semibold">{{ product.name }}</div>
                <div class="mt-1 text-slate-500 text-xs">
                  {{ product.description ? product.description.slice(0, 60) + (product.description.length > 60 ? '...' : '') : 'بدون وصف' }}
                </div>
              </td>
              <td class="p-3">
                {{ getCategoryName(product) }}
              </td>
              <td class="p-3">{{ product.quantity }}</td>
              <td class="p-3">
                <span
                  :class="product.hidden ? 'text-red-700 bg-red-100 px-2 py-1 rounded-full' : 'text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full'"
                >
                  {{ product.hidden ? 'مخفي' : 'ظاهر' }}
                </span>
              </td>
              <td class="p-3 space-x-2 flex flex-wrap gap-2">
                <button
                  @click="openEdit(product)"
                  class="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  تعديل
                </button>
                <button
                  @click="toggleVisibility(product)"
                  class="rounded-full bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                >
                  {{ product.hidden ? 'إظهار' : 'إخفاء' }}
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  حذف
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="p-6 text-center text-slate-500">
                لا توجد منتجات مطابقة
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="showForm" class="rounded-3xl border bg-white p-6 shadow">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-2xl font-semibold">
            {{ isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد' }}
          </h2>
          <button @click="closeForm" class="text-slate-500 hover:text-slate-900">إغلاق</button>
        </div>

        <form @submit.prevent="saveProduct" class="mt-6 space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
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

          <div class="grid gap-4 md:grid-cols-2">
            <label class="block">
              <span class="text-sm font-medium">التصنيف</span>
              <select
                v-model="form.categoryId"
                required
                class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <option value="" disabled>اختر التصنيف</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium">صورة المنتج</span>
              <input
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </label>
          </div>

          <label class="block">
            <span class="text-sm font-medium">الوصف</span>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="اكتب وصف المنتج"
              class="mt-2 w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-300"
            ></textarea>
          </label>

          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">ميزات المنتج</span>
            <button
              type="button"
              @click="addFeature"
              class="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-200"
            >
              إضافة ميزة
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="(feature, index) in form.features"
              :key="index"
              class="flex flex-col gap-2 md:flex-row md:items-center"
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
                class="self-start rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
              >
                حذف
              </button>
            </div>
          </div>

          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="form.hidden" class="h-4 w-4 rounded border-slate-300 text-emerald-600" />
            <span class="text-sm font-medium">اجعل المنتج مخفي</span>
          </label>

          <div class="flex flex-wrap gap-3">
            <button
              type="submit"
              class="rounded-full bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
            >
              {{ isEditing ? 'حفظ التعديلات' : 'حفظ المنتج' }}
            </button>
            <button
              type="button"
              @click="resetForm()"
              class="rounded-full bg-slate-100 px-6 py-3 text-slate-700 hover:bg-slate-200"
            >
              إعادة تعيين
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { products, categories } from '../assets/data/productsApi';

const router = useRouter();
const productList = ref(products);
const searchText = ref('');
const filterCategoryId = ref('');
const showForm = ref(false);
const editingId = ref(null);

const form = ref({
  id: null,
  name: '',
  quantity: 1,
  categoryId: '',
  description: '',
  hidden: false,
  features: [''],
  imagePreview: '',
});

const isEditing = computed(() => editingId.value !== null);

function getCategoryName(product) {
  const categoryId = product.categoryId ?? product.categories?.[0] ?? '';
  return categories.find((cat) => cat.id === categoryId)?.name || 'غير محدد';
}

function goToAddProduct() {
  router.push({ name: 'add-product' });
}
const filteredProducts = computed(() => {
  return productList.value.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText.value.toLowerCase().trim()) ||
      (product.description || '').toLowerCase().includes(searchText.value.toLowerCase().trim());

    const matchesCategory =
      !filterCategoryId.value ||
      (product.categoryId ?? product.categories?.[0]) === filterCategoryId.value;

    return matchesSearch && matchesCategory;
  });
});

function openAdd() {
  resetForm();
  showForm.value = true;
  editingId.value = null;
}

function openEdit(product) {
  showForm.value = true;
  editingId.value = product.id;
  form.value = {
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    categoryId: product.categoryId ?? product.categories?.[0] ?? '',
    description: product.description || '',
    hidden: product.hidden || false,
    features: product.features ? [...product.features] : [''],
    imagePreview: product.images?.[0] ?? '',
  };
}

function handleImageChange(event) {
  const file = event.target.files[0];
  if (!file) {
    form.value.imagePreview = '';
    return;
  }
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

function saveProduct() {
  const name = form.value.name.trim();
  const features = form.value.features.map((item) => item.trim()).filter(Boolean);

  if (!name || features.length === 0 || !form.value.categoryId) {
    return;
  }

  const productData = {
    id: editingId.value ? editingId.value : Date.now(),
    name,
    quantity: form.value.quantity,
    categoryId: form.value.categoryId,
    description: form.value.description.trim(),
    hidden: form.value.hidden,
    features,
    images: form.value.imagePreview ? [form.value.imagePreview] : [],
  };

  if (editingId.value) {
    const index = productList.value.findIndex((item) => item.id === editingId.value);
    if (index !== -1) {
      productList.value[index] = {
        ...productList.value[index],
        ...productData,
      };
    }
  } else {
    productList.value.push(productData);
  }

  resetForm();
  showForm.value = false;
}

function deleteProduct(id) {
  const index = productList.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    productList.value.splice(index, 1);
  }
}

function toggleVisibility(product) {
  product.hidden = !product.hidden;
}

function resetForm() {
  editingId.value = null;
  form.value = {
    id: null,
    name: '',
    quantity: 1,
    categoryId: '',
    description: '',
    hidden: false,
    features: [''],
    imagePreview: '',
  };
}

function closeForm() {
  showForm.value = false;
  resetForm();
}
</script>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>