<template>

<div class="p-6 space-y-6 m-2">

  <AdminSidebar />
<h1 class="text-2xl font-bold">
📦 إدارة الطلبات
</h1>
            <template v-if="loading">
            <skeleton-product v-for="n in 4" :key="n"/>
          </template>
<table v-if="!loading" class="w-full bg-emerald-100 rounded-xl shadow m-2">

<thead class="border-b items-center">
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
<tr v-for="order in orders" :key="order.id" class="border-b">
  <td>{{ order.id }}</td>
  <td>{{ order.user?.name }}</td>
  <td>{{ order.status }}</td>
  <td>{{ order.total }} ر.س</td>
  <td>{{ formatDate(order.created_at) }}</td>
  <td>
    <select
      :value="order.status"
      @change="changeStatus(order.id, $event.target.value)"
      class="border rounded-lg px-3 py-2"
    >
      <option value="pending">بانتظار المعالجة</option>
      <option value="processing">جاري التجهيز</option>
      <option value="shipped">تم الشحن</option>
      <option value="delivered">تم التسليم</option>
      <option value="cancelled">ملغي</option>
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
import {showToast} from '../../stores/toast';

const store = useAdminOrdersStore();
const loading = ref(true);
// الحالة المختارة لتحديث الطلب
const selectedStatus = ref('');
const currentOrderId = ref(null);


const order = ref(null);
const orders = computed(() => store.orders)


// تغيير الحالة من داخل الجدول
const changeStatus = async (id, status) => {
  await store.updateStatus(id, status);
  showToast('تم تحديث الحالة بنجاح');
};
// تحديث الحالة من النموذج الخارجي
const updateStatus = async () => {
  if (!currentOrderId.value) return;

  await store.updateStatus(currentOrderId.value, selectedStatus.value);
  showToast('تم تحديث الحالة بنجاح');
};
// const updateStatus = async () => {
//   order.value.status = selectedStatus.value
//   await store.updateStatus(order.value.id, selectedStatus.value)
//   showToast('تم تحديث الحالة ✅')
// }
// عند اختيار طلب لعرض نموذج التحديث
const selectOrder = (order) => {
  currentOrderId.value = order.id;
  selectedStatus.value = order.status;
};
watch(order, (val) => {
  if (val) selectedStatus.value = val.status
  
})
onMounted(() => {
  setTimeout(() => 
  loading.value =false
  , 3000);
  loading.value = true,
  store.fetchOrders()
  console.log(orders.value)
})


const formatDate = (date) =>
  new Date(date).toLocaleDateString()
</script>