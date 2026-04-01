<template>
    <div class="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <h1 class=" text-xl font-bold mb-4 text-center">
             ملخص الطلب 🛒
        </h1>
        <!-- قائمة المنتجات -->
         <div v-if="cart.length" class=" text-3xl font-bold mb-4 text-center">
            <div v-for="item in cart" :key="item.id" class="flex justify-between border-b py-3">
                <div class="flex-1">
                    <p class=" font-semibold">{{ item.name }}</p>
                    <p class=" text-gray-700">الكمية: {{ item.quantity }}</p>
                    <p class="text-gray-700">الاسعر الاساسي: {{ item.oldPrice }} ر.س</p>
                    <p class="text-gray-700">الخصم: {{ item.discount }}% ر.س</p>
                    <p class="text-gray-700">السعر: {{ item.newPrice }} ر.س</p>
                     <!-- التحكم بالكمية واضافة للسلة -->
                      <div class="flex flex-col justify-between mb-6 p-4 rounded-lg">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <span class=" font-semibold ml-3">الكمية:</span>
                            <div class="flex items-center border border-amber-50 rounded-md overflow-hidden bg-white">
                                <button @click="cartStore.decreaseQuantity(item.id)" class=" px-3 py-1 bg-emerald-100 hover:text-amber-50 hover:bg-red-600 transition-colors" >
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="px-4 py-2 w-12 text-center">{{ item.quantity }}</span>
                                <button @click="cartStore.increaseQuantity(item.id)" class="px-3 py-1 bg-emerald-100 hover:bg-emerald-700 hover:text-amber-50 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button @click="handleDelete(item.id)" class="text-red-700 hover:underline">حذف</button>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="goBack" type="submit" class="mt-4 bg-gray-600 hover:bg-gray-700 m-2 text-amber-50 px-3 py-1.5 rounded-lg "> اكمل التسوق</button>
            <p class="text-gray-700">الإجمالي: {{ totalPrice }} ر.س</p>
            <!-- نموذج الدفع -->
           <div class="mt-6 p-4 rounded-xl shadow">
               <form @submit.prevent="nextStep">
                   <h2 class="font-bold mb-2 text-2xl"> معلومات جهة الاتصال</h2>
                   <p class=" font-semibold text-sm text-gray-500"> سوف يتم التواصل معك من خلال هذا الايميل وارسال التحديثات</p>
                    <input
                    v-model="checkout.shipping.email"
                    placeholder="البريد الإلكتروني"
                    class="w-full border p-2 rounded mb-3"
                    />
                   <!-- عرض العنوان إذا موجود -->
                   <div v-if="checkout.shipping.address && !showAddressForm"
                       class="bg-gray-100 p-3 rounded flex justify-between">
    
                   <span>{{ checkout.shipping.address }}</span>
    
                   <button
                   type="button"
                       @click="toggleAddress"
                       class="text-emerald-600"
                   >
                       تعديل
                   </button>
                   </div>
                   <!-- زر اضافة عنوان -->
                   <button type="button"
                   v-if="!showAddressForm && !checkout.shipping.address"
                   @click="toggleAddress"
                   class="text-emerald-600 font-semibold mb-3"
                   >
                   ➕ إضافة عنوان
                   </button>
                   <!-- الحقول المخفية -->
                   <div v-if="showAddressForm" class="space-y-3">
                   <input
                    v-model="checkout.shipping.address"
                    placeholder="العنوان"
                    class="w-full border p-2 rounded"
                    />
    
                   <button type="button"
                       @click="toggleAddress"
                       class="bg-emerald-600 text-white px-3 py-2 rounded"
                   >
                       حفظ العنوان
                   </button>
                   </div>
                   
                   <h3 class="font-bold mt-5 mb-2">🚚 طريقة الشحن</h3>
                   <!-- <label class="block mb-2">العنوان:</label>
                   <input v-model="checkout.shipping.address" type="text" class="w-full border p-2 rounded mb-3" required /> -->
                   <label class="block mb-2">القسيمة (إختياري):</label>
                   <input v-model="checkout.shipping.coupon" type="text" class="w-full border p-2 rounded mb-3" />
                   <h3 class=" font-bold mb-2">خيارات الشحن</h3>
                   <div class="mb-3 space-y-2">
                       <label class="block"><input type="radio" v-model="checkout.shipping.method" value="free"  @change="checkout.setShippingMethod('free')"> 3-5 أيام عمل شحن مجاني</label>
                       <label class="block"><input type="radio" v-model="checkout.shipping.method" value="mrsool"  @change="checkout.setShippingMethod('mrsool')">مرسول (سريع)</label>
                       <label class="block"><input type="radio" v-model="checkout.shipping.method" value="store"  @change="checkout.setShippingMethod('store')"> استلام من متجر معتمد </label>
                       <label class="block"><input type="radio" v-model="checkout.shipping.method" value="ourStore"  @change="checkout.setShippingMethod('ourStore')"> استلام من متجرنا (موصى به)</label>
                   </div>
                   <p class=" font-bold">الإجمالي: {{ totalPrice }} ر.س</p>
                   <button type="submit" class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-amber-50 px-4 py-2 rounded-lg ">إتمام الطلب</button>
               </form>
           </div> 
               <!-- طرق الدفع -->
                <div class="mt-6 border-t pt-4">
    
               <h3 class="font-semibold mb-3">
               💳 طرق الدفع المدعومة
               </h3>
    
               <div class="flex gap-4 flex-wrap">
    
               <img src="https://img.icons8.com/color/48/visa.png"/>
               <img src="https://img.icons8.com/color/48/mastercard.png"/>
               <img src="https://img.icons8.com/color/48/amex.png"/>
               <img src="https://img.icons8.com/color/48/discover.png"/>
               <img src="https://img.icons8.com/color/48/apple-pay.png"/>
    
               </div>
    
               </div>
        </div>
        <p v-else>السلة فارغة.</p>
    </div>
</template>

<script setup>
        import { useCartStore } from '../stores/cart';
        import { computed } from 'vue';
        import {ref} from 'vue';
        import { useRouter } from 'vue-router';
        import { useDarkMode } from '../components/useDarkMode';
        import { showToast } from '../stores/toast';
        import { useCheckoutStore } from '../stores/checkout'

        const checkout = useCheckoutStore()
        const {darkMode, toggleMode} = useDarkMode();
        const cartStore = useCartStore();
        const router = useRouter();
        const cart = computed(()=> cartStore.cart)
        const totalPrice = computed(()=> 
        cartStore.cart.reduce(
         (sum, item) => sum + item.newPrice * item.quantity,
          0 )
        );
        const showAddressForm = ref(false)
        function toggleAddress() {
        showAddressForm.value = !showAddressForm.value
        }
        function handleDelete(id) {
            if (typeof cartStore.confirmDelete === 'function') {
                cartStore.confirmDelete(id);
                return;
            }
            cartStore.removeFromCart(id);
        }
        function nextStep() {
              // تحديد الخطوة المطلوبة
        checkout.step = 1
        checkout.nextStep()
        // الانتقال لصفحة checkout
        router.push('/checkout')
        }
       function goBack(){
        router.go(-1);  // الرجوع للصفحة السابقة
       }
</script>