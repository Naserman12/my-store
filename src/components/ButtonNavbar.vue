<template>
    <div :class="darkMode ? ' text-emerald-50 bg-emerald-500' : ' bg-emerald-50 text-emerald-800'"  >
        <nav class="fixed bottom-0 left-0 right-0 border-t shadow-lg flex justify-around items-center py-2 md:hidden z-50">
            <!-- Home -->
             <router-link active-class="underline underline-offset-4 bg-gray-600" to="/" class=" flex flex-col items-center bg-gray-500 text-amber-50 hover:bg-gray-600 rounded-2xl p-1" exact >
                <i class=" fas fa-home text-xl"></i>
                <span class=" text-sm">الرئسية</span>
             </router-link>
                <!-- Categories -->
             <router-link active-class="underline underline-offset-4 bg-gray-600" to="/categories" class=" flex flex-col items-center bg-gray-500 text-amber-50 hover:bg-gray-600 rounded-2xl p-1" >
                <i class=" fas fa-th-large text-xl"></i>
                <span class=" text-sm">الاقسام</span>
               </router-link>
               <router-link active-class="underline underline-offset-4 bg-gray-600" to="/cart" class=" flex flex-col items-center bg-gray-500 text-amber-50 hover:bg-gray-600 rounded-2xl p-1" >
                  <i class=" fas fa-shopping-cart text-xl"></i>
                   <span class=" absolute -top-1- -right-2- bg-red-500 text-amber-50 text-sm font-bold py-0.5 px-2 rounded-full">3</span>
                  <span class=" text-sm">السلة</span>
               </router-link>
               <router-link active-class="underline underline-offset-4 bg-gray-600" to="/category/8" class=" flex flex-col items-center bg-gray-500 text-amber-50 hover:bg-gray-600 rounded-2xl p-1" >
                <i class=" fas fa-star text-xl"></i>
                <span class=" text-sm">المفضلة</span>
             </router-link>
             <router-link active-class="underline underline-offset-4 bg-gray-600" to="/category/4" class=" flex flex-col items-center bg-gray-500 text-amber-50 hover:bg-gray-600 rounded-2xl p-1" >
                <i class=" fas fa-user text-xl"></i>
                <span class=" text-sm">حسابي</span>
             </router-link>
        </nav>
    </div>
</template>

<script setup>
import { useDarkMode } from "../components/useDarkMode";
const {darkMode, toggleMode} = useDarkMode();
</script>