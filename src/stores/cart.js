import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";

export const useCartStore = 
    defineStore("cart", () => {
       const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]')) 
      function  addToCart(product){
            const existing = cart.value.find(i => i.id === product.id);
            if (existing) {
                existing.quantity = product.quantity || 1
            }else{
                cart.value.push({
                    ...product,
                    quantity: product.quantity || 1
                });
            }
            saveCart()
           console.log('Saved', cart)
        }
       function removeFromCart(id){
            cart.value = cart.value.filter(i => i.id !== id);
            saveCart();
        }
        function confirmDelete(id) {
            Swal.fire({
                title: 'هل أنت متأكد؟',
                text: 'سيتم حذف المنتج من السلة',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'إلغاء',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeFromCart(id);
                    Swal.fire('تم الحذف', 'تم حذف المنتج من السلة', 'success');
                }
            });
        }
        function clearCart(){
            cart.value = [];
            saveCart();
        }
        // حفظ السلة في local Storage
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart.value))
        }
        function increaseQuantity(id){
             const item = cart.value.find(item => item.id === id)
             if (item) {
                 item.quantity++
                 saveCart()
                 console.log('++', item)
                }
            }
        function decreaseQuantity(id){
            const item = cart.value.find(item => item.id === id)
            if (item && item.quantity> 1) {
                item.quantity--
                saveCart()
                console.log('-- ', item)
            }
                }
        return {cart, addToCart, increaseQuantity, decreaseQuantity, clearCart, removeFromCart, confirmDelete}
});
