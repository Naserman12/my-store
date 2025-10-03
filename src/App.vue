<template>
 <div dir="rtl" :class="darkMode ? 'bg-emerald-50' : 'bg-emerald-400 hover:text-emarale-500'">
    <navbar/>
    <router-view /> 
    <WhatsAppButton/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
import WhatsAppButton from "./components/WhatsAppButton.vue";
import { useDarkMode } from "./components/useDarkMode";
const {darkMode, toggleMode} = useDarkMode();
export default { 
  components: {
    WhatsAppButton,
    Navbar
  },
  name: "App",
  data(){
    return {
      darkMode: false
    }
  }
};
</script>