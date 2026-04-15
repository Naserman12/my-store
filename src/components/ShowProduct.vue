<template>
    <div :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'"  class=" text-gray-700 font-taja">
        <div class="container mx-auto px-4 p-6">
            <!-- شريط  التخفيضات -->
             <div class="bg-red-500 text-amber-50 py-2 px-4 rounded-t-lg mb-1 text-center">
                <span class=" font-bold">
                    تخفيضات
                </span>
             </div>
             <!-- محتوى المنتج  -->
              <div :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'"  class=" rounded-lg shadow-lg overflow-hidden">
                <div class=" flex flex-col md:flex-row">
                    <!-- صور المنتج -->
                     <div class="md:w-1/2 p-6 flex flex-col items-center">
                        <div class="w-full max-w-md relative">
                            <img :src="'https://i.pravatar.cc/100'" alt="صور المنتج" class="h-auto rounded-lg  shadow-md">
                            <!-- التنقل بين الصور -->
                             <button @click="prevImage" class="absolute top-1/2 left-0 -translate-y-1/2 bg-emerald-700 text-amber-50 p-2 rounded-full">
                                &lt;
                             </button>
                             <button @click="nextImage" class="absolute top-1/2 right-0 -translate-y-1/2 bg-emerald-700 text-amber-50 p-2 rounded-full">
                                &gt;
                             </button>
                        </div>
                        <!-- الصور المصغرة -->
                         <div class="flex gap-2 mt-4">
                            <img v-for="(img, index) in images" :key="index" :src="'https://i.pravatar.cc/100'"
                            @click="currnentImage = index" :class="['w-16 h-16 object-cover rounded cursor-pointer border',
                            currnentImage === index ?
                            'border-emerald-600': 
                            'border-emerald-100']">
                          </div>
                     </div>
                </div>
                <!-- معلومات المنتج -->
                 <div :class="darkMode ? ' text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'"  class="md:w-1/2 p-6 border-r md:border-r-0 md:border-l border-amber-100">
                    <h1  class=" text-2xl md:text-3xl font-bold mb-4">{{ product.name }}</h1>

                    <!-- price -->
                    <div class=" flex items-center mb-6">
                        <span class=" text=3xl font-bold ml-2">السعر:</span>
                        <span class="text=3xl font-bold text-red-500 ml-2 line-through">{{ product.sale_price }}</span>
                        <span class=" text=3xl font-bold text-gray-800 ml-2">{{ product.price }}</span>
                    </div>
                    <!-- Product Fature  ميزات المنتج-->
                    <div class="mb-6">
                        <h2 class=" text-lg font-semibold mb-3">ميزات المنتج:</h2>
                        <ul class=" space-y-2">
                            <li v-for="(feature, index) in product.features" :key="index" class="flex items-end">
                                <i class="fas fa-check text-emerald-600 mt-1 ml-2"></i>
                                <span>{{ feature }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class=" text-lg text-gray-500 mb-4">
                        <span class="font-medium m-4 text-xl">التصنيف:</span>
                        {{ product.category }}
                    </div>
                    <!-- التحكم بالكمية واضافة للسلة -->
                    <div  :class="darkMode ? 'bg-emerald-500 text-amber-50' : 'bg-emerald-50 hover:text-emarale-500'" class="flex flex-col justify-between mb-6 p-4 border rounded-lg">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <span class=" font-semibold ml-3">الكمية:</span>
                            <div class="flex items-center border border-amber-50 rounded-md overflow-hidden bg-white">
                                <button @click="decreaseQuantity" class=" px-3 py-1 bg-emerald-300 hover:text-amber-50 hover:bg-red-600 transition-colors" >
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="px-4 py-2 w-12 text-center bg-amber-50 text-black">{{ quantity }}</span>
                                <button @click="increaseQuantity" class=" px-3 py-1 bg-emerald-300 hover:bg-emerald-700 hover:text-amber-50 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button @click="resteQuantity" class=" text-red-700 hover:underline"><i class="fa-solid fa-trash"></i></button>
                        </div>
                        <button @click="addToCart" :class="darkMode ? 'bg-emerald-50 hover:bg-emerald-200 text-gray-700' : 'bg-emerald-500 hover:bg-emerald-600 hover:text-emarale-50'" class=" mt-2 font-semibold py-3 px-6 rounded-lg flex items-center transition-colors shadow-md">
                            <i class="fas fa-shopping-cart ml-2"></i>
                            إضافة الى السلة
                        </button>
                    </div>
                                   <!-- طرق الدفع -->
                <div class="mt-6 border-t pt-4">
    
               <h3 class="font-semibold mb-3">
               💳 طرق الدفع المدعومة
               </h3>
    
               <div class="flex gap-4 flex-wrap">
               <img title="VISA" src="https://img.icons8.com/color/48/visa.png"/>
               <img title="MASTERCARD" src="https://img.icons8.com/color/48/mastercard.png"/>
               <img title="AMEX" src="https://img.icons8.com/color/48/amex.png"/>
               <img title="DISCOVER" src="https://img.icons8.com/color/48/discover.png"/>
               <img title="GOOGLE WALLET" src="https://img.icons8.com/color/48/google-wallet.png"/>
               <img title="aplle PAY" src="https://img.icons8.com/color/48/apple-pay.png"/>
               </div>
               </div>
                    <!-- طرق الدفع -->
                    <!-- <div class=" border-t pt-6">
                        <h3 class=" text-lg font-semibold mb-3 ">طرق الدفع المدعومة</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="  p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-visa">Visa</i>
                            </div>
                            <div class="  p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-mastercard">mastercard</i>
                            </div>
                            <div class="  p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-amex">Amex</i>
                            </div>
                            <div class="  p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-mada">Mada</i>
                            </div>
                            <div class="  p-2 rounded border border-emerald-100 shadow-sm">
                                <i class="fas fa-cc-discover">Discover</i>
                            </div>
                        </div>
                        <p :class="darkMode ? ' text-gray-200' : ' text-emerald-700 hover:text-emarale-500'"  class=" text-sm  mt-3 font-medium ">Guaranteed safe Checkout </p>
                       </div> -->
                 </div>
              </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDarkMode } from './useDarkMode';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import productsApi from '../api/productsApi';
