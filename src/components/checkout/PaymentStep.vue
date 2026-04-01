<template>
<div class="space-y-6">

  <!-- عنوان -->
  <h2 class="text-xl font-bold">الدفع</h2>

  <!-- ملخص الطلب -->
  <div class="border rounded-lg p-4 space-y-2">

    <h3 class="font-semibold">ملخص الطلب</h3>

    <div
      v-for="item in cart"
      :key="item.id"
      class="flex justify-between text-sm"
    >
      <span>{{ item.name }} × {{ item.quantity }}</span>
      <span>{{ item.newPrice * item.quantity }} ر.س</span>
    </div>

    <hr>
    <p>الشحن: {{ checkout.shippingPrice }} ر.س</p>
    <p v-if="checkout.discount">الخصم: - {{checkout.discount }} ر.س</p>
    <p class="font-bold text-lg">
      الإجمالي: {{ checkout.total  }} ر.س
    </p>
  </div>
  <!-- الكوبون -->
  <div class="space-y-2">
    <label class="font-semibold">كود الخصم</label>
    <div class="flex gap-2">
      <input
        v-model="couponCode"
        placeholder="ادخل الكوبون"
        class="border p-2 rounded w-full"
      />
      <button
        @click="applyCoupon"
        class="bg-emerald-600 text-white px-4 rounded"
      >
        تطبيق
      </button>
    </div>
  </div>
  <!-- طرق الدفع -->
  <div>
    <h3 class="font-semibold mb-2">طريقة الدفع</h3>
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="method in payments"
        :key="method"
        @click="selectedPayment = method"
        class="border p-3 rounded-lg"
        :class="selectedPayment === method ? 'border-emerald-600' : ''"
      >
        {{ method }}
      </button>
    </div>
  </div>
  <!-- أزرار التنقل -->
  <div class="flex justify-between">

    <button
      @click="checkout.prevStep()"
      class="bg-gray-400 text-white px-4 py-2 rounded"
    >
      رجوع
    </button>

    <button
      @click="goNext"
      class="bg-emerald-600 text-white px-4 py-2 rounded"
    >
      متابعة
    </button>

  </div>

</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCheckoutStore } from '../../stores/checkout'
import { useCartStore } from '../../stores/cart'
import { showToast } from '../../stores/toast'

const checkout = useCheckoutStore()
const cartStore = useCartStore()

const cart = computed(() => cartStore.cart)

const couponCode = ref('')
const selectedPayment = ref('Visa')

const payments = ['Visa', 'Mada', 'Apple Pay', 'STC Pay', 'PayPal']

// تطبيق الكوبون
const applyCoupon = () => {

  const ok = checkout.applyCoupon(
    couponCode.value,
    cartStore.total
  )

  if (ok) {
    showToast('تم تطبيق الخصم ✅')
  } else {
    showToast('كوبون غير صالح ❌', 'error')
  }
}

// الانتقال للخطوة التالية
const goNext = () => {

  if (!selectedPayment.value) {
    showToast('اختر طريقة الدفع')
    return
  }
  checkout.step = 2
  checkout.nextStep()
}
</script>