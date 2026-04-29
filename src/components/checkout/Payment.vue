<template>
<div class="min-h-screen py-10 px-4"
     :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'">

  <div class="max-w-2xl mx-auto">

    <h1 class="text-3xl font-bold mb-8 text-center">
      💳 الدفع
    </h1>

    <!-- معلومات الطلب -->
    <div class="p-5 rounded-xl shadow mb-6"
         :class="darkMode ? 'bg-gray-800' : 'bg-white'">

      <p class="font-bold text-lg mb-2">رقم الطلب: #{{ order.id }}</p>

      <div class="flex justify-between">
        <span>الإجمالي</span>
        <span class="font-bold">{{ order.total }} ر.س</span>
      </div>

    </div>

    <!-- 🧾 التايم لاين -->
<div
  v-if="order.status_logs?.length"
  class="p-5 rounded-xl shadow mb-6"
  :class="darkMode ? 'bg-gray-800' : 'bg-white'"
>
  <h2 class="font-bold mb-4">📊 حالة الطلب</h2>

  <div class="space-y-3">
    <div
      v-for="log in order.status_logs"
      :key="log.id"
      class="flex items-start gap-3"
    >
      <!-- النقطة -->
      <div class="w-3 h-3 mt-2 rounded-full bg-emerald-500"  :class="{
    'bg-yellow-400': log.status === 'pending_payment',
    'bg-blue-400': log.status === 'processing',
    'bg-green-500': log.status === 'paid'
  }"></div>

      <!-- المحتوى -->
      <div>
        <p class="font-semibold">{{ log.status }}</p>
        <p class="text-sm opacity-70">{{ log.note }}</p>
        <p class="text-xs opacity-50">
          {{ new Date(log.created_at).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</div>
    <!-- طرق الدفع -->
    <div class="p-5 rounded-xl shadow mb-6"
         :class="darkMode ? 'bg-gray-800' : 'bg-white'">

      <h2 class="font-bold mb-4">اختر طريقة الدفع</h2>

      <div class="space-y-3">

        <div
          v-for="method in methods"
          :key="method.value"
          @click="selected = method.value"
          class="p-3 rounded border cursor-pointer transition flex justify-between items-center"
          :class="[
            darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-100',
            selected === method.value ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-800' : ''
          ]"
        >
          <span>{{ method.label }}</span>
          <span v-if="selected === method.value">✔</span>
        </div>

      </div>
    </div>

    <!-- زر الدفع -->
    <button
      @click="pay"
      class="w-full py-3 rounded-lg font-bold transition"
      :class="darkMode
        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
        : 'bg-emerald-600 hover:bg-emerald-700 text-white'"
    >
      تأكيد الدفع 💰
    </button>

  </div>
</div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "../../api/api"
import { showToast } from "../../stores/toast"
import { useDarkMode } from "../../components/useDarkMode"

const { darkMode } = useDarkMode()

const route = useRoute()
const router = useRouter()

const order = ref({})
const selected = ref("cash")

const methods = [
  { label: "الدفع عند الاستلام", value: "cash" },
  { label: "بطاقة بنكية", value: "card" },
  { label: "Apple Pay", value: "apple_pay" }
]
const loading = ref(true)


// تحميل الطلب
const loadOrder = async () => {
  try {
    const res = await api.get(`/auth/my-orders/${route.params.id}`)
    console.log('res payment => ', res.data)
    order.value = res.data
  } catch (e) {
    console.log(e.response || e)
    showToast("فشل تحميل الطلب", "error")
  } finally {
    loading.value = false
  }
}

// الدفع
const pay = async () => {
  try {
    await api.post("/auth/pay", {
      order_id: order.value.id,
      payment_method: selected.value
    })

    showToast("تم الدفع بنجاح 💳")

    router.push("/success")

  } catch (e) {
    console.log(e.response || e);
    showToast("فشل الدفع", "error");
  }
}

onMounted(loadOrder)
</script>