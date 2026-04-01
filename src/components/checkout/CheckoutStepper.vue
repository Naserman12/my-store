<template>
<div class="flex justify-between mb-8">

  <StepItem :active="step>=1">الشحن</StepItem>
  <StepItem :active="step>=2">الدفع</StepItem>
  <StepItem :active="step>=3">التأكيد</StepItem>

</div>
</template>

<script setup>
import { useCheckoutStore } from '../../stores/checkout'
import StepItem from './StepItem.vue'

const checkout = useCheckoutStore()
const step = checkout.step
</script>