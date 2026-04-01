<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-center">تسجيل الدخول</h2>
            <!-- Email field -->
            <div class="mb-4">
                <label for="email" class=" block mb-1 text-sm">الريد الألكتروني</label>
                <input 
                v-model="email"
                type="email"
                class="w-full border rounded-lg px-3 py-2 focus:right-2 focus:ring-blue-500 outline-none" placeholder="example@mail.com"
                />
                <p v-if="errors.email" class="bg-red-100 text-red-500 text-sm mt-1">
                    {{ errors.email }}
                </p>
            </div>
            <!-- Password field -->
            <div class="mb-4 relative">
                <label for="password" class=" block mb-1 text-sm">كلمة المرور</label>
                <input 
                v-model="password"
                type="password"
                class="w-full border rounded-lg px-3 py-2 pr-10 focus:right-2 focus:ring-blue-500 outline-none" placeholder="********"
                />
                <!-- Password visibility toggle -->
                <button 
                type="button" 
                @click="showPassword = !showPassword"
                class=" absolute left-3 top-9"
                
                >
                  👁
                </button>
                <p v-if="errors.password" class="bg-red-100 text-red-500 text-sm mt-1">
                    {{ errors.password }}
                </p>
            </div>
            <!-- Remember me -->
            <div class="flex items-center justify-between mb-4">
                <label class=" flex items-center gap-2 text-sm" for="remember">
                    <input type="checkbox" v-model="remember">
                    تذكرني</label>
            </div>
            <!-- login button -->
             <button
             @click="login"
             :disabled="loading"
             class=" w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
             >
                <span v-if="!loading">تسجيل الدخول</span>
                <!-- spinner -->
                 <span v-else
                 class=" animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 "
                 ></span>
                </button>
                <!-- Divider -->
                 <div class="my-5 text-center text-gray-400">أو</div>
                 <!-- Google Login -->
                  <button
                  @click="loginWithGoogle"
                  class="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
               تسجيل الدخول عبر Google
               </button>

               <!-- رابط تسجيل الدخول -->
      <p class="text-center text-sm mt-5">
        ليس لديك حساب؟
        <RouterLink to="/register" class="text-blue-600 font-semibold">
          سجل الأن 
        </RouterLink>
      </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { showToast } from '../stores/toast';

// State

const email = ref('')
const password = ref('')
const remember = ref(true)
const showPassword = ref(false)
const loading = ref(false)

const errors =  reactive({
    email: '',
    password: ''
})

// Validation
const validate = () =>{
    errors.email = ''
    errors.password = ''
    let valid = true
    if (!email.value.includes('@')) {
        errors.email = 'بريد الكتروني غير صالح'
        valid = false
    }
    if (password.value.length < 6) {
        errors.password = 'كلمة السر خاطئة'
    }
    return valid
}
// Login 
const login = async() => {
    console.log('clicked')
    if (!validate()){
        showToast('البيانات غير صحيحة', 'error');
        return;
    }
     loading.value = true

     // Simulate API call
     setTimeout(() => {
        loading.value = false
        if (email.value === 'admin@gmail.com' && password.value === '123456') {
            showToast('تم تسجيل الدخول بنجاح', 'success');
            if (remember.value) {
                localStorage.setItem('user', JSON.stringify({ email: email.value }));
            }
        }
        else {
            showToast('بيانات الدخول غير صحيحة', 'error');

        }
    }, 2000)
}
const loginWithGoogle = () => {
    showToast('ميزة تسجيل الدخول عبر Google غير متاحة حاليا', 'info');
}
</script>
