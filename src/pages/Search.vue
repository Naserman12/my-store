<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">البحث عن المنتجات</h1>

    <template>

    </template>
    <div class="grid gap-4 md:grid-cols-3 mb-6">
      <input
        v-model="searchQuery"
        placeholder="بحث..."
        class="border px-4 py-2 rounded focus:ring-2 focus:ring-emerald-300"
      />
      <select
        v-model="selectedCategory"
        class="border px-4 py-3 rounded focus:ring-2 focus:ring-emerald-300"
      >
        <option value="">جميع التصنيفات</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      <button
        type="button"
        @click="clearFilters"
        class="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300"
      >
        مسح الفلاتر
      </button>
    </div>

    <div v-if="noResults" class="space-y-6">
      <div class="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        لا توجد نتائج مطابقة لبحثك.
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4">منتجات مقترحة</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="product in suggestedProducts"
            :key="product.id"
            class="animate-pulse bg-white shadow rounded-3xl p-4 hover:shadow-lg transition"
          >
            <img
              v-if="product.images && product.images[0]"
              :src="product.images[0]"
              alt="Product Image"
              class="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-slate-600 mb-2">{{ product.description || 'بدون وصف' }}</p>
            <p class="text-emerald-600 font-bold">الكمية: {{ product.quantity }}</p>
            <router-link
              :to="{ name: 'product', params: { id: product.id } }"
              class="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700"
            >
              عرض التفاصيل
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white shadow rounded-3xl p-4 hover:shadow-lg transition"
      >
        <img
          v-if="product.images && product.images[0]"
          :src="product.images[0]"
          alt="Product Image"
          class="w-full h-48 object-cover rounded-2xl mb-4"
        />
        <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-slate-600 mb-2">{{ product.description || 'بدون وصف' }}</p>
        <p class="text-emerald-600 font-bold">الكمية: {{ product.quantity }}</p>
        <router-link
          :to="{ name: 'product', params: { id: product.id } }"
          class="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700"
        >
          عرض التفاصيل
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { products, categories } from '../assets/data/productsApi';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query.q || '');
const selectedCategory = ref(route.query.category || '');

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  return products.filter((p) => {
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory.value || p.categoryId === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

const noResults = computed(
  () => searchQuery.value.trim() !== '' && filteredProducts.value.length === 0
);

const suggestedProducts = computed(() => products.slice(0, 6));

watch([searchQuery, selectedCategory], ([q, category]) => {
  const query = {};
  if (q.trim()) query.q = q.trim();
  if (category) query.category = category;
  router.replace({ query });
});

function clearFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
  router.replace({ query: {} });
}
</script>