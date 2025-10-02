<template>
 <div dir="rtl" class=" bg-blue-100">
    <navbar/>
    <router-view /> 
    <WhatsAppButton/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
import WhatsAppButton from "./components/WhatsAppButton.vue";
export default { 
  components: {
    WhatsAppButton,
    Navbar
  },
  name: "App",
};
</script>