<template>

<div class="space-y-4">

<input
 v-model="checkout.shipping.email"
 placeholder="البريد الإلكتروني"
 class="input"
/>

<input
 v-model="checkout.shipping.address"
 placeholder="العنوان"
 class="input"
/>

<h3>طريقة الشحن</h3>

<label>
  <input type="radio" value="free"
  @change="checkout.setShippingMethod('free')">
  مجاني
</label>

<label>
  <input type="radio" value="mrsool"
  @change="checkout.setShippingMethod('mrsool')">
  مرسول (25 ر.س)
</label>

<button
 @click="checkout.nextStep()"
 class="btn-primary"
>
التالي
</button>

</div>

</template>

<script setup>
import { useCheckoutStore } from '../../stores/checkout'
const checkout = useCheckoutStore()
</script>