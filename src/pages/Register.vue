<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

      <!-- العنوان -->
      <h2 class="text-2xl font-bold text-center mb-6">
        إنشاء حساب جديد
      </h2>

      <!-- الاسم -->
      <div class="mb-4">
        <label class="text-sm">الاسم</label>

        <input
          v-model="name"
          type="text"
          class="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="اسم المستخدم"
        />

        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- البريد -->
      <div class="mb-4">
        <label class="text-sm">البريد الإلكتروني</label>

        <input
          v-model="email"
          type="email"
          class="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="example@email.com"
        />

        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <!-- كلمة المرور -->
      <div class="mb-4 relative">
        <label class="text-sm">كلمة المرور</label>

        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          class="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
        />

        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute left-3 top-9"
        >
          👁
        </button>

        <p v-if="errors.password" class="error">
          {{ errors.password }}
        </p>
      </div>

      <!-- تأكيد كلمة المرور -->
      <div class="mb-4">
        <label class="text-sm">تأكيد كلمة المرور</label>

        <input
          type="password"
          v-model="confirmPassword"
          class="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <p v-if="errors.confirmPassword" class="error">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <!-- Remember -->
      <label class="flex items-center gap-2 text-sm mb-4">
        <input type="checkbox" v-model="remember" />
        تذكرني
      </label>

      <!-- زر التسجيل -->
      <button
        @click="register"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
      >
        <span v-if="!loading">إنشاء الحساب</span>

        <span
          v-else
          class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
        ></span>
      </button>

      <!-- رابط تسجيل الدخول -->
      <p class="text-center text-sm mt-5">
        لديك حساب؟
        <RouterLink to="/login" class="text-blue-600 font-semibold">
          تسجيل الدخول
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { showToast } from '../stores/toast'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

/* ======================
   Validation
====================== */
const validate = () => {

  Object.keys(errors).forEach(k => errors[k] = '')

  let valid = true

  if (name.value.length < 3) {
    errors.name = 'الاسم قصير'
    valid = false
  }

  if (!email.value.includes('@')) {
    errors.email = 'بريد غير صالح'
    valid = false
  }

  if (password.value.length < 6) {
    errors.password = 'كلمة المرور يجب أن تكون 6 أحرف'
    valid = false
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'كلمتا المرور غير متطابقتين'
    valid = false
  }

  return valid
}

/* ======================
   Register
====================== */
const register = () => {

  if (!validate()) {
    showToast('تحقق من البيانات ❌', 'error')
    return
  }

  loading.value = true

  // محاكاة API
  setTimeout(() => {

    loading.value = false

    showToast('تم إنشاء الحساب بنجاح 🎉')

    if (remember.value) {
      localStorage.setItem('user', email.value)
    }

  }, 1500)
}
</script>
