<template>
  <div class="p-6 max-w-5xl mx-auto">

    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
      🛒 ملخص الطلب
    </h1>

    <div class="grid md:grid-cols-2 gap-6">

      <!-- قائمة المنتجات -->
      <div class="bg-white shadow-lg rounded-xl p-5">
        <h2 class="text-xl font-bold mb-4 text-gray-700">المنتجات</h2>

        <template v-if="loading">
          <skeleton-product v-for="n in 4" :key="n" />
        </template>

        <div v-if="cart.length" class="space-y-4">

          <div
            v-for="item in cart"
            :key="item.id"
            class="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
          >
            <div class="flex justify-between items-start">

              <div class="flex-1">
                <p class="font-bold text-lg text-gray-800">{{ item.product.name }}</p>

                <p class="text-gray-600 mt-1">الكمية: {{ item.quantity }}</p>
                <p class="text-gray-600">السعر الأساسي: {{ item.product.price }} ر.س</p>
                <p v-if="item.product.discount" class="text-gray-600">الخصم: {{ item.product.discount }}%</p>
                <p v-if="item.product.sale_price" class="text-emerald-700 font-bold">السعر بعد الخصم: {{ item.product.sale_price }} ر.س</p>

                <!-- التحكم بالكمية -->
                <div class="flex items-center mt-4">
                  <span class="font-semibold ml-3">الكمية:</span>

                  <div class="flex items-center border rounded-md overflow-hidden bg-white shadow-sm">
                    <button
                      @click="cartStore.decreaseQuantity(item.id)"
                      class="px-3 py-1 bg-red-100 hover:bg-red-400 hover:text-white transition"
                    >
                      <i class="fas fa-minus"></i>
                    </button>

                    <span class="px-4 py-2 w-12 text-center">{{ item.quantity }}</span>

                    <button
                      @click="cartStore.increaseQuantity(item.id)"
                      class="px-3 py-1 bg-emerald-100 hover:bg-emerald-400 hover:text-white transition"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>

                  <button
                    @click="handleDelete(item.id)"
                    class="text-gray-600 mr-1 hover:bg-red-400 hover:text-white px-1 py-1 rounded transition"
                  >
                    <i class="fas fa-trash m-1"></i> 
                  </button>
                </div>
              </div>

            </div>
        </div>
        <p class="text-xl font-bold text-gray-800 mt-4">
          الإجمالي: {{ totalPrice }} ر.س
        </p>


          <button
            @click="goBack"
            class="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            اكمل التسوق
          </button>

        </div>

        <p v-if="cart.length < 1" class="text-center text-gray-500">
          السلة فارغة.
        </p>
      </div>

      <!-- نموذج الدفع -->
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">معلومات الدفع</h2>

        <form @submit.prevent="nextStep" class="space-y-4">

          <div>
            <label class="font-semibold">البريد الإلكتروني</label>
            <input
              v-model="checkout.shipping.email"
              placeholder="example@email.com"
              class="w-full border p-2 rounded mt-1"
            />
          </div>

          <!-- العنوان -->
          <div>
            <label class="font-semibold">العنوان</label>

            <div
              v-if="checkout.shipping.address && !showAddressForm"
              class="bg-gray-100 p-3 rounded flex justify-between items-center mt-1"
            >
              <span>{{ checkout.shipping.address }}</span>
              <button @click="toggleAddress" class="text-emerald-600 font-semibold">
                تعديل
              </button>
            </div>

            <button
              v-if="!showAddressForm && !checkout.shipping.address"
              @click="toggleAddress"
              type="button"
              class="text-emerald-600 font-semibold mt-1"
            >
              ➕ إضافة عنوان
            </button>

            <div v-if="showAddressForm" class="space-y-3 mt-2">
              <input
                v-model="checkout.shipping.address"
                placeholder="العنوان"
                class="w-full border p-2 rounded"
              />

              <button
                type="button"
                @click="toggleAddress"
                class="bg-emerald-600 text-white px-3 py-2 rounded"
              >
                حفظ العنوان
              </button>
            </div>
          </div>

          <!-- القسيمة -->
          <div>
            <label class="font-semibold">القسيمة (اختياري)</label>
            <input
              v-model="checkout.shipping.coupon"
              class="w-full border p-2 rounded mt-1"
            />
          </div>

          <!-- الشحن -->
          <div>
            <h3 class="font-bold text-lg mb-2">🚚 خيارات الشحن</h3>

            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input type="radio" value="free" v-model="checkout.shipping.shippingMethod">
                شحن مجاني (3-5 أيام)
              </label>

              <label class="flex items-center gap-2">
                <input type="radio" value="mrsool" v-model="checkout.shipping.shippingMethod">
                مرسول (سريع)
              </label>

              <label class="flex items-center gap-2">
                <input type="radio" value="store" v-model="checkout.shipping.shippingMethod">
                استلام من متجر معتمد
              </label>

              <label class="flex items-center gap-2">
                <input type="radio" value="ourStore" v-model="checkout.shipping.shippingMethod">
                استلام من متجرنا (موصى به)
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            إتمام الطلب
          </button>

        </form>

        <!-- طرق الدفع -->
        <div class="mt-6 border-t pt-4">
          <h3 class="font-semibold mb-3">💳 طرق الدفع المدعومة</h3>

          <div class="flex gap-4 flex-wrap">
            <img src="https://img.icons8.com/color/48/visa.png" />
            <img src="https://img.icons8.com/color/48/mastercard.png" />
            <img src="https://img.icons8.com/color/48/amex.png" />
            <img src="https://img.icons8.com/color/48/discover.png" />
            <img src="https://img.icons8.com/color/48/apple-pay.png" />
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<script setup>
        import { useCartStore } from '../stores/cart';
        import {ref, computed, onMounted } from 'vue';
        import { useRouter } from 'vue-router';
        import { useDarkMode } from '../components/useDarkMode';
        import { showToast } from '../stores/toast';
        import { useCheckoutStore } from '../stores/checkout'
        import SkeletonProduct from '../components/SkeletonProduct.vue';
        
        import cartApi from "../api/cart";

        
        const checkout = useCheckoutStore()
        const {darkMode, toggleMode} = useDarkMode();
        const cartStore = useCartStore();
        const router = useRouter();
        // const cart = computed(()=> cartStore.cart)
        const cart = ref(1);
        const loading = ref(true)
        const totalPrice = ref(0);
        const loadCart = async () => {
        loading.value = true;
        const res = await cartApi.getCart();
        console.log("Cart data loaded:", res.data);
        cart.value = res.data.items;  // Assuming the API returns an object with an 'items' array
        totalPrice.value = res.data.total; // Assuming the API returns the total price
        loading.value = false;
        };
        onMounted(loadCart);

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