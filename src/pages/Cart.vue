<template>
    <div class="p-6 bg-emerald-100 max-w-4xl mx-auto">
        <h1 class=" text-2xl font-bold mb-4 text-center">
            سلة التسوق
        </h1>
        <!-- قائمة المنتجات -->
         <div v-if="cart.items.length" class="">
            <div v-for="item in cart.items" :key="item.id" class="flex justify-between border-b py-3">
                <div class="">
                    <p class=" font-semibold">{{ item.name }}</p>
                    <p class=" text-amber-500">الكمية: {{ item.quantity }}</p>
                    <p class="text-amber-500">السعر: {{ item.price * item.quantity }} ر.س</p>
                </div>
                <button @click="cart.removeFromCart" class=" text-red-700 hover:underline">حذف</button>
            </div>
         </div>
         <p v-else>السلة فارغة.</p>

         <!-- نموذج الدفع -->
        <div class="mt-6 bg-emerald-50 p-4 rounded shadow">
            <form @submit.prevent="checkout">
                <h2 class="font-bold mb-2 text-2xl"> معلومات جهة الاتصال</h2>
                <p class=" font-semibold text-sm text-gray-500"> سوف يتم التواصل معك من خلال هذا الايميل وارسال التحديثات</p>
                <label class="block mb-2">الإيميل:</label>
                <input v-model="shipping.address" type="email" class="w-full border p-2 rounded mb-3" required />
                <h2 class=" font-bold mb-3 text-xl">معلومات الشحن</h2>
                <label class="block mb-2">العنوان:</label>
                <input v-model="shipping.address" type="text" class="w-full border p-2 rounded mb-3" required />
                <label class="block mb-2">القسيمة (إختياري):</label>
                <input v-model="shipping.address" type="text" class="w-full border p-2 rounded mb-3" required />
                <h3 class=" font-bold mb-2">خيارات الشحن</h3>
                <div class="mb-3 space-y-2">
                    <label class="block"><input type="radio" v-model="shipping.method" value="free"> 3-5 أيام عمل شحن مجاني</label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="mrsool">مرسول (سريع)</label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="store"> استلام من متجر معتمد </label>
                    <label class="block"><input type="radio" v-model="shipping.method" value="ourStore"> استلام من متجرنا (موصى به)</label>
                </div>
                <p class=" font-bold">الإجمالي: {{ cart.totalPrice }} ر.س</p>
                <button type="submit" class="mt-4 bg-emerald-600 hover:bg-emerald-700 text-amber-50 px-6 py-4 rounded-lg ">إتمام الطلب</button>
            </form>
        </div> 
    </div>
</template>

<script>
import { useCartStore } from '../stores/cart';
import {ref} from 'vue'

export default{
    setup(){
        const cart = useCartStore();
        const shipping = ref({
            address: "",
            email: "",
            coupon: "",
            method: "free"
        });
        const checkout = () => {
            console.log('طلب جديد: ', {items: cart.items, shipping: shipping.value });
            alert("تم إرسال طلبك بنجاح");
            cart.clearCart
        };
        return {cart, shipping, checkout}
    }
}
</script>