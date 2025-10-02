<template>
    <div>
        <nav class=" bg-emerald-700 text-amber-50 shadow-md sticky top-0 z-50">
            <div class=" contener mx-auto px-4 py-3 flex items-center justify-between">
                <!-- روابط التنقل -->
                <ul class="hidden md:flex items-center gap-6 font-medium text-amber-50">
                    <li><a href="#" class=" hover:bg-emerald-800">الرئيسية</a></li>
                    <li><a href="#" class=" hover:bg-emerald-800">الإضافات</a></li>
                    <li><a href="#" class=" hover:bg-emerald-800">المنتجات</a></li>

                    <!-- التصنيفات قائمة منسدلة -->
                     <li class=" relative group">
                        <button class=" hover:bg-emerald-800 flex items-center gap-1">التصنيفات <i class="fas fa-chevron-down text-sm text-amber-50"></i>
                        </button>
                        <!-- القائمة النسدلة -->
                         <ul class=" absolute right-0 mt-2 w-48 bg-emerald-400 border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all">
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300"> التصنيف 1</a>
                            </li>
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 2</a>
                            </li>
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 3</a>
                            </li>
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300">التصنيف 4</a>
                            </li>
                            <li>
                                <a href="#" class=" block px-4 py-2 hover:bg-emerald-300"> عرض المزيد</a>
                            </li>
                         </ul>
                     </li>
                </ul>
                <!-- إيقونة السلة -->
                 <div class=" felx items-center gap-4">
                     <!-- زر القائمة للجوال -->
                      <button @click="toggleMenu" class="md:hidden text-2xl text-amber-50">
                         <i class="fas fa-bars">H</i>
                      </button>
                    <button class=" relative">
                        <i class="fas fa-shopping-cart text-2xl">f</i>
                        <!-- عدد المنتجات في السلة -->
                        <span class=" absolute -top-2 -right-2 bg-red-500 text-amber-50 text-sm font-bold py-0.5 px-2 rounded-full">3</span>
                    </button>
                </div>
                <!-- Logo & Site name -->
                 <div class="flex items-center gap-2">
                     <span class=" font-bold text-xl text-amber-50">MY STORE</span>
                    <img src="../images/myStoreLogo.png" alt="" class="w-10 h-10">
                 </div>
            </div>
            <!-- القائمة الجانبية في الجوال -->
             <transition name="slide">
                <div v-if="isOpen" class="fixed inset-0 bg-emerald-400 bg-opacity-50 z-50 flex">
                    <div class="w-64 bg-emerald-700 h-full p-6 shadow-lg">
                        <!-- هيدر القائمة -->
                         <div class=" flex items-center justify-between mb-6">
                            <div class=" flex items-center gap-2">
                                <img src="../images/myStoreLogo.png" alt="logo" class="w-8 h-8" />
                                <span class=" font-bold text-lg">MY STORE</span>
                            </div>
                            <!-- روابط التنقل -->
                             <ul class=" space-y-4 font-medium">
                                <li><a href="#">الرئيسية</a></li>
                                <li><a href="#">المنتجات</a></li>
                                <li><a href="#">الإضافات</a></li>
                                <li class="">
                                    <p class=" font-medium mb-2"> التصنيفات</p>
                                    <ul class=" ml-4 space-y-2 text-amber-50">
                                    <li><a href="#">التصنيف1</a></li>
                                    <li><a href="#">التصنيف2</a></li>
                                    <li><a href="#">التصنيف3</a></li>
                                    <li><a href="#">التصنيف4</a></li>
                                    <li><a href="#">المزيد</a></li>
                                </ul>
                              </li>
                             </ul>
                         </div>
                         <!-- اغلاق النافذة في حال الضفط خارج العنصر -->
                          <div @click="toggleMenu" class="flex-1"></div>
                    </div>
                </div>
             </transition>
        </nav>
    </div>
</template>

<script setup>
import  { ref } from "vue";
const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
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