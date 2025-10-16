<template>
    <div>
        <button @click="toggleSearch" class=" hover:bg-gray-800  bg-gray-100 hover:text-amber-50 text-black p-2 shadow-md  rounded-full  transition">
           ⌕
        </button>
        <!-- مربع البحث -->
        <div v-if="showSearch" ref="searchBox" class=" absolute top-full left-0 w-full bg-amber-50 text-gray-800 p-3 shadow-md z-50">
            <input type="text" v-model="searchQuery" placeholder="ابحث عن منتج..." class=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none">
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
const showSearch = ref(false);
const searchQuery = ref('')
const searchBox = ref(null);
const toggleSearch = () => {
    showSearch.value =  !showSearch.value;
    // console.log(showSearch.value, "=> ============")
}
const handleClickOutside = (e) => {
    if (showSearch.value && searchBox.value && ! searchBox.value.contains(e.target) && ! e.target ) {
        showSearch.value = false
    }
}
onMounted(() => {
document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() =>{
    document.removeEventListener('click', handleClickOutside)
})
</script>