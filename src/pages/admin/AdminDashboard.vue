<template>
<div class="p-6 space-y-6">
  <AdminSidebar />
  <h1 class="text-2xl font-bold">
    📊 لوحة تحكم المتجر
  </h1>
<!-- الاحصائيات -->
<div class="grid md:grid-cols-4 gap-4">

  <StatCard title="إجمالي المبيعات" :value="totalSales + ' ر.س'" />
  <StatCard title="طلبات اليوم" :value="todaySales + ' ر.س'" />
  <StatCard title="هذا الأسبوع" :value="weeklySales + ' ر.س'" />
  <StatCard title="هذا الشهر" :value="monthlySales + ' ر.س'" />

</div>

<!-- الطلبات الأخيرة -->
<div class="bg-white rounded-xl shadow p-4">

<h2 class="font-bold mb-4">آخر الطلبات</h2>

<table class="w-full text-right">

<tr class="border-b font-semibold">
  <th>رقم الطلب</th>
  <th>التاريخ</th>
  <th>الحالة</th>
  <th>الإجمالي</th>
</tr>

<tr v-for="order in latestOrders" :key="order.id">
  <td>{{ order.id }}</td>
  <td> {{ new Date(order.created_at).toLocaleDateString() }} </td>
  <td>{{ order.status }}</td>
  <td>{{ order.total }} ر.س</td>
</tr>

</table>

</div>

</div>
</template>

<script setup>
import { computed,onMounted } from 'vue'
import StatCard from '../../components/admin/StatCard.vue'
import AdminSidebar from '../../components/admin/AdminSidebar.vue'
import { useAdminStore } from '../../stores/admin.js'

const adminStore = useAdminStore()

onMounted(() => {
  adminStore.fetchDashboard()
  adminStore.fetchLatestOrders()
})
const totalSales = computed(() => adminStore.stats.total_sales || 0)
const todaySales = computed(() => adminStore.stats.today_sales || 0)
const weeklySales = computed(() => adminStore.stats.weekly_sales || 0)
const monthlySales = computed(() => adminStore.stats.monthly_sales || 0)

const latestOrders = computed(() =>
  adminStore.latestOrders
)
console.log("Latest Orders:", latestOrders.value)
</script>
