<template>

<div class="p-6 max-w-3xl mx-auto">

<h1 class="text-xl font-bold mb-6">طلباتي</h1>

<div
v-for="order in userOrders"
:key="order.id"
class="bg-white shadow rounded p-4 mb-4">

<p>طلب رقم #{{ order.id }}</p>

<OrderTracker :status="order.status" />

</div>

</div>

</template>

<script setup>
import { computed } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import OrderTracker from '@/components/orders/OrderTracker.vue'

const store = useOrdersStore()

const userEmail = localStorage.getItem('userEmail')

const userOrders = computed(() =>
  store.orders.filter(o => o.userEmail === userEmail)
)
</script>