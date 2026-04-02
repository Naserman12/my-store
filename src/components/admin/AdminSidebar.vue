<!-- src/components/admin/AdminSidebar.vue -->
<template>
  <aside class="w-full">
    <div class="sticky top-6 space-y-4">
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold">لوحة المدير</h2>
        <nav class="space-y-2">
          <router-link
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            class="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-emerald-50"
            :class="route.path === link.to ? 'bg-emerald-600 text-white' : 'text-slate-700 bg-white'"
          >
            {{ link.name }}
          </router-link>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const links = [
  { name: 'الرئيسية', to: '/admin' },
  { name: 'إدارة المنتجات', to: '/admin/products' },
  { name: 'إضافة منتج', to: '/add-product' },
];
</script>