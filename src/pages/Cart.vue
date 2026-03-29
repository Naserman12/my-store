<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class=" text-2xl font-bold mb-4 text-center">
            سلة التسوق
        </h1>
        <!-- قائمة المنتجات -->
         <div v-if="cart.length" class=" text-3xl font-bold mb-4 text-center">
            <div v-for="item in cart" :key="item.id" class="flex justify-between border-b py-3">
                <div class=" text-right">
                    <p class=" font-semibold mb-2">{{ item.name }}</p>
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
                                    <i class="fas fa-minus">-</i>
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
         </div>
         <p v-else>السلة فارغة.</p>
         <!-- نموذج الدفع -->
        <div class="mt-6 p-4 rounded shadow">
            <form @submit.prevent="checkout">
                <h2 class="font-bold mb-2 text-2xl"> معلومات جهة الاتصال</h2>
                <p class=" font-semibold text-sm text-gray-500"> سوف يتم التواصل معك من خلال هذا الايميل وارسال التحديثات</p>
                <label class="block mb-2">الإيميل:</label>
                <input v-model="shipping.email" type="email" class="w-full border p-2 rounded mb-3" required />
                <h2 class=" font-bold mb-3 text-xl">معلومات الشحن</h2>
                <label class="block mb-2">العنوان:</label>
                <input v-model="shipping.address" type="text" class="w-full border p-2 rounded mb-3" required />
                <label class="block mb-2">القسيمة (إختياري):</label>
                <input v-model="shipping.coupon" type="text" class="w-full border p-2 rounded mb-3" />
                <h3 class=" font-bold mb-2">خيارات الشحن</h3>
                <div class="mb-3 space-y-2">
                    <label class="block"><input type="radio" v-model="shipping.method" value="free"> 3-5 أيام عمل شحن مجاني</label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="mrsool">مرسول (سريع)</label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="store"> استلام من متجر معتمد </label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="ourStore"> استلام من متجرنا (موصى به)</label>
                </div>
                <p class=" font-bold">الإجمالي: {{ totalPrice }} ر.س</p>
                <button type="submit" class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-amber-50 px-4 py-2 rounded-lg ">إتمام الطلب</button>
            </form>
        </div> 
            <!-- طرق الدفع -->
                       <div class=" border-t border-emerald-100 pt-6">
                        <h3 class=" text-lg font-semibold mb-3 text-gray-700">طرق الدفع المدعومة</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class=" bg-emerald-50 p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-visa">Visa</i>
                            </div>
                            <div class=" bg-emerald-50 p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-mastercard">mastercard</i>
                            </div>
                            <div class=" bg-emerald-50 p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-amex">Amex</i>
                            </div>
                            <div class=" bg-emerald-50 p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-mada">Mada</i>
                            </div>
                            <div class=" bg-emerald-50 p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-discover">Discover</i>
                            </div>
                        </div>
                        <p class=" text-sm text-emerald-600 mt-3 font-medium ">Guaranteed safe Checkout </p>
                       </div>
    </div>
</template>

<script setup>
        import { useCartStore } from '../stores/cart';
        import { computed } from 'vue';
        import {ref} from 'vue';
        import { useRouter } from 'vue-router';
        import { useDarkMode } from '../components/useDarkMode';
        const {darkMode, toggleMode} = useDarkMode();
        const cartStore = useCartStore();
        const router = useRouter();
        const cart = computed(()=> cartStore.cart)
        const totalPrice = computed(()=> cartStore.cart.reduce((sum, item) => sum + item.newPrice * item.quantity, 0 ))
        const shipping = ref({
            address: "",
            email: "",
            coupon: "",
            method: "free"
        });
        const checkout = () => {
            console.log('طلب جديد: ', {items: cart.items, shipping: shipping.value });
            alert("تم إرسال طلبك بنجاح");
            cartStore.clearCart();
            return {cart, shipping, checkout}
        };
        function handleDelete(id) {
            if (typeof cartStore.confirmDelete === 'function') {
                cartStore.confirmDelete(id);
                return;
            }
            cartStore.removeFromCart(id);
        }
       function goBack(){
        router.go(-1);  // الرجوع للصفحة السابقة
       }
</script>