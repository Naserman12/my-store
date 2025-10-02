

<template>
 <div>
    <router-view /> 

    <WhatsAppButton/>
  </div>
</template>

<script>
import WhatsAppButton from "./components/WhatsAppButton.vue";
export default {
  components: {
    WhatsAppButton
  },
  name: "App",
};
</script>