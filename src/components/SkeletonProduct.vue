<template>
    <div class="animate-pulse  rounded-xl shadow p-4 mb-1"
        :class="darkMode ? 'bg-emerald-800' : 'bg-emerald-50 hover:text-emarale-500'">
        <div :class="darkMode ? 'bg-emerald-50' : 'bg-emerald-800'" class=" h-40 rounded-xl mb-3"></div>
        <div :class="darkMode ? 'bg-emerald-50' : 'bg-emerald-800'" class=" h-4 rounded w-3/4 mb-2"></div>
        <div :class="darkMode ? 'bg-emerald-50' : 'bg-emerald-800'" class=" h-4 rounded w-1/2 mb-2"></div>
    </div>
</template>

<script>
export default {
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  }
} 
</script> 