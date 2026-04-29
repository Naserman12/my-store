<template>
  <div class="min-h-screen px-4 py-10"
  :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'">

    <!-- عنوان -->
    <h1 class="text-3xl font-bold mb-8 text-center">
      حسابي
    </h1>

    <div class="grid md:grid-cols-4 gap-8">

      <!-- القائمة الجانبية -->
      <div class=" shadow rounded-xl p-5 space-y-3" :class="darkMode ? 'hover:bg-gray-600 bg-gray-500' : 'hover:bg-gray-100'">
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
          :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
        >
        <logout-btn />
         
        </button>

      </div>

      <!-- المحتوى -->
      <div class="md:col-span-3  shadow rounded-xl p-6">

        <!-- معلوماتي -->
        <div v-if="activeTab === 'معلوماتي'">

          <div class="flex items-center gap-4 mb-6"
        :class="darkMode ? 'bg-gray-800' : 'bg-white'">
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

            <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition" :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
              حفظ التغييرات
            </button>

          </form>
        </div>

        <!-- الطلبات -->
   <!-- الطلبات -->
<div v-if="activeTab === 'طلباتي'">

  <!-- 🟢 عرض القائمة (إذا ما تم اختيار طلب) -->
  <div v-if="!selectedOrder">

    <div v-if="orders.length === 0" class="opacity-70">
      لا توجد طلبات بعد
    </div>
    <div v-for="order in orders"
         :key="order.id"
         class="rounded-lg p-4 mb-4 shadow"
         :class="darkMode ? 'bg-gray-800' : 'bg-white'">

      <div class="flex justify-between items-center">

        <!-- صورة + معلومات -->
        <div class="flex items-center gap-3">

          <!-- 🖼️ صورة افتراضية -->
          <img
            :src="order.items?.[0]?.product_images?.[0] || 'https://via.placeholder.com/100'"
            class="w-14 h-14 rounded object-cover border"
          />

          <div>
            <p class="font-bold">
              طلب رقم #{{ order.order_number }}
            </p>

            <p class="text-sm opacity-70">
              {{ new Date(order.created_at).toLocaleDateString() }}
            </p>
          </div>

        </div>

        <!-- الحالة -->
        <span
          class="px-3 py-1 rounded text-sm"
          :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
          {{ order.status }}
        </span>

      </div>

      <p class="font-bold mt-3">
        الإجمالي: {{ order.total }} {{ order.currency }}
      </p>

      <button
        @click="selectedOrder = order"
        class="mt-3 text-sm underline opacity-80 hover:opacity-100">
        عرض التفاصيل
      </button>

    </div>

  </div>

  <!-- 🔵 عرض التفاصيل فقط -->
  <div v-else
       class="rounded-lg p-5 shadow"
       :class="darkMode ? 'bg-gray-800' : 'bg-white'">

    <!-- زر الرجوع -->
    <button
      @click="selectedOrder = null"
      class="mb-4 text-sm underline opacity-80 hover:opacity-100">
      ← رجوع للطلبات
    </button>

    <h3 class="font-bold mb-4 text-lg">
      تفاصيل الطلب #{{ selectedOrder.order_number }}
    </h3>

    <!-- المنتجات -->
    <div
      v-for="item in selectedOrder.items"
      :key="item.id"
      class="py-4 border-b"
      :class="darkMode ? 'border-gray-700' : ''"
    >

      <div class="flex gap-4">

        <!-- صورة رئيسية -->
        <img
          :src="item.product_images?.[0] || 'https://via.placeholder.com/150'"
          class="w-20 h-20 rounded object-cover"
        />

        <!-- بيانات -->
        <div class="flex-1">
          <p class="font-bold">{{ item.product_name }}</p>
          <p class="text-sm opacity-70">x{{ item.quantity }}</p>
          <p class="font-semibold">{{ item.total_price }}</p>
        </div>

      </div>

      <!-- باقي الصور -->
      <div
        v-if="item.product_images?.length > 1"
        class="flex gap-2 mt-3"
      >
        <img
          v-for="img in item.product_images"
          :key="img"
          :src="img"
          class="w-12 h-12 rounded object-cover border"
        />
      </div>

    </div>

    <!-- 🧾 التايم لاين -->
    <div v-if="selectedOrder.status_logs?.length"
         class="mt-6">

      <h4 class="font-bold mb-3">
        📊 حالة الطلب
      </h4>

      <div class="space-y-4">

        <div
          v-for="log in selectedOrder.status_logs"
          :key="log.id"
          class="flex items-start gap-3"
        >

          <div
            class="w-3 h-3 mt-2 rounded-full"
            :class="{
              'bg-yellow-400': log.status === 'pending_payment',
              'bg-blue-400': log.status === 'processing',
              'bg-green-500': log.status === 'paid',
              'bg-gray-400': !log.status
            }"
          ></div>

          <div>
            <p class="font-semibold text-sm">
              {{ log.status }}
            </p>

            <p class="text-xs opacity-70">
              {{ log.note }}
            </p>

            <p class="text-xs opacity-50">
              {{ new Date(log.created_at).toLocaleString() }}
            </p>
          </div>

        </div>
        <!-- زر الفاتورة -->
<div v-if="showInvoice(selectedOrder)" class="mt-6">

  <button
    @click="downloadInvoice(selectedOrder)"
    class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
  >
    📄 عرض الفاتورة
  </button>

</div>
      </div>

    </div>

  </div>

