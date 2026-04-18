<template>
  <div class="min-h-screen bg-gray-100 p-6 space-y-6">

    <AdminSidebar />

    <h1 class="text-3xl font-bold text-gray-800 mb-4">
      📊 لوحة تحكم المتجر
    </h1>

    <!-- الإحصائيات -->
    <div class="grid md:grid-cols-4 gap-4">
      <StatCard 
        title="إجمالي المبيعات" 
        :value="totalSales + ' ر.س'"
        class="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
      />

      <StatCard 
        title="طلبات اليوم" 
        :value="todaySales + ' ر.س'"
        class="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white shadow-lg"
      />

      <StatCard 
        title="هذا الأسبوع" 
        :value="weeklySales + ' ر.س'"
        class="bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg"
      />

      <StatCard 
        title="هذا الشهر" 
        :value="monthlySales + ' ر.س'"
        class="bg-gradient-to-r from-teal-600 to-teal-400 text-white shadow-lg"
      />
    </div>

    <!-- الطلبات الأخيرة -->
    <div class="bg-white rounded-xl shadow p-6">

      <h2 class="text-xl font-bold text-gray-700 mb-4">
        🧾 آخر الطلبات
      </h2>

      <template v-if="loading">
        <skeleton-product v-for="n in 4" :key="n" />
      </template>

      <table 
        v-if="!loading" 
        class="w-full text-right bg-white rounded-xl overflow-hidden shadow"
      >
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="p-3">رقم الطلب</th>
            <th class="p-3">التاريخ</th>
            <th class="p-3">الحالة</th>
            <th class="p-3">الإجمالي</th>
          </tr>
        </thead>

        <tbody>
          <tr 
            v-for="order in latestOrders" 
            :key="order.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="p-3 font-semibold text-gray-800">{{ order.id }}</td>
            <td class="p-3">{{ new Date(order.created_at).toLocaleDateString() }}</td>
            <td class="p-3">
              <span 
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-green-100 text-green-700': order.status === 'completed',
                  'bg-yellow-100 text-yellow-700': order.status === 'pending',
                  'bg-teal-100 text-teal-700': order.status === 'delivered',
                  'bg-red-100 text-red-700': order.status === 'cancelled'
                }"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="p-3 font-bold text-blue-600">{{ order.total }} ر.س</td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>



<script setup>
import { computed, ref, onMounted } from 'vue';
import StatCard from '../../components/admin/StatCard.vue';
import SkeletonProduct from '../../components/SkeletonProduct.vue';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
import { useAdminStore } from '../../stores/admin.js';

const adminStore = useAdminStore()
const loading = ref(true);
onMounted(() => {
  setTimeout(() => 
  loading.value =false
  , 3000);
   loading.value = true
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