import { showToast } from '../stores/toast';

const {darkMode, toggleMode} = useDarkMode();
const cart = useCartStore();
const router = useRouter();
const route = useRoute();
const product = ref([]);
const loading = ref(true);
const quantity = ref(1)
const currnentImage = ref(0)
const images = ref([
                        '../images/myStoreLogo.png',
                        '../images/GARY.png',
                        '../images/myStoreLogo.png',
                        '../images/GARY.png',
                    ])
const categoryName = ref('');
onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await productsApi.getProduct(id);
    console.log('res', res)
    product.value = res.data.data
  } catch (e) {
    console.error("API ERROR:", e);
  } finally {
        loading.value = false;
  }
});
function resteQuantity(){
    quantity.value = 1
}
function  increaseQuantity(){
             quantity.value++;
          }
function  decreaseQuantity(){
              if (quantity.value > 1) {
                  quantity.value--
              }
          }
function prevImage(){
          if (currnentImage.value > 0) {
                 currnentImage.value--
            }else{
                 currnentImage.value = images.value.length - 1;
             }
         }
function nextImage(){
             if (currnentImage.value < images.value.length - 1) {
                 currnentImage.value++;
             }else{
                 currnentImage.value = 0;
             }
         }
function addToCart(){
           product.value.quantity = quantity.value;
           cart.addToCart(product.value);
           showToast('تم إضافة الممنتج الى السلة');
           router.push('/cart');
        }
// export default {
//             data() {
//                 return {
//                     route: useRoute(),
//                     loading: true,
//                     product: null,
//                     quantity: 1,
//                     currnentImage: 0,
//                     images: [
//                         '../images/myStoreLogo.png',
//                         '../images/GARY.png',
//                         '../images/myStoreLogo.png',
//                         '../images/GARY.png',
//                     ]
//                 };
//             },
//             created() { async () => {
//                 try {
//                     const id = route.params.id;
//                     const res = await productsApi.getProduct(id);
//                     console.log('res', res)
//                     this.product = res.data.data.products
//                 } catch (e) {
//                     console.error("API ERROR:", e);
//                 } finally {
//                         this.loading = false;
//                 }
//                 }
//             },
//             computed:{
//                 cart(){
//                     return useCartStore()
//                 }
//             },
//             methods: {
//                 increaseQuantity(){
//                     this.quantity++;
//                 },
//                 decreaseQuantity(){
//                     if (this.quantity > 1) {
//                         this.quantity--
//                     }
//                 },
//                 nextImage(){
//                     if (this.currnentImage < this.images.length - 1) {
//                         this.currnentImage++;
//                     }else{
//                         this.currnentImage = 0;
//                     }
//                 },
//                 prevImage(){
//                     if (this.currnentImage > 0) {
//                         this.currnentImage--
//                     }else{
//                         this.currnentImage = this.images.length - 1;
//                     }
//                 },            
//                 addToCart(){

//                     this.product.quantity = this.quantity;
//                     this.cart.addToCart(this.product);
//                     showToast('تم إضافة الممنتج الى السلة');
//                     this.$router.push('/cart');
//                 }
//             },
//         };
</script>