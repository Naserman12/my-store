<template>
<div>

<h2 class="text-xl font-bold mb-4">تأكيد الطلب</h2>

<!-- المنتجات -->
<div v-for="item in cart" :key="item.id"
class="flex justify-between border-b py-2">

  <p>{{ item.name }} × {{ item.quantity }}</p>
  <p>{{ item.newPrice * item.quantity }} ر.س</p>

</div>

<!-- العنوان -->
<div class="mt-4 bg-gray-50 p-4 rounded">
  <h3 class="font-semibold">عنوان الشحن</h3>
  <p>{{ checkout.shipping.address }}</p>
  <p>{{ checkout.shipping.email }}</p>
</div>

<!-- السعر النهائي -->
<div class="mt-4 font-bold text-lg">
الإجمالي:
{{ finalTotal }} ر.س
</div>

<button
@click="payNow"
class="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg"
>
💳 إتمام الدفع
</button>

</div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useCheckoutStore } from '../../stores/checkout'
import { useOrdersStore } from '../../stores/orders'
import { useRouter } from 'vue-router'
import { showToast } from '../../stores/toast'

const cartStore = useCartStore()
const checkout = useCheckoutStore()
const ordersStore = useOrdersStore()
const router = useRouter()

const cart = computed(()=> cartStore.cart)

const cartTotal = computed(() =>
  cart.value.reduce(
    (sum,i)=> sum + i.newPrice * i.quantity,0)
)

const finalTotal = computed(() =>
  cartTotal.value +
  checkout.shippingPrice -
  checkout.discount
)

const payNow = () => {

  ordersStore.createOrder(
    cart.value,
    checkout,
    finalTotal.value
  )

  cartStore.clearCart()

  showToast('تم الدفع بنجاح ✅')
              // تحديد الخطوة المطلوبة
   checkout.step = 1
  router.push('/order-success')
}
</script>