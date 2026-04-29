<template>
    <div>
        <nav  :class="darkMode ? 'bg-emerald-900 text-amber-50' : 'bg-emerald-50 text-emerald-700'" class="shadow-md sticky top-0 z-50 justify-between items-center transition-colors duration-300">
        
            <div class=" contener mx-auto px-4 py-3 flex items-center justify-between">
                <!-- روابط التنقل -->
                <ul class="hidden md:flex items-center gap-6 font-medium ">
                    <li><router-link title="الرائيسية" active-class="underline underline-offset-4" to="/" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500 '" class="fas fa-home ml-3" exact></router-link></li>
                    <li><router-link title="عرض السلة" active-class="underline underline-offset-4" to="/cart" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-cart-plus ml-3"></router-link></li>
                    <li><router-link title="من نحن" active-class="underline underline-offset-4" to="/About" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-user ml-3"></router-link></li>
                    <li><router-link title="اتصل بنا" active-class="underline underline-offset-4" to="/Contact" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-phone ml-3"></router-link></li>
                    <li><router-link title="حسابي" active-class="underline underline-offset-4" to="/profile" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-user ml-3"></router-link></li>
                    <router-link to="/wishlist">
                        ❤️
                    </router-link>
                    <div v-if="user" >
                        <logout-btn  />
                    </div>
                    <div v-else>
                    <li><router-link title="تسجيل الدخول" active-class="underline underline-offset-4" to="/login" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="text-gray-100 bg-gray-500 p-0.5 font-bold underline"> تسجيل الدخول</router-link></li>
                </div>
                    </ul>
                <!-- إيقونة السلة -->
                 <div class=" felx items-center gap-4 right-0">
                     <!-- زر القائمة للجوال -->
                      <button :class="darkMode ? 'text-amber-50' : ' text-emerald-700'" @click="toggleMenu" class="md:hidden text-2xl m-0">
                         <i class="fas fa-bars"></i>
                      </button>
                </div>
                <search-btn />
                 <!-- <div class=" felx items-center gap-4 right-0">
                    <button class=" relative">
                        <i class="fas fa-shopping-cart text-2xl"></i>
                        // عدد المنتجات في السلة
                        <span class=" absolute -top-2 -right-2 bg-red-500 text-amber-50 text-sm font-bold py-0.5 px-2 rounded-full">3</span>
                    </button>
                </div> -->
                <!-- الاشعارات -->
                <div class="relative">

                <!-- زر الجرس -->
                <div class="cursor-pointer relative" @click="open = !open">
                    🔔

                    <span
                    v-if="unreadCount > 0"
                    class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full"
                    >
                    {{ unreadCount }}
                    </span>
                </div>

                <!-- Dropdown -->
                <div v-if="open"
                    class="absolute right-0 mt-2 w-80 shadow-lg rounded-lg z-50"
                    :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white'">

                    <div class="p-3 border-b font-bold">
                    الإشعارات
                    </div>

                    <div v-if="notifications.length === 0"
                        class="p-3 opacity-70">
                    لا توجد إشعارات
                    </div>

                    <div v-for="n in notifications.slice(0,5)"
                        :key="n.id"
                        @click="markAsRead(n)"
                        class="p-3 border-b cursor-pointer"
                        :class="[
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
                        n.is_read ? 'opacity-60' : ''
                        ]">

                    <p class="font-bold text-sm">{{ n.title }}</p>
                    <p class="text-xs opacity-70">{{ n.message }}</p>
                    </div>

                    <!-- زر عرض الكل -->
                    <div class="p-2 text-center">
                    <router-link to="/notifications" class="text-sm underline">
                        عرض كل الإشعارات
                    </router-link>
                    </div>

                </div>

                </div>
                     <!-- <router-link to="/" class="p-2 rounded-lg "  @click="open = !open">
                        <i title="الإشعارات" class="fas fa-bell"></i>
                       <span v-if="unreadCount > 0" class="absolute top-3 right-4- bg-red-500 text-amber-50 text-sm font-bold py-0.5 px-1 rounded-full"> {{ unreadCount }}</span>
                    </router-link> -->
                  
                <!-- Mode Button -->
                <button title="تغير الوان الخلفية" @click="toggleMode" class=" text-lg text-amber-50 rounded-full ">
                     <span v-if="darkMode">
                         ☀
                     </span>
                     <span  v-else>
                         🌙
                     </span>
                 </button>
                <!-- Logo & Site name -->
                 <div title="شعار الموقع" class="flex items-center gap-2 m-0">
                     <span :class="darkMode ? 'text-amber-50' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="font-bold text-xl ">MY.STORE</span>
                     <a href="/" class=" hover:underline">
                         <img :src="darkMode? lightLogo : DarkLogo " alt="logo" class="w-10 h-10 text-amber-50">
                     </a>
                 </div>
           
            </div>

            <!-- القائمة الجانبية في الجوال -->
             <transition name="slide">
                <div v-if="isOpen" ref="target" class="fixed inset-0 bg-opacity-50 z-50 h-80 w-60 right-0 left-40 top-14"
                                    :class="darkMode ?'bg-emerald-800' : 'bg-emerald-50'">
                    <div class="w-50  h-full p-6 shadow-lg transform transition-transform duration-300"
                            :class="isOpen ? 'translate-x-0' : '-translate-x-full'" >
                            <!-- روابط التنقل -->
                        <div class="flex items-center justify-between mb-6 p-4 border-b border-amber-50" >
                             <ul :class="darkMode ? 'text-amber-50' : ' hover:text-emarale-500'" class="py-2">
                                <h2 class=" text-2xl font-bold">القائمة</h2>
                                <button @click="toggleMenu" class="p-1 hover:bg-red-500 rounded-xl transition-colors"> <i class="fas fa-times text-xl"></i></button>
                                <li class=" border-b border-amber-50 mb-3"><a class=" hover:bg-gray-400"  href="/">
                                     <div class=" items-center flex">
                                        <i class="fas fa-home ml-3">
                                            <span>الرائيسية</span>
                                        </i>
                                    </div>
                                </a></li>
                                <li class=" border-b border-amber-50  mb-3"><a class=" hover:bg-gray-400"  href="#">
                                     <div class=" items-center flex">
                                        <i class="fas fa-user ml-3">
                                            <span>المنتجات</span>
                                        </i>
                                    </div>
                                </a></li>
                                <li class=" border-b border-amber-50  mb-3"><a class=" hover:bg-gray-400"  href="#"> 
                                    <div class=" items-center flex">
                                        <i class="fas fa-user ml-3">
                                            <span>الإضافات</span>
                                        </i>
                                    </div></a></li>
                                <li class="m-3">
                                    <div class="flex items-center justify-between py3 px-4 transition-colors cursor-pointer"
                                     @click="toggleCategories">
                                        <div class=" items-center flex">
                                            <i class="fas fa-th-large ml-3">
                                                <span>التصنيفات</span>
                                            </i>
                                        </div>
                                        <i class="fas text-gray-400 transition-transform duration-300"
                                        :class="categoriesOpen? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                    </div>
                                    <div class=" transition-all duration-300 overflow-hidden"
                                            :class="categoriesOpen ? 'max-h-96' : 'max-h-0'">
                                    <ul class=" py-2 pr-8">
                                        <li><a class=" hover:bg-gray-400 block py-2 px-4 rounded-r-md transition-colors border-r-2 border-transparent " href="category/1">التصنيف1</a></li>
                                        <li><a class=" hover:bg-gray-400 block py-2 px-4 rounded-r-md transition-colors border-r-2 border-transparent " href="category/2">التصنيف2</a></li>
                                        <li><a class=" hover:bg-gray-400 block py-2 px-4 rounded-r-md transition-colors border-r-2 border-transparent " href="category/3">التصنيف3</a></li>
                                        <li><a class=" hover:bg-gray-400 block py-2 px-4 rounded-r-md transition-colors border-r-2 border-transparent " href="category/4">التصنيف4</a></li>
                                        <li><a class=" hover:bg-gray-400" href="/categories">المزيد</a></li>
                                    </ul>
                                    </div>
                                </li>
                                <!-- User -->
                                 
                                <li class=" border-b border-amber-50 m-3">
                                    <a href="/Profile" class="flex items-center justify-between py3 px-4 transition-colors"
                                    @click="toggleCategories">
                                    <div class=" items-center flex">
                                        <i class="fas fa-user ml-3">
                                            <span>حسابي</span>
                                        </i>
                                    </div>
                                </a>
                                </li>
                                <!-- الإعدادات -->
                                <li class=" border-b border-amber-50 m-3">
                                    <a href="#" class="flex items-center justify-between py3 px-4 transition-colors"
                                    @click="toggleCategories">
                                    <div class=" items-center flex">
                                        <i class="fas fa-cog ml-3">
                                            <span>الإعدادات</span>
                                        </i>
                                    </div>
                                </a>
                                </li>
                             </ul>
                         </div>
                    </div>
                </div>
             </transition>
        </nav>
    </div>
