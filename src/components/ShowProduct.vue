  <!-- <template>
    <div v-if="product" class="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mt-2 ">
                    <img :src="product.image" alt="Product Image" class="w-full h-64 object-cover rounded-md">
                    <h2 class="text-2xl font-bold text-gray-800 mt-4">{{ product.name }}</h2>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-gray-500 line-through">{{ product.oldPrice }} ريال</span>
                        <span class="text-2xl text-red-600 font-bold">{{ product.price }} ريال</span>
                    </div>
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold text-gray-700">المميزات:</h3>
                        <ul class="list-none space-y-2 mt-2">
                            <li v-for="(feature, index) in product.features" :key="index" class="text-gray-600 flex items-center gap-2">
                                <span class="w-2 h-2 bg-blue-500 rounded-full"></span> {{ feature }}
                            </li>
                        </ul>
                    </div>
                    <button @click="addToCart" class="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                        أضف إلى السلة
                    </button>
                    <a href="https://wa.me/123456789" target="_blank" class="mt-4 inline-block text-green-500 hover:underline">
                        تواصل عبر WhatsApp
                    </a>
                </div>
  </template>  -->
<template>
    <div class="bg-amber-50 text-gray-700 font-taja">
        <div class="container mx-auto px-4 p-6">
            <!-- شريط  التخفيضات -->
             <div class="bg-red-500 text-amber-50 py-2 px-4 rounded-t-lg mb-6 text-center">
                <span class=" font-bold">
                    تخفيضات
                </span>
             </div>
             <!-- محتوى المنتج  -->
              <div class=" bg-amber-50 rounded-lg shadow-lg overflow-hidden">
                <div class=" flex flex-col md:flex-row">
                    <!-- صور المنتج -->
                     <div class="md:w-1/2 p-6 flex flex-col items-center">
                        <div class="w-full max-w-md relative">
                            <img :src="currnentImage" alt="صور المنتج" class="h-auto rounded-lg  shadow-md">
                            <!-- التنقل بين الصور -->
                             <button @click="prevImage" class="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-700 text-amber-50 p-2 rounded-full">
                                <
                             </button>
                             <button @click="nextImage" class="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-700 text-amber-50 p-2 rounded-full">
                                >
                             </button>
                        </div>
                        <!-- الصور المصغرة -->
                         <div class="flex gap-2 mt-4">
                            <img v-for="(img, index) in images" :key="index" :src="img"
                            @click="currnentImage = index" :class="['w-16 h-16 object-cover rounded cursor-pointer border',
                            currnentImage === index ?
                            'border-red-600': 
                            'border-amber-100']">
                          </div>
                     </div>
                </div>
                <!-- معلومات المنتج -->
                 <div class="md:w-1/2 p-6 border-r md:border-r-0 md:border-l border-amber-100">
                    <h1 class=" text-2xl md:text-3xl font-bold text-gray-700 mb-4">{{ product.name }}</h1>

                    <!-- price -->
                    <div class=" flex items-center mb-6">
                        <span class="text=3xl font-bold text-red-500 ml-2">{{ product.price }}</span>
                        <span class=" text-gray-500  line-through">{{ product.oldPrice }}</span>
                    </div>
                    <!-- Product Fature  ميزات المنتج-->
                     <div class="mb-6">
                         <h2 class=" text-lg font-semibold mb-3 text-gray-700">ميزات المنتج:</h2>
                         <ul class=" space-y-2">
                            <li v-for="(feature, index) in product.features" :key="index" class="flex items-end">
                                <i class="fas fa-check text-green-500 mt-1 ml-2"></i>
                                <span>{{ feature }}</span>
                            </li>
                         </ul>
                     </div>
                     <!-- التحكم بالكمية واضافة للسلة -->
                      <div class="flex flex-col justify-between mb-6 p-4 bg-amber-50 rounded-lg">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <span class=" font-semibold ml-3">الكمية:</span>
                            <div class="flex items-center border border-amber-50 rounded-md overflow-hidden bg-white">
                                <button @click="decreaseQuantity" class=" px-3 py-1 bg-amber-50 hover:bg-amber-100 transition-colors" >
                                    <i class="fas fa-minus">-</i>
                                </button>
                                <span class="px-4 py-2 w-12 text-center">{{ quantity }}</span>
                                <button @click="increaseQuantity" class=" px-3 py-1 bg-amber-50 hover:bg-amber-100 transition-colors">
                                    <i class="fas fa-blus">+</i>
                                </button>
                            </div>
                        </div>
                        <button @click="addToCart" class=" bg-blue-500 hover:bg-blue-600 text-amber-50 font-semibold py-3 px-6 rounded-lg flex items-center transition-colors shadow-md">
                            <i class="fas fa-shopping-cart ml-2"></i>
                            إضافة الى السلة
                        </button>
                      </div>
                      <!-- طرق الدفع -->
                       <div class=" border-t border-amber-100 pt-6">
                        <h3 class=" text-lg font-semibold mb-3 text-gray-700">طرق الدفع المدعومة</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class=" bg-amber-50 p-2 rounded border border-amber-100 shadow-sm">
                                <i class="fas fa-cc-visa">Visa</i>
                            </div>
                            <div class=" bg-amber-50 p-2 rounded border border-amber-100 shadow-sm">
                                <i class="fas fa-cc-mastercard">mastercard</i>
                            </div>
                            <div class=" bg-amber-50 p-2 rounded border border-amber-100 shadow-sm">
                                <i class="fas fa-cc-amex">Amex</i>
                            </div>
                            <div class=" bg-amber-50 p-2 rounded border border-amber-100 shadow-sm">
                                <i class="fas fa-cc-mada">Mada</i>
                            </div>
                            <div class=" bg-amber-50 p-2 rounded border border-amber-100 shadow-sm">
                                <i class="fas fa-cc-discover">Discover</i>
                            </div>
                        </div>
                        <p class=" text-sm text-amber-600 mt-3 font-medium ">Guaranteed safe Checkout </p>
                       </div>
                 </div>
              </div>
        </div>
        <div class="mt-4 text-lg text-gray-500">
            <span class="font-medium m-4 text-xl">التصنيف:</span>
            {{ product.category }}
        </div>
    </div>
