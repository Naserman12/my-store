<template>

<div class="bg-white shadow rounded-xl p-5">

<p class="text-gray-500 text-sm">
{{ title }}
</p>

<h2 class="text-2xl font-bold mt-2">
{{ value }}
</h2>

</div>

</template>

<script setup>


defineProps({
  title: String,
  value: [String, Number]
})
</script>