<template>
<div class="container mx-auto py-10 max-w-2xl">

  <h1 class="text-2xl font-bold mb-6">
    إتمام الطلب
  </h1>

  <form v-if="useNewAddress || !addresses.length" @submit.prevent="checkout" class="space-y-4">

    <input v-model="form.customer_name"
      placeholder="الاسم الكامل"
      class="input"/>

    <input v-model="form.customer_phone"
      placeholder="رقم الجوال (اختياري)"
      class="input"/>

    <div v-if="addresses.length">

  <h2 class="font-bold mb-3">اختر عنوان التوصيل</h2>

  <div
    v-for="addr in addresses"
    :key="addr.id"
    class="border p-4 rounded-lg mb-3 cursor-pointer"
    :class="selectedAddress === addr.id && 'border-black'"
    @click="selectedAddress = addr.id; useNewAddress=false"
  >
    <p class="font-bold">{{ addr.name }}</p>
    <p>{{ addr.address }}</p>
    <p class="text-sm text-gray-500">{{ addr.city }}</p>
  </div>

  <button
    @click="useNewAddress = true; selectedAddress=null"
    class="text-sm underline"
  >
    استخدام عنوان جديد
  </button>

</div>

    <input v-model="form.shipping_city"
      placeholder="المدينة"
      class="input"/>

    <input v-model="form.shipping_postal_code"
      placeholder="الرمز البريدي"
      class="input"/>

    <button class="bg-black text-white px-6 py-3 rounded-lg w-full">
      تأكيد الطلب
    </button>

  </form>

</div>
</template>

<script setup>
import {ref, onMounted, reactive } from "vue"
import axios from "../../api/api"
import { useRouter } from "vue-router"
import { showToast } from "../../stores/toast"

const router = useRouter()

const addresses = ref([])
const selectedAddress = ref(null)
const useNewAddress = ref(false)
const form = reactive({
  customer_name:"",
  customer_phone:"",
  shipping_address:"",
  shipping_city:"",
  shipping_postal_code:""
})

const checkout = async () => {

   const payload = selectedAddress.value
    ? { address_id: selectedAddress.value }
    : form
  const res = await axios.post("/checkout", payload)

  showToast("تم إنشاء الطلب ✅")

  router.push(`/order-success/${res.data.order_id}`)
}
const loadCheckoutData = async () => {
  const res = await axios.get("/checkout/data")
  addresses.value = res.data.addresses
}
onMounted(() => {
  loadCheckoutData()
})

</script>


<!-- <template>

<div class="max-w-5xl mx-auto p-6">

  <CheckoutStepper />

  <ShippingStep v-show="checkout.step === 1" />
  <PaymentStep v-show="checkout.step === 2" />
  <ConfirmStep v-show="checkout.step === 3" />

</div>

</template>

<script setup>
    import  {useCheckoutStore}  from '../stores/checkout.js'
    import CheckoutStepper from '../components/checkout/CheckoutStepper.vue'
    import ShippingStep from '../components/checkout/ShippingStep.vue'
    import PaymentStep from '../components/checkout/PaymentStep.vue'
    import ConfirmStep from '../components/checkout/ConfirmStep.vue'
    const checkout = useCheckoutStore()
</script> -->