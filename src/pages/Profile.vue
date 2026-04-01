<template>
  <div class="container mx-auto px-4 py-10">

    <!-- عنوان -->
    <h1 class="text-3xl font-bold mb-8 text-center">
      حسابي
    </h1>

    <div class="grid md:grid-cols-4 gap-8">

      <!-- القائمة الجانبية -->
      <div class="bg-white shadow rounded-xl p-5 space-y-3">

        <button
          v-for="item in menu"
          :key="item"
          @click="activeTab = item"
          :class="[
            'w-full text-right p-3 rounded-lg hover:bg-gray-100 transition',
            activeTab === item && 'bg-gray-900 text-white'
          ]"
        >
          {{ item }}
        </button>

        <button
          @click="logout"
          class="w-full text-right p-3 rounded-lg hover:bg-gray-100 transition text-red-500"
        >
          تسجيل الخروج
        </button>

      </div>

      <!-- المحتوى -->
      <div class="md:col-span-3 bg-white shadow rounded-xl p-6">

        <!-- معلوماتي -->
        <div v-if="activeTab === 'معلوماتي'">

          <div class="flex items-center gap-4 mb-6">
            <img
              src="https://i.pravatar.cc/100"
              class="w-16 h-16 rounded-full"
            />
            <div>
              <h2 class="font-bold text-lg">{{ user.name }}</h2>
              <p class="text-gray-500">{{ user.email }}</p>
            </div>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-4">

            <input
              v-model="user.name"
              placeholder="الاسم"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <input
              v-model="user.email"
              placeholder="البريد الإلكتروني"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition">
              حفظ التغييرات
            </button>

          </form>
        </div>

        <!-- الطلبات -->
        <div v-if="activeTab === 'طلباتي'">
          <p class="text-gray-500">
            لا توجد طلبات حالياً
          </p>
        </div>

        <!-- العناوين -->
        <div v-if="activeTab === 'العناوين'">
          <p class="text-gray-500">
            لم يتم إضافة عنوان بعد
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from '../stores/toast'

const activeTab = ref('معلوماتي')

const menu = [
  'معلوماتي',
  'طلباتي',
  'العناوين'
]

// لاحقاً تأتي من API أو Pinia
const user = ref({
  name: 'ناصر',
  email: 'naser@email.com'
})

const updateProfile = () => {
  showToast('تم تحديث البيانات ✅')
}

const logout = () => {
  localStorage.removeItem('user')
  showToast('تم تسجيل الخروج 👋')
}
</script>