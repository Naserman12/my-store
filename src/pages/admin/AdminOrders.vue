<template>

<div class="p-6 space-y-6">

  <AdminSidebar />
<h1 class="text-2xl font-bold">
📦 إدارة الطلبات
</h1>

<table class="w-full bg-white rounded-xl shadow">

<thead class="border-b">
<tr class="text-right">
<th>#</th>
<th>العميل</th>
<th>الحالة</th>
<th>الإجمالي</th>
<th>التاريخ</th>
<th>تغيير الحالة</th>
</tr>
</thead>

<tbody>
          <template v-if="loading">
            <skeleton-product v-for="n in 4" :key="n"/>
          </template>
<tr v-for="order in orders" :key="order.id" class="border-b">

<td>{{ order.id }}</td>

<td>
{{ order.user?.name }}
<br>
<span class="text-xs text-gray-500">
{{ order.user?.email }}
</span>
</td>
<!-- تحديث الحالة -->
<div class="bg-white p-4 rounded-xl shadow flex items-center gap-4">

<h2 class="font-bold">حالة الطلب:</h2>

<select
v-model="selectedStatus"
class="border rounded-lg px-3 py-2"
>

<option value="pending">بانتظار المعالجة</option>
<option value="processing">جاري التجهيز</option>
<option value="shipped">تم الشحن</option>
<option value="delivered">تم التسليم</option>
<option value="cancelled">ملغي</option>

</select>

<button
@click="updateStatus"
class="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
>
تحديث
</button>

</div>

<td>
<span class="px-3 py-1 rounded-full text-sm bg-gray-100">
{{ order.status }}
</span>
</td>

<td>{{ order.total }} ر.س</td>

<td>
{{ formatDate(order.created_at) }}
</td>

<td>

<select
class="border rounded p-2"
:value="order.status"
@change="changeStatus(order.id, $event.target.value)"
>
<!-- <option value="pending">بانتظار المعالجة</option>
<option value="processing">جاري التجهيز</option>
<option value="shipped">تم الشحن</option>
<option value="delivered">تم التسليم</option>
<option value="cancelled">ملغي</option> -->
<span
:class="{
  'text-yellow-600': order.status === 'pending',
  'text-blue-600': order.status === 'processing',
  'text-purple-600': order.status === 'shipped',
  'text-green-600': order.status === 'delivered',
  'text-red-600': order.status === 'cancelled'
}"
>
{{ order.status }}
</span>
</select>

</td>

</tr>

</tbody>

</table>

</div>

</template>

<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useAdminOrdersStore } from '../../stores/adminOrders'
import SkeletonProduct from '../../components/SkeletonProduct.vue';
import AdminSidebar from '../../components/admin/AdminSidebar.vue';


const store = useAdminOrdersStore();
const selectedStatus = ref('');
const loading = ref(true);

onMounted(() => {
  store.fetchOrders()
})
const order = ref(null);
const orders = computed(() => store.orders)

const changeStatus = (id, status) => {
  store.updateStatus(id, status)
}
const updateStatus = async () => {

  await store.updateStatus(order.value.id, selectedStatus.value)

  showToast('تم تحديث الحالة ✅')
}
watch(order, (val) => {
  loading.value =true
  if (val) selectedStatus.value = val.status
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString()

</script>