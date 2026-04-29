
<template>
<div class="container mx-auto py-10 max-w-2xl">

  <h1 class="text-2xl font-bold mb-6">
    إتمام الطلب
  </h1>
  
  <form  @submit.prevent="checkout" class="space-y-4">
<!-- إذا المستخدم مسجل دخول -->
<div v-if="user" class="bg-emerald-10 p-3 rounded-lg">
  <p class="font-bold text-gray-800">مرحبًا {{ user.name }} 👋</p>
  <p class="text-gray-600">رقم الجوال: {{ user.phone }}</p>

  <button
    type="button"
    class="text-emerald-600 underline mt-2"
    @click="useNewAddress = !useNewAddress"
  >
    تعديل البيانات
  </button>
</div>
<!-- إذا أراد تعديل البيانات أو لم يكن مسجل دخول -->
<div v-if="!user || useNewAddress" class="space-y-3">
  <input v-model="form.customer_name" placeholder="الاسم الكامل" class="input" />
  <input v-model="form.customer_phone" placeholder="رقم الجوال" class="input" />
</div>
<div v-if="addresses.length">

<h2 class="font-bold mb-3">اختر عنوان التوصيل</h2>

<div
v-for="addr in addresses"
:key="addr.id"
class="border p-4 rounded-lg mb-3 cursor-pointer"
:class="selectedAddress === addr.id && 'border-black'"
@click="selectAddress(addr)"
>
<p class="font-bold">{{ addr.title }}</p>
<p>{{ addr.address }}</p>
<p class="text-sm text-gray-500">{{ addr.city }}</p>
<p>{{ addr.postal_code }}</p>
</div>

<button
@click="useNewAddress = true; selectedAddress=null"
class="text-sm underline"
>
استخدام عنوان جديد
</button>

 </div>
    <input
  v-model="form.shipping_address"
  placeholder="العنوان الكامل"
  class="input"
  />

    <input v-model="form.shipping_city"
      placeholder="المدينة"
      class="input"/>

    <input v-model="form.shipping_postal_code"
      placeholder="الرمز البريدي"
      class="input"/>
          <template v-if="loading">
            <skeleton-product v-for="n in 3" :key="n"/>
          </template>
  <div class=" shadow rounded-2xl p-4 mb-6" v-if="cart.length && !loading">
  <h2 class="text-xl font-bold mb-4">🛒 المنتجات في السلة</h2>

  <div v-for="item in cart" :key="item.id" class="border-b py-3">
    <p class="font-semibold">{{ item.product.name }}</p>
    <p class="text-gray-600">الكمية: {{ item.quantity }}</p>
    <p class="text-gray-600">السعر: {{ item.product.sale_price }} ر.س</p>
  </div>

  <p class="text-lg font-bold mt-3">
    الإجمالي: {{ total }} ر.س
  </p>
</div>
    <button class="bg-black text-emerald-50 px-6 py-3 rounded-lg w-full">
      تأكيد الطلب
    </button>

  </form>

  
</div>
</template>


<script setup>
import { useRouter } from "vue-router"
import {ref, onMounted, reactive } from "vue"
import SkeletonProduct from "../components/SkeletonProduct.vue"
import  api  from "../api/api"
import { showToast } from "../stores/toast";
import { useCartStore } from "../stores/cart";

const router = useRouter()

const addresses = ref([])
const selectedAddress = ref(null)
const useNewAddress = ref(false)
const loading = ref(true)
const cart = ref([])
const total = ref(0)

const selectAddress = (addr) => {
  selectedAddress.value = addr.id;
  useNewAddress.value = false;

  form.customer_name = user.value?.name ?? "";
  form.customer_phone = user.value?.phone ?? "";

  form.shipping_address = addr.address;
  form.shipping_city = addr.city;
  form.shipping_postal_code = addr.postal_code;
};

const user = ref(null)
const form = reactive({
  customer_name:"",
  customer_phone:"",
  shipping_address:"",
  shipping_city:"",
  shipping_postal_code:""
})

// تحميل بيانات المستخدم
const loadUser = async () => {
  try {
    const res = await api.get("/auth/user")
    user.value = res.data
    form.customer_name = res.data.name
    form.customer_phone = res.data.phone
    form.shipping_city = res.data.city
    form.shipping_address = res.data.address
    form.shipping_postal_code = res.data.postal_code
  } catch (e) {
    // المستخدم غير مسجل دخول
    form.customer_name = ""
    form.customer_phone = ""
    form.shipping_city = ""
    form.shipping_address = ""
    form.shipping_postal_code = ""
  }
}
const loadCart = async () => {
  const res = await api.get("/cart")
  cart.value = res.data.items
  console.log("Cart items =>", cart.value)
  // console.log('Res222', res.data)
  total.value = res.data.total
}
// إنشاء الطلب
const checkout = async () => {
  console.log("Checkout Payload =>", {
    selectedAddress: typeof(selectedAddress.value),
    form: form,
    cart: cart.value
  })
  const payload = selectedAddress.value
    ? {
        address_id: selectedAddress.value,
        cart: cart.value
      }
    : {
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        shipping_city: form.shipping_city,
        shipping_postal_code: form.shipping_postal_code,
      };
  try {
    const res = await api.post("/auth/checkout", payload);
    showToast("تم إنشاء الطلب بنجاح");
    router.push(`/payment/${res.data.order_id}`)
  } catch (err) {
    console.log("Checkout Error:", err.response.data);
    showToast("حدث خطأ أثناء إنشاء الطلب", "error");
  }
};

// تحميل بيانات العنوان وطرق الدفع
const loadCheckoutData = async () => {
  const res = await api.get("/addresses")
  console.log('Addresses Res =>', res.data)
  addresses.value = res.data;
  console.log('Addresses => ', addresses.value)
  loading.value = false;
}

// تحميل بيانات العنوان وطرق الدفع
onMounted(() => {
  loading.value = true;
  console.log("Session ID sent:", localStorage.getItem("session_id"));
  console.log("Session ID cart:", localStorage.getItem("session_id"));

  loadUser()
  loadCart()
  loadCheckoutData()
     setTimeout
(() => {
    loading.value = false
  }, 3000) // Simulate loading delay
})

</script>