</template>
  <script>
  import { useCartStore } from '../stores/cart';
//   const cart = useCartStore();

//   const addToCart = () => {
//                     cart.addToCart(product)
//                     alert("تمت إضافة المنتج إلى السلة!");
//                 }
export default {
            data() {
                return {
                    product: null,
                    quantity: 1,
                    currnentImage: 0,
                    images: [
                        '../images/myStoreLogo.png',
                        '../images/GARY.png',
                        '../images/myStoreLogo.png',
                        '../images/GARY.png',
                    ]
                };
            },
            created() {
                const id = parseInt(this.$route.params.id);
                const products = [
                    { id: 1,category: "العناية", name: "قالب ثلج متعدد الاستخدامات", oldPrice: 176.99, price: 151.99, image: "../images/myStoreLogo.png", features: ["سهولة الاستخدام", "تصميم أنيق", "بدون BPA", "متوافق مع جميع الأنواع"] },
                    { id: 2,category: "السفر", name: "حقيبة سفر عملية", oldPrice: 172.49, price: 149.99, image: "../images/myStoreLogo.png", features: ["سهولة الحمل", "متينة", "تصميم عصري"] },
                    { id: 3,category: "ادوات المطبخ", name: "زجاجة ماء ذكية", oldPrice: 120.00, price: 99.99, image: "../images/myStoreLogo.png", features: ["صديقة للبيئة", "سهلة التنظيف"] }
                ];
                this.product = products.find(p => p.id === id);
            },
            computed:{
                cart(){
                    return useCartStore()
                }
            },
            methods: {
                increaseQuantity(){
                    this.quantity++;
                },
                decreaseQuantity(){
                    if (this.quantity > 1) {
                        this.quantity--
                    }
                },
                nextImage(){
                    if (this.currnentImage < this.images.length - 1) {
                        this.currnentImage++;
                    }else{
                        this.currnentImage = 0;
                    }
                },
                prevImage(){
                    if (this.currnentImage > 0) {
                        this.currnentImage--
                    }else{
                        this.currnentImage = this.images.length - 1;
                    }
                },            
                addToCart(){
                    this.cart.addToCart(this.product);
                      alert("تمت إضافة المنتج إلى السلة!");
                    console.log('done')
                }
            },
        };
</script>