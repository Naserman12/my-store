<template>

<div class="max-w-4xl mx-auto p-6">

<h1 class="text-2xl font-bold mb-6">
طلباتي
</h1>

<div v-if="orders.length">

<div
v-for="order in orders"
:key="order.id"
class="border rounded-lg p-4 mb-4 shadow-sm"
>

<div class="flex justify-between mb-2">
  <p class="font-bold">{{ order.id }}</p>
  <span class="text-emerald-600">
    {{ order.status }}
  </span>
</div>

<p class="text-sm text-gray-500">
{{ order.date }}
</p>

<div class="mt-3">
  <p v-for="item in order.items" :key="item.id">
    {{ item.name }} × {{ item.quantity }}
  </p>
</div>

<p class="font-bold mt-3">
الإجمالي: {{ order.total }} ر.س
</p>

</div>

</div>

<p v-else class="text-center text-gray-500">
لا توجد طلبات بعد
</p>

</div>
</template>

<script setup>
import { useOrdersStore } from '../stores/orders'
import { computed } from 'vue'

const ordersStore = useOrdersStore()
const orders = computed(()=> ordersStore.orders)
</script>