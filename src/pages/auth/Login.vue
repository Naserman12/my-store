<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import authApi from "../../api/authApi";
import { useAuthStore } from '../../stores/auth'
import { showToast } from '../../stores/toast'

const router = useRouter();
const authStore = useAuthStore();


const form = reactive({
  email: '',
  password: '',
})
const error = ref("");
const showPassword = ref(false)
const loading = ref(false)
const remember = ref(false)

const login = async () => {
    try {
     loading.value = true;
    const res = await authStore.login(form);
    setTimeout(() => {
        showToast("اهلا  بعودتك", "success")
        if (remember.value) {
            localStorage.setItem('user', form.email)     
        }
        localStorage.setItem('user', JSON.stringify(res.data.user));
        loading.value = false; 
    }, 500);
  } catch (e) {
    error.value = "Login failed";
  }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-center">تسجيل الدخول</h2>
            <!-- Email field -->
            <div class="mb-4">
                <label for="email" class=" block mb-1 text-sm">الريد الألكتروني</label>
                <input 
                v-model="form.email"
                type="email"
                class="w-full border rounded-lg px-3 py-2 focus:right-2 focus:ring-blue-500 outline-none" placeholder="example@mail.com"
                />
                <!-- <p v-if="errors.email" class="bg-red-100 text-red-500 text-sm mt-1">
                    {{ errors.email }}
                </p> -->
            </div>
            <!-- Password field -->
            <div class="mb-4 relative">
                <label for="password" class=" block mb-1 text-sm">كلمة المرور</label>
                <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
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
            </div>
            <!-- Remember me -->
            <div class="flex items-center justify-between mb-4">
                <label class=" flex items-center gap-2 text-sm" for="remember">
                    <input type="checkbox" v-model="remember">
                    تذكرني</label>
                </div>
                <p v-if="error" class="bg-red-100 text-red-500 text-center text-sm mt-1">
                    {{ error }}
                </p>
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

<!-- <template>
  <div>
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />

    <button @click="login">Login</button>

    <p v-if="error">{{ error }}</p>
  </div>
</template> -->