<template>
<div class="min-h-screen py-10 px-4"
     :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'">

  <div class="max-w-3xl mx-auto">

    <h1 class="text-3xl font-bold mb-8 text-center">
      📦 إتمام الطلب
    </h1>

    <!-- تنبيه -->
    <div v-if="!user"
         class="p-3 rounded mb-4 text-sm text-center font-medium"
         :class="darkMode ? 'bg-yellow-700 text-white' : 'bg-yellow-100 text-yellow-800'">
      يجب تسجيل الدخول لإتمام الطلب
    </div>

    <form @submit.prevent="checkout" class="space-y-6">

      <!-- بيانات المستخدم -->
      <div v-if="user"
           class="p-4 rounded-lg shadow"
           :class="darkMode ? 'bg-gray-800' : 'bg-white'">

        <div class="flex justify-between items-center">
          <p class="font-bold text-lg">👋 {{ user.name }}</p>

          <button type="button"
                  class="text-sm underline opacity-70 hover:opacity-100"
                  @click="useNewAddress = !useNewAddress">
            تعديل
          </button>
        </div>
      </div>

      <!-- إدخال يدوي -->
      <div v-if="!user || useNewAddress"
           class="grid grid-cols-1 md:grid-cols-2 gap-3">

        <input v-model="form.customer_name"
               placeholder="الاسم"
               class="p-3 rounded border transition outline-none"/>

        <input v-model="form.customer_phone"
               placeholder="الجوال"
               class="p-3 rounded border transition outline-none"/>
               <input
                 v-model="form.customer_email"
                 placeholder="البريد الإلكتروني"
                 class="input md:col-span-2"
               />
      </div>


      <!-- العناوين -->
      <div v-if="addresses.length"
           class="p-4 rounded-lg shadow"
           :class="darkMode ? 'bg-gray-800' : 'bg-white'">

        <h2 class="font-bold mb-3">📍 اختر عنوان</h2>

        <div class="space-y-2">
          <div v-for="addr in addresses"
               :key="addr.id"
               @click="selectAddress(addr)"
               class="p-3 rounded cursor-pointer transition border"
               :class="[
                 darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-100',
                 selectedAddress === addr.id
                   ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-800'
                   : ''
               ]">

            <p class="font-semibold">{{ addr.address }}</p>
            <p class="text-sm opacity-70">{{ addr.city }}</p>
          </div>
        </div>

        <button type="button"
                @click="resteForm"
                class="text-sm mt-3 underline">
          ➕ عنوان جديد
        </button>
      </div>

      <!-- العنوان الجديد -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input v-model="form.shipping_address" placeholder="العنوان" class="p-3 rounded border transition outline-none"/>
        <input v-model="form.shipping_city" placeholder="المدينة" class="p-3 rounded border transition outline-none"/>
        <input v-model="form.shipping_postal_code" placeholder="الرمز البريدي" class="p-3 rounded border transition outline-none"/>
      </div>

      <!-- السلة -->
      <div class="p-4 rounded-lg shadow"
           :class="darkMode ? 'bg-gray-800' : 'bg-white'">

        <h2 class="font-bold mb-3">🛒 السلة</h2>

        <div v-for="item in cartItems"
             :key="item.id"
             class="flex justify-between py-2 border-b last:border-none"
             :class="darkMode ? 'border-gray-700' : ''">

          <span>{{ item.product.name }}</span>
          <span>x{{ item.quantity }}</span>
        </div>

        <div class="flex justify-between mt-4 text-lg font-bold">
          <span>الإجمالي</span>
          <span>{{ total }} ر.س</span>
        </div>
      </div>

      <!-- زر -->
      <button
        class="w-full py-3 rounded-lg font-bold transition"
        :class="darkMode
          ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white'"
      >
        تأكيد الطلب 🚀
      </button>

    </form>
  </div>
</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue"
import api from "../api/api"
import { useRouter } from "vue-router"
import { showToast } from "../stores/toast"
import { useAuthStore } from "../stores/auth"
import cartApi from "../api/cart"
import { useDarkMode } from "../components/useDarkMode"

const { darkMode } = useDarkMode()
const auth = useAuthStore()

const router = useRouter()

const user = ref(null)
const addresses = ref([])
const selectedAddress = ref(null)
const useNewAddress = ref(false)

const cart = ref(null)
const cartItems = ref([])
const total = ref(0)

const form = reactive({
  customer_name:"",
  customer_email: "",
  customer_phone:"",
  shipping_address:"",
  shipping_city:"",
  shipping_postal_code:""
})
const resteForm = () => {
  form.customer_name = '',
  form.customer_email = "",
  form.customer_phone ="",
  form.shipping_address = "",
  form.shipping_city = "",
  form.shipping_postal_code =""
}
const loadUser = async () => {
  try {
    const res = await api.get("/auth/user")
    user.value = res.data
    form.customer_name = res.data.name
    form.customer_phone = res.data.phone
    form.customer_email = res.data.email
  } catch {}
}


const loadCart = async () => {

  const res = await cartApi.getCart()
  console.log("Cart data loaded check:", res.data);
  cart.value = res.data
  cartItems.value = res.data.items
  total.value = res.data.total
}

const loadAddresses = async () => {
  try {
    const res = await api.get("/addresses")
    addresses.value = res.data
  } catch {}
}

const selectAddress = (addr) => {
  selectedAddress.value = addr.id

  form.customer_name = user.value?.name ?? ""
  form.customer_phone = user.value?.phone ?? ""   
  form.customer_email = user.value?.email ?? ""   

  form.shipping_address = addr.address
  form.shipping_city = addr.city
  form.shipping_postal_code = addr.postal_code
}

const checkout = async () => {
  if (!user.value) {
 
  showToast("يجب تسجيل الدخول أولاً", "error") 
  router.push(`/login`)
  
  
  }
  if (!cartItems.value || cartItems.value.length === 0) {
    return showToast("السلة فارغة", "error")
  }

  if (!selectedAddress.value && !form.shipping_address) {
    return showToast("أدخل العنوان", "error")
  }

  const payload ={
        address_id: selectedAddress.value,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        shipping_city: form.shipping_city,
        shipping_postal_code: form.shipping_postal_code,
        shipping_method: "free", 
        payment_method: "cash"
    };

          if (!form.customer_phone) {
      return showToast("أدخل رقم الجوال", "error")
      }

      if (!form.customer_email) {
      return showToast("أدخل البريد الإلكتروني", "error")
      }
     try {
      console.log('payload =>', payload,'Cart =>', cart.value)
      const res = await api.post("/auth/checkout", payload)
      console.log('after post payload =>', payload,'Cart =>', cart.value)
      console.log( 'res check Value => ', res.data)
    showToast("تم إنشاء الطلب بنجاح");
    console.log('checkk', cart.value);
      router.push({
      name: "payment",
      params: { id: res.data.order.id },
      state: { order: res.data.order }
    });
  } catch (err) {
    console.log("Checkout Error:", err.response || err);
    showToast("❌ صار خطأ في الطلب، لا تخاف مو منك 😅 ", 'error');
  }


}

onMounted(() => {
  loadUser()
  loadCart()
  loadAddresses()
})
</script>