</template>

<script setup>
import  { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import DarkLogo from '../assets/images/myStoreDark.png';
import lightLogo from '../assets/images/myStoreLight.png';
import searchBtn from "./searchBtn.vue";
import Search from "../pages/Search.vue";
import LogoutBtn from "../pages/auth/LogoutBtn.vue";
import { useDarkMode } from "./useDarkMode.js";
import api from "../api/api.js";

const open = ref(false)
const user = ref(null)
const notifications = ref([])
const unreadCount = ref(0)

// const loadNotifications = async () => {
//   const res = await api.get('/notifications')
//   notifications.value = res.data
//   unreadCount.value = res.data.filter(n => !n.is_read).length
// }
const loadUser = async () => {
  try {
    const res = await api.get("/auth/user")
    user.value = res.data
    form.customer_name = res.data.name
    form.customer_phone = res.data.phone
    form.customer_email = res.data.email
  } catch {}
}
const loadNotifications = async () => {
  try {
    const res = await api.get("/notifications")
    console.log("NOTIF RESPONSE:", res.data)
    unreadCount.value = res.data
  } catch (e) {
    console.log("FULL ERROR:", e.response?.data)
  }
}

onMounted(() => {
  loadNotifications()
  loadUser()
})

const {darkMode, toggleMode} = useDarkMode();
// القائمة الجانبية
const target = ref(null); 
const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
    open.value = !open.value;

}

onClickOutside(target, () => {
    isOpen.value = false;
    open.value = false;
})
// categoties
const categoriesOpen = ref(false);
const toggleCategories = () => {
    categoriesOpen.value = !categoriesOpen.value
    // console.log('Button => ', categoriesOpen.value)
}

</script>

<style>
.slide.enter-active,
.slide.leave-active{
    transition: all 0.3s ease;
}
.slide.enter-from{
    transform: translateX(-100);
}
.slide.enter-to{
    transform: translateX(0);
}
.slide.leave-from{
    transform: translateX(0); 
}
.slide.leave-to{
    transform: translateX(-100);   
}
</style>