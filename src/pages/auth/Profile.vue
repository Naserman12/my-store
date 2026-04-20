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
          class="w-full text-right p-3 rounded-lg hover:bg-amber-100 transition text-red-500"
        >
        <logout-btn />
         
        </button>

      </div>

      <!-- المحتوى -->
      <div class="md:col-span-3 bg-white shadow rounded-xl p-6">

        <!-- معلوماتي -->
        <div v-if="activeTab === 'معلوماتي'">

          <div class="flex items-center gap-4 mb-6">
              <div class="relative cursor-pointer" @click="selectImage">

            <img
            :src="userAvatar || avatarPreview || defaultAvatar"
            class="w-16 h-16 rounded-full object-cover"
            />

            <div class="absolute inset-0 bg-black/40 rounded-full
                        flex items-center justify-center
                        text-white text-xs opacity-0 hover:opacity-100 transition">
            تغيير
            </div>

        </div>
                <input
            type="file"
            accept="image/*"
            ref="fileInput"
            class="hidden"
            @change="uploadAvatar"
        />

            <!-- <img
              src="https://i.pravatar.cc/100"
              class="w-16 h-16 rounded-full"
            /> -->
            <div>
              <h2 class="font-bold text-lg">{{ form.name }}</h2>
              <p class="text-gray-500">{{ form.email }}</p>
            </div>
          </div>

          <form @submit.prevent="updateProfile" class="space-y-4">

            <input
              v-model="form.name"
              placeholder="الاسم"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <input
              v-model="form.email"
              placeholder="البريد الإلكتروني"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />
            <input
            v-model="form.phone"
            placeholder="رقم الجوال (اختياري)"
            class="w-full border rounded-lg px-3 py-2"
            />

            <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition">
              حفظ التغييرات
            </button>

          </form>
        </div>

        <!-- الطلبات -->
        <div v-if="activeTab === 'طلباتي'">

  <div v-if="orders.length === 0" class="text-gray-500">
    لا توجد طلبات بعد
  </div>

  <div v-for="order in orders"
       :key="order.id"
       class="border rounded-lg p-4 mb-4">

    <div class="flex justify-between mb-2">

      <div>
        <p class="font-bold">
          طلب رقم #{{ order.order_number }}
        </p>
        <p class="text-sm text-gray-500">
          {{ new Date(order.created_at).toLocaleDateString() }}
        </p>
      </div>

      <span class="px-3 py-1 rounded bg-gray-100">
        {{ order.status }}
      </span>

    </div>

    <p class="font-bold">
      الإجمالي: {{ order.total }} {{ order.currency }}
    </p>

    <button
      @click="selectedOrder = order"
      class="mt-3 text-sm text-gray-900 underline">
      عرض التفاصيل
    </button>

  </div>

        <!-- تفاصيل الطلب -->
        <div v-if="selectedOrder" class="mt-6 border-t pt-6">

            <h3 class="font-bold mb-3">
            تفاصيل الطلب
            </h3>

            <div v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex justify-between border-b py-2">

            <span>{{ item.product_name }}</span>
            <span>x{{ item.quantity }}</span>
            <span>{{ item.total_price }}</span>

            </div>

        </div>

        </div>

        <!-- العناوين -->
       <div v-if="activeTab === 'العناوين'">

        <button
            @click="showAddressForm = true"
            class="mb-4 bg-gray-900 text-white px-4 py-2 rounded"
        >
        <i class="fas fa-plus text-white"></i>
            إضافة عنوان
        </button>

        <div v-for="address in addresses" :key="address.id"
            class="border p-4 rounded mb-3">

            <h3 class="font-bold">{{ address.title }}</h3>
            <p>{{ address.city }} - {{ address.address }}</p>

            <button @click="editAddress(address)" class="bg-yellow-500 ml-1 text-white px-2 py-1 rounded">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteAddress(address.id)"
                    class="text-red-500 ml-1 bg-red-100 px-2 py-1 rounded">
            <i class="fas fa-trash"></i>
            </button>

        </div>
        <!-- Address Modal -->
<div
  v-if="showAddressForm"
  class="fixed inset-0 bg-black/40 flex items-center justify-center"
>

  <div class="bg-white p-6 rounded-xl w-full max-w-md">

    <h2 class="text-xl font-bold mb-4">
      {{ editingAddress ? 'تعديل العنوان' : 'إضافة عنوان' }}
    </h2>

    <form @submit.prevent="saveAddress" class="space-y-3">

      <input v-model="addressForm.title"
             placeholder="اسم العنوان (المنزل / العمل)"
             class="input"/>

      <input v-model="addressForm.city"
             placeholder="المدينة"
             class="input"/>

      <textarea v-model="addressForm.address"
                placeholder="العنوان الكامل"
                class="input"></textarea>

      <input v-model="addressForm.postal_code"
             placeholder="الرمز البريدي"
             class="input"/>

      <input v-model="addressForm.phone"
             placeholder="رقم الجوال"
             class="input"/>

      <div class="flex gap-2 pt-3">

        <button class="bg-gray-900 text-white px-4 py-2 rounded">
          حفظ
        </button>

        <button type="button"
                @click="closeAddressForm"
                class="border px-4 py-2 rounded">
          إلغاء
        </button>

      </div>

    </form>

  </div>