</div>

        <!-- العناوين -->
       <div v-if="activeTab === 'العناوين'">

        <button
            @click="showAddressForm = true"
            :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
            class="mb-4 bg-gray-900 text-white px-4 py-2 rounded"
        >
        <i class="fas fa-plus text-white"></i>
            إضافة عنوان
        </button>
    
        <div v-for="address in addresses" :key="address.id"
            class="border p-4 rounded mb-3">

            <h3 class="font-bold">{{ address.title }}</h3>
            <p>{{ address.city }} - {{ address.address }}</p>

            <button @click="editAddress(address)" class="bg-yellow-500 ml-1 text-white px-2 py-1 rounded" :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteAddress(address.id)"
                    class="text-red-500 ml-1 bg-red-100 px-2 py-1 rounded" :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
            <i class="fas fa-trash"></i>
            </button>

        </div>
        <!-- Address Modal -->
<div
  v-if="showAddressForm"
  class="fixed inset-0 bg-black/40 flex items-center justify-center"
>

<div class="p-6 rounded-xl w-full max-w-md"
     :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white'">

  <h2 class="text-xl font-bold mb-4">
    {{ editingAddress ? 'تعديل العنوان' : 'إضافة عنوان' }}
  </h2>

  <form @submit.prevent="saveAddress">

    <!-- اختيار الوضع -->
    <div class="flex gap-2 mb-4">

      <button type="button"
              @click="mode = 'manual'"
              :class="mode === 'manual'
                ? 'bg-gray-900 text-white'
                : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200')"
              class="px-3 py-1 rounded">
        ✍️ يدوي
      </button>

      <button type="button"
              @click="mode = 'map'"
              :class="mode === 'map'
                ? 'bg-gray-900 text-white'
                : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200')"
              class="px-3 py-1 rounded">
        📍 الخريطة
      </button>

    </div>

    <!-- إدخال يدوي -->
    <div v-if="mode === 'manual'" class="space-y-3">

      <input v-model="addressForm.title" placeholder="اسم العنوان" class="input"/>
      <input v-model="addressForm.city" placeholder="المدينة" class="input"/>
      <textarea v-model="addressForm.address" placeholder="العنوان الكامل" class="input"></textarea>
      <input v-model="addressForm.postal_code" placeholder="الرمز البريدي" class="input"/>
      <input v-model="addressForm.phone" placeholder="رقم الجوال" class="input"/>

    </div>

    <!-- الخريطة -->
    <div v-if="mode === 'map'" class="space-y-3">

      <MapPicker @select="setLocation" />

      <p class="text-sm mt-2">
        📍 Lat: {{ addressForm.lat }} | Lng: {{ addressForm.lng }}
      </p>

    </div>

    <!-- أزرار -->
    <div class="flex gap-2 pt-4">

      <button
        type="submit"
        class="bg-gray-900 text-white px-4 py-2 rounded w-full
               hover:opacity-90">
        حفظ
      </button>

      <button
        type="button"
        @click="closeAddressForm"
        class="border px-4 py-2 rounded w-full">
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

            <button class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition" :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
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
import { useDarkMode } from "../../components/useDarkMode"
import MapPicker from "../../components/MapPicker.vue"
const { darkMode } = useDarkMode()

const mode = ref("manual")
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
  lat: "",
  lng: "",
  postal_code :"",
})
const setLocation = async (coords) => {
  addressForm.lat = coords.lat
  addressForm.lng = coords.lng

  // اختياري: جلب العنوان تلقائي
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`
  )
  const data = await res.json()

  addressForm.address = data.display_name
  addressForm.city =
  data.address?.city ||
  data.address?.town || 
  data.address?.village ||
  "غير معروف"
}
const showInvoice = (order) => {
  if (!order) return false

  return order.payment_method === 'cash'
    || order.status === 'delivered'
}
const downloadInvoice = (order) => {
  window.open(`/auth/invoice/${order.id}`, '_blank')
}
function resetAddressForm(){
  addressForm.title = ""
  addressForm.city = ""
  addressForm.address = ""
  addressForm.phone = user.value.phone || ""
  addressForm.postal_code = ""
}
const password = reactive({
  current_password:"",
  password:"",
  password_confirmation:""
})
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

  // 🟡 تحقق حسب الوضع
  if (mode.value === 'map') {

    if (!addressForm.lat || !addressForm.lng) {
      showToast("اختر موقع من الخريطة 📍", "error")
      return
    }

    // لو اختار من الخريطة وما كتب عنوان
    if (!addressForm.address) {
      showToast("جاري تعبئة العنوان تلقائيًا...", "info")
    }

  } else {

    // ✍️ الوضع اليدوي
    if (!addressForm.title || !addressForm.city || !addressForm.address) {
      showToast("يرجى تعبئة جميع الحقول", "error")
      return
    }

  }

  try {

    // 🧠 تجهيز البيانات حسب الوضع
    const payload = {
      title: addressForm.title,
      city: addressForm.city,
      address: addressForm.address,
      phone: addressForm.phone,
      postal_code: addressForm.postal_code,
      lat: mode.value === 'map' ? addressForm.lat : null,
      lng: mode.value === 'map' ? addressForm.lng : null,
      location_type: mode.value // 👈 (manual / map)
    }

    if (editingAddress.value) {

      await api.put(`/addresses/${editingAddress.value.id}`, payload)

    } else {

      await api.post("/addresses", payload)

    }

    showToast("تم حفظ العنوان ✅")

    loadAddresses()
    resetAddressForm()
    closeAddressForm()

  } catch (e) {

    console.log(e.response?.data)
    showToast("فشل حفظ العنوان ❌", "error")

  }

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
  addressForm.phone = user.value.phone
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

