<template>
<div class="flex-1 text-center">
  <div
    class="w-10 h-10 mx-auto rounded-full flex items-center justify-center"
    :class="active ? 'bg-emerald-600 text-white' : 'bg-gray-300'"
  >
    ✓
  </div>

  <p class="mt-2 text-sm">
    <slot />
  </p>
</div>
</template>

<script setup>
defineProps({
  active: Boolean
})
</script>