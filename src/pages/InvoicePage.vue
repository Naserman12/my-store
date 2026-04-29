<template>
  <iframe
    :src="`my-store-api-production-904a.up.railway.app/api/auth/invoice/${$route.params.id}`"
     :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'"
    class="w-full h-screen border"
  ></iframe>
</template>
<script>
import { useDarkMode } from "../components/useDarkMode"

const { darkMode } = useDarkMode()
</script>