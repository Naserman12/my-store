<template>
 <div dir="rtl" :class="darkMode ? 'bg-emerald-500' : 'bg-emerald-50 hover:text-emarale-500'">
    <navbar/>
    <router-view  /> 
    <WhatsAppButton/>
    <button-navbar/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';
import ButtonNavbar from './components/ButtonNavbar.vue';
import WhatsAppButton from "./components/WhatsAppButton.vue";
import { useDarkMode } from "./components/useDarkMode";
import  { ref } from "vue";
const {darkMode, toggleMode} = useDarkMode();
const name = ref('App')
</script>