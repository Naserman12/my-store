<!-- src/pages/AdminProducts.vue -->
<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
           <AdminSidebar />
          <h1 class="text-3xl font-bold">إدارة المنتجات</h1>
          <button 
            @click="addNewProduct()"
            class="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            إضافة منتج جديد
          </button>
        </div>
        <!-- نموذج إضافة/edit المنتج -->
        <div  v-if="showForm" class="rounded-3xl border bg-white p-6 shadow">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">{{ isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد' }}</h2>
            <button @click="closeForm" class="text-slate-500 hover:text-slate-900">إغلاق</button>
         </div>
         <div class="mt-2">
           <div v-if="showForm" class="mt-6">
            <AddProduct 
              :product="editingProduct" 
              @saved="handleSaved"
              :key="editingProduct ? editingProduct.id : 'new'"
            />
           </div>
         </div>
      </div>

        <!-- شريط البحث والفلترة -->
        <div v-else class="grid gap-4 md:grid-cols-3">
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
            <option v-for="cat in categoriesAPI" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>

          <div class="rounded-3xl border px-4 py-3">
            عدد المنتجات: <strong>{{ filteredProducts.length  ?? productsAPI.length }}</strong>
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
                <td class="p-3">{{ product.category.name || 'غير محدد' }}</td>
                <td class="p-3">{{ product.quantity }}</td>
                <td class="p-3">
                  <span
                    :class="product.is_hidden ? 'text-red-700 bg-red-100 px-2 py-1 rounded-full' : 'text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full'"
                  >
                    {{ product.is_hidden ? 'مخفي' : 'ظاهر' }}
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
                    {{ product.is_hidden ? 'إظهار' : 'إخفاء' }}
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
              <tr v-if="loading">
                <td colspan="6" class="p-6 text-center text-slate-500">
                  جاري التحميل ...
                </td>
              </tr>
              <tr v-if="!filteredProducts.length && !loading">
                <td colspan="6" class="p-6 text-center text-slate-500">
                  لا توجد منتجات مطابقة
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
import { showToast } from '../../stores/toast';
import Swal from 'sweetalert2';
import productsApi from '../../api/productsApi';
import AddProduct from './AddProduct.vue';
import axios from '../../api/api'
const router = useRouter();

const searchText = ref('');
const filterCategoryId = ref('');
const showForm = ref(false);
const editingId = ref(null);
const showToast1 = ref(false)
const toastText = ref('')
const loading = ref(false)
const savedProduct = ref(null);
const categoriesAPI = ref([]);
const productsAPI = ref([]);
const editingProduct = ref(null);
const isEditing = computed(() => {
  return editingProduct.value !== null;
});
const fetchProducts = async () => {
  loading.value = true;
  try {
    const productsRes = await productsApi.getAllProducts();
    productsAPI.value = productsRes.data;   // ← هنا يتم تعبئة المنتجات
  } catch (e) {
    console.error(e);
  }
  loading.value = false;
};
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
const filteredProducts = computed(() => {
  return (productsAPI.value || []).filter((product) => {
    const search = searchText.value.toLowerCase().trim();
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      (product.description || '').toLowerCase().includes(search);

    const matchesCategory =
      !filterCategoryId.value ||
      (product.categoryId ?? product.categories?.[0]) === filterCategoryId.value;

    return matchesSearch && matchesCategory;
  });
});
// open Edit form
function openEdit(product){
  editingProduct.value = product;
  showForm.value = true;
}
function addNewProduct() {
  showForm.value = !showForm.value;
  editingProduct.value = null; // نموذج فارغ
}
function handleSaved(product) {
  // إغلاق الفورم
  showForm.value = false;
  // مسح حالة التعديل
  editingProduct.value = null;
  // تحديث قائمة المنتجات 
  fetchProducts();
  // رسالة نجاح
  toastText.value = "تم حفظ المنتج بنجاح";
  showToast1.value = true;
  setTimeout(() => showToast1.value = false, 3000);
}
// حذف المنتج
const deleteProduct = async (productId) => {
  if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
  try {
    await axios.delete(`/admin/products/${productId}`);
    showToast('تم حذف المنتج بنجاح 🎉', 'info');
  } catch (e) {
    console.error('Error:', e);
    const message = e.response?.data?.message || e.response?.data?.error || 'حدث خطأ أثناء الحذف';
    showToast(message, 'error');
  }
}
async  function toggleVisibility(product) {
    try {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    const isHidden = formData.append('is_hidden', product.is_hidden ? 0 : 1);
    const res = await axios.post(
     `/admin/products/${product.id}/${isHidden ? 'hide' : 'show'}`,
      formData,
     { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    product.is_hidden = !product.is_hidden;
      if (product.is_hidden) {
      showToast('تم إخفاء المنتج بنجاح', 'warning');
    } else {
      showToast('تم إظهار المنتج بنجاح 🎉', 'success');
    }
    } catch (e) {
    console.error('Error:', e);
    const message =
      e.response?.data?.message ||
      e.response?.data?.error ||
      'حدث خطأ أثناء تحديث الحالة';

    showToast(message, 'error');
      product.is_hidden = !product.is_hidden; // revert change on error}
    }
}
function resetForm() {
  editingId.value = null;
  editingProduct.value = null;
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
onMounted(fetchProducts);
</script>