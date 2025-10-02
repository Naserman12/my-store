  <template>
    <div v-if="product" class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10 ">
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
  </template> 

  <script>
  export default {
            data() {
                return {
                    product: null
                };
            },
            created() {
                const id = parseInt(this.$route.params.id);
                const products = [
                    { id: 1, name: "قالب ثلج متعدد الاستخدامات", oldPrice: 176.99, price: 151.99, image: "https://example.com/product1.jpg", features: ["سهولة الاستخدام", "تصميم أنيق", "بدون BPA", "متوافق مع جميع الأنواع"] },
                    { id: 2, name: "حقيبة سفر عملية", oldPrice: 172.49, price: 149.99, image: "https://example.com/product2.jpg", features: ["سهولة الحمل", "متينة", "تصميم عصري"] },
                    { id: 3, name: "زجاجة ماء ذكية", oldPrice: 120.00, price: 99.99, image: "https://example.com/product3.jpg", features: ["صديقة للبيئة", "سهلة التنظيف"] }
                ];
                this.product = products.find(p => p.id === id);
            },
            methods: {
                addToCart() {
                    alert("تمت إضافة المنتج إلى السلة!");
                }
            },
        };
</script>