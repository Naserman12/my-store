<template>

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
</script>