</div>

        </div>
        <!-- تغيير كلمة المرور -->
        <div v-if="activeTab === 'تغيير كلمة المرور'">
           <form @submit.prevent="updatePassword" class="space-y-4">

            <input
              v-model="password.current_password"
              type="password"
              placeholder="كلمة المرور الحالية"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <input
              v-model="password.password"
              type="password"
              placeholder="كلمة المرور الجديدة"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <input
              v-model="password.password_confirmation"
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition">
              تحديث كلمة المرور
            </button>
          </form>

        </div>

      </div>

    </div>  
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from "vue"
import api from "../../api/api"
import { showToast } from '../../stores/toast'
import { useRouter } from "vue-router"
import { useAuthStore } from '../../stores/auth'
import LogoutBtn from "./LogoutBtn.vue"


const editingAddress = ref(null)
const addresses = ref([])
const activeTab = ref('معلوماتي')
const fileInput = ref(null)
const avatarPreview = ref(null)
const defaultAvatar = 'https://i.pravatar.cc/100'
const userAvatar = ref(null)
const showAddressForm = ref(false)
const router = useRouter();
const user = ref(null);
const authStore = useAuthStore();

const orders = ref([])
const selectedOrder = ref(null)

const selectImage = () => {
  fileInput.value.click()
}
const menu = [
  'معلوماتي',
  'طلباتي',
  'العناوين',
  'تغيير كلمة المرور'
]
const form = reactive({
  name:"",
  email:"",
  phone:"",
})
const addressForm = reactive({
  title:"",
  city:"",
  address:"",
  phone:"",
  postal_code :"",
})

function resetAddressForm(){
  addressForm.title = ""
  addressForm.city = ""
  addressForm.address = ""
  addressForm.phone = ""
  addressForm.postal_code = ""
}
const password = reactive({
  current_password:"",
  password:"",
  password_confirmation:""
})

//  تحميل بيانات الملف الشخصي
  const loadProfile = async () => {
    try {
    const res = await api.get("/profile");
    user.value = res.data.data || res.data.user || res.data;
    console.log("Profile data =>", user.value)
    form.name = user.value.name
    form.email = user.value.email
    form.phone = user.value.phone
    if (user.value.avatar) {
      userAvatar.value = user.value.avatar
        console.log(userAvatar.value, 'User avatar URL' , user.value.avatar)
    }
    } catch (e) {
      console.log("ERROR FULL:", e)
      console.log("ERROR RESPONSE:", e.response)
      console.log("ERROR DATA:", e.response?.data)
      showToast("حدث خطأ أثناء تحميل بيانات الملف الشخصي", "error")
      router.push("/login")
    }
  }

// رفع صورة الملف الشخصي
const uploadAvatar = async (e) => {

  const file = e.target.files[0]
    if (!file) { showToast("لم يتم اختيار ملف", "error") }  ;
  avatarPreview.value = URL.createObjectURL(file)

  const formData = new FormData()
  formData.append("avatar", file)
  try {
    const res = await api.post("/profile/avatar", formData)
    console.log("FULL RESPONSE =>", res)
    console.log("Avatar upload response =>", res.data)
    console.log("New avatar URL =>", res.data.avatar)
    
    userAvatar.value = res.data.avatar
    user.value.avatar = res.data.avatar
    showToast("تم تحديث الصورة ✅")
  } catch (e) {
    console.log('Error uploading avatar:', e.response?.data)
    showToast("فشل رفع الصورة ❌", "error")
  }

}

// تحديث بيانات الملف الشخصي
const updateProfile = async () => {
  await api.put("/profile", form) 
  showToast('تم تحديث البيانات ✅')
}

// تحديث كلمة المرور
const updatePassword = async () => {
  await api.put("/profile/password", password)
  showToast('تم تحديث كلمة المرور ✅')
}
const loadAddresses = async () => {
  const res = await api.get("/addresses")
  addresses.value = res.data
}
// حفظ العنوان الجديد أو المعدل
const saveAddress = async () => {
  if (editingAddress.value) {
    console.log(["تعديل العنوان", editingAddress.value.id], ['user_id =>', editingAddress.value.user_id])
    await api.put(`/addresses/${editingAddress.value.id}`, addressForm)
  } else {
    await api.post("/addresses", addressForm)
  }
  showToast("تم حفظ العنوان ✅");
  loadAddresses();
  resetAddressForm();
  closeAddressForm();
}
// حذف العنوان
const deleteAddress = async (id) => {
  await api.delete(`/addresses/${id}`)
  loadAddresses()
  showToast("تم حذف العنوان", "info")
}
watch(activeTab, (val)=>{
  if(val === "العناوين"){
    loadAddresses()
  }
})
// تعديل العنوان
const editAddress = (address) => {
  editingAddress.value = address
  addressForm.title = address.title
  addressForm.city = address.city
  addressForm.address = address.address
  addressForm.postal_code = address.postal_code
  addressForm.phone = address.phone
  showAddressForm.value = true
}
// اغلاق نموذج العنوان
const closeAddressForm = () => {
  showAddressForm.value = false
  editingAddress.value = null
  resetAddressForm()
}

// تحميل الطلبات
 const loadOrders = async () => {
  const res = await api.get("/auth/my-orders")
  orders.value = res.data
}
watch(activeTab,(val)=>{
  if(val === "طلباتي"){
    loadOrders()
  }
})
onMounted(() => {
  console.log("Mounted profile page")
  const token = localStorage.getItem("token");
  console.log("Token =>", token)
  if (!token) {
    router.push("/login");
    return;
  }
  loadProfile();
});

</script>

