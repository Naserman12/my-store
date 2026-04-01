<template>
    <div>
        <nav  :class="darkMode ? 'bg-emerald-700 text-amber-50' : 'bg-emerald-50 text-emerald-700'" class="shadow-md sticky top-0 z-50 justify-between items-center transition-colors duration-300">
            <div class=" contener mx-auto px-4 py-3 flex items-center justify-between">
                <!-- روابط التنقل -->
                <ul class="hidden md:flex items-center gap-6 font-medium ">
                    <li><router-link title="الرائيسية" active-class="underline underline-offset-4" to="/" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500 '" class="fas fa-home ml-3" exact></router-link></li>
                    <li><router-link title="عرض السلة" active-class="underline underline-offset-4" to="/cart" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-cart-plus ml-3"></router-link></li>
                    <li><router-link title="من نحن" active-class="underline underline-offset-4" to="/About" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-user ml-3"></router-link></li>
                    <li><router-link title="اتصل بنا" active-class="underline underline-offset-4" to="/Contact" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-phone ml-3"></router-link></li>
                    <li><router-link title="حسابي" active-class="underline underline-offset-4" to="/profile" :class="darkMode ? '' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="fas fa-user ml-3"></router-link></li>
                    <!-- التصنيفات قائمة منسدلة -->
                     <li class=" relative group">
                        <button :class="darkMode ? 'hover:bg-emerald-800' : 'hover:bg-emerald-100 hover:text-emarale-500'" class="flex items-center gap-1"> <i class="fas fa-chevron-down fas fa-tasks  text-sm text-amber-50"></i>
                        </button>
                        <!-- القائمة النسدلة -->
                         <ul class=" absolute right-0 mt-2 w-48 bg-emerald-400 border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all">
                            <li>
                                <a href="/category/1" class=" block px-4 py-2 hover:bg-emerald-300"> التصنيف 1</a>
                            </li>
                            <li>
                                <a href="/category/2" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 2</a>
                            </li>
                            <li>
                                <a href="/category/3" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 3</a>
                            </li>
                            <li>
                                <a href="/category/4" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 4</a>
                            </li>
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300"> عرض المزيد</a>
                            </li>
                         </ul>
                     </li>
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
           
                     <router-link to="/" class="p-2 rounded-lg ">
                        <i title="الإشعارات" class="fas fa-bell"></i>
                       <span class="absolute top-3 right-4- bg-red-500 text-amber-50 text-sm font-bold py-0.5 px-1 rounded-full">3</span>
                    </router-link>
                  
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
                <div v-if="isOpen" class="fixed inset-0 bg-emerald-400 bg-opacity-50 z-50">
                    <div class="w-64  h-full p-6 shadow-lg transform transition-transform duration-300"
                            :class="isOpen ? 'translate-x-0' : '-translate-x-full'" @click.stop>
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
                                    <a href="#" class="flex items-center justify-between py3 px-4 transition-colors"
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
import { products } from "../assets/data/productsApi.js";
import Category from "../pages/Category.vue";
import DarkLogo from '../assets/images/myStoreDark.png';
import lightLogo from '../assets/images/myStoreLight.png';
import searchBtn from "./searchBtn.vue";
import Search from "../pages/Search.vue";

import { useDarkMode } from "./useDarkMode.js";
const {darkMode, toggleMode} = useDarkMode();
// القائمة الجانبية
const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
}
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