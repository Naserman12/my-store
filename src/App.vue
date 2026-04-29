<template>
 <div dir="rtl" class=" w-full h-full" :class="darkMode ? 'bg-emerald-800' : 'bg-emerald-50 hover:text-emarale-500'">
    <navbar/>
    <router-view  /> 
    <WhatsAppButton :darkMode="darkMode"/>
    <button-navbar/>
  </div>
  <Toast/>
</template>
<script setup>
import  { ref, onMounted } from "vue";
import Navbar from './components/Navbar.vue';
import ButtonNavbar from './components/ButtonNavbar.vue';
import WhatsAppButton from "./components/WhatsAppButton.vue";
import { useDarkMode } from "./components/useDarkMode";
import Toast from './components/ui/Toast.vue';
import { useAuthStore } from "./stores/auth";
import { useWishlistStore } from './stores/wishlist';
const wishlist = useWishlistStore()
const {darkMode, toggleMode} = useDarkMode();
const name = ref('App')

onMounted(() => {
  wishlist.loadWishlist()
})

</script>