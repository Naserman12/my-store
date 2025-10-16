import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useCartStore = 
    defineStore("cart", () => {
       const cart = ref(JSON.parse(localStorage.getItem('cart')) || '[]') 
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
            cart = cart.filter(i => i.id !== id);
        }
        function clearCart(){
            cart.value = []; 
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
        return {cart, addToCart, increaseQuantity, decreaseQuantity, clearCart}
});
