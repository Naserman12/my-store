<template lang="">
    <div  class="m-0 p-0 b-1">
        <button @click="showChat = !showChat" class="fixed bottom-25 right-4 bg-none text-green-800 rounded-full p-1 shadow-lg hover:bg-green-200 transition" >
            <i class="fab fa-whatsapp text-3xl"></i>
            <!-- البوكس المنثق -->
            <div v-if="showChat" ref="target" class="fixed bottom-15 right-22 bg-white shadow-2xl rounded-xl w-72 p-2">
                <div class="flex justify-between items-center border-b pb-2 mb-2" >
                    <h3 class="text-lg font-bold text-green-600 flex items-center">
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

const showChat = ref(false);
const target = ref(null);

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