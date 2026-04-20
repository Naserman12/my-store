<template lang="">
    <div  class="m-0 p-0 b-1">
        <button @click="showChat = !showChat" :class="darkMode ? 'text-emerald-50' : 'text-emerald-600'"  class="fixed bottom-25 right-4 bg-none rounded-full p-1 shadow-lg hover:bg-green-200 transition" >
            <i class="fab fa-whatsapp text-3xl"></i>
            <!-- البوكس المنثق -->
            <div v-if="showChat" ref="target" :class="darkMode ? 'bg-gray-800' : 'bg-white'" class="fixed bg-emerald-50 bottom-15 right-22 shadow-2xl rounded-xl w-72 p-2">
                <div class="flex justify-between items-center border-b pb-2 mb-2" >
                    <h3 :class="darkMode ? 'text-emerald-50' : 'text-emerald-600'"   class="text-lg font-bold flex items-center">
                        <i class="fab fa-whatsapp mr-2"></i>
                    </h3>
                    <button @click="showChat = false" class="text-gray-500   rounded-full hover:bg-red-600 hover:text-amber-50 " >
                        X
                    </button>
                </div>
                <p class="text-gray-700 mb-4">
                    مرحبا بك كيف يمكنني مساعدتك اليوم؟
                </p>
                <a :href="`https://wa.me/${phone}`" target="_blank" class="block text-center bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 hover:underline" >
                تواصل معنا
            </a>
        </div>
    </button>
    </div>
</template>
<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useDarkMode } from "./useDarkMode.js";

const showChat = ref(false);
const target = ref(null);
const { darkMode } = useDarkMode();

onClickOutside(target, () => {
    if (showChat.value) { 
    showChat.value = false;
    }
})
export default {
    data(){
        return{
            showChat: false,
            phone: "+966536529969"
        };
    },
    methods: {
        toggleChat() {
            this.showChat = !this.showChat;
        }
    }
}
</script>