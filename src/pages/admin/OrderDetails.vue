<template>
<div class="p-6 max-w-4xl mx-auto">

<h1 class="text-2xl font-bold mb-6">
تفاصيل الطلب #{{ order.id }}
</h1>

<!-- المنتجات -->
<div class="bg-white p-4 rounded shadow mb-6">

<div v-for="item in order.items" :key="item.id"
class="flex justify-between border-b py-2">

<p>{{ item.name }}</p>
<p>x{{ item.quantity }}</p>

</div>

</div>

<!-- تغيير الحالة -->
<div class="bg-white p-4 rounded shadow">

<h2 class="font-bold mb-3">تغيير حالة الطلب</h2>

<select
v-model="selectedStatus"
class="border p-2 rounded w-full">

<option v-for="(label, key) in STATUS_LABELS"
:key="label" :value="key">
{{ label }}
</option>

</select>

<button
@click="update"
class="mt-4 bg-emerald-600 text-white px-4 py-2 rounded">
حفظ
</button>

</div>

</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useOrdersStore } from '../../stores/orders'
import { STATUS_LABELS } from '../../stores/orderStatus'

const route = useRoute()
const store = useOrdersStore()

const order = computed(() =>
  store.orders.find(o => o.id == route.params.id)
)

const selectedStatus = ref(order.value.status)

function update(){
  store.updateStatus(order.value.id, selectedStatus.value)
}
</script>