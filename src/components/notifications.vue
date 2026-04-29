<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const notifications = ref([])
const unreadCount = ref(0)

// تحميل الإشعارات
const loadNotifications = async () => {
  try {
    const res = await api.get("/notifications")
    notifications.value = res.data
    unreadCount.value = res.data.filter(n => !n.is_read).length
  } catch (e) {
    console.log("Error loading notifications", e)
  }
}

// قراءة الإشعار
const markAsRead = async (n) => {
  if (!n.is_read) {
    await api.post(`/notifications/read/${n.id}`)
    n.is_read = true
    unreadCount.value--
  }
}

onMounted(loadNotifications)
</script>

<template>
<div class="max-w-3xl mx-auto p-4">

  <h1 class="text-2xl font-bold mb-4">
    🔔 الإشعارات
  </h1>

  <div v-if="notifications.length === 0"
       class="text-gray-500">
    لا توجد إشعارات
  </div>

  <div v-for="n in notifications"
       :key="n.id"
       @click="markAsRead(n)"
       class="p-4 border rounded mb-3 cursor-pointer transition"
       :class="n.is_read 
         ? 'opacity-60 bg-gray-50 dark:bg-gray-800' 
         : 'bg-gray-100 dark:bg-gray-700'">

    <p class="font-bold">{{ n.title }}</p>

    <p class="text-sm">
      {{ n.message }}
    </p>

    <p class="text-xs opacity-50 mt-1">
      {{ new Date(n.created_at).toLocaleString() }}
    </p>

  </div>

</div>
</template>