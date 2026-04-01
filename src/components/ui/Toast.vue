<template>
    <div class="fixed top-5 right-5 z-50 space-y-3">
        <div 
        v-for="toast in toastState.toasts" 
        :key="toast.id" 
        :class="toastClass(toast.type)" 
        class=" px-4 py-3 rounded-lg shodow-lg text-white animate-slide">
            {{ toast.message }}
        </div>
    </div>
</template>
<script setup>
 import { toastState } from '../../stores/toast';
 const toastClass = (type) =>{
    switch (type){
        case 'error':
            return 'bg-red-500'
        case 'info':
            return 'bg-blue-500'
        default:
            return 'bg-green-500'
    }
 }
</script>
<style>
@keyframes slide{
    from{
        transform: translateX(120%);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
.animate-slide {
    animation: slide .4s ease;
}
</style>