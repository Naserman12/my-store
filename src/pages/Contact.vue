<template>
  <div class="container mx-auto px-4 py-10">

    <h1 class="text-3xl font-bold text-center mb-10">
      اتصل بنا
    </h1>

    <div class="grid md:grid-cols-2 gap-10">

      <!-- معلومات التواصل -->
      <div class="space-y-6">

        <div class="bg-gray-100 p-4 rounded-lg">📍 العنوان: الرياض - السعودية</div>
        <div class="bg-gray-100 p-4 rounded-lg">📞 الهاتف: +966594599729</div>
        <div class="bg-gray-100 p-4 rounded-lg">✉️ البريد: support@mystore.com</div>

        <div class="bg-gray-100 p-5 rounded-xl">
          نحن سعداء بالتواصل معكم في أي وقت ❤️
        </div>

      </div>

      <!-- نموذج التواصل -->
      <form
        @submit.prevent="sendMessage"
        class="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >

        <input
          v-model="name"
          placeholder="الاسم"
          class=" w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          v-model="email"
          placeholder="البريد الإلكتروني"
          class=" w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          v-model="message"
          placeholder="رسالتك"
          rows="5"
          class=" w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>

        <button
          :disabled="loading"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex justify-center"
        >
          <span v-if="!loading">إرسال</span>

          <span
            v-else
            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
          ></span>
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from '../stores/toast'

const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)

const sendMessage = () => {

  if (!name.value || !email.value || !message.value) {
    showToast('يرجى تعبئة جميع الحقول ❌')
    return
  }

  loading.value = true

  // محاكاة API
  setTimeout(() => {
    loading.value = false

    showToast('تم إرسال رسالتك بنجاح ✅')

    name.value = ''
    email.value = ''
    message.value = ''

  }, 1500)
}
</script>