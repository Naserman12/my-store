import { defineStore } from "pinia";

export const useCartStore = 
    defineStore("cart", {
    state:  () => ({
        // items: [],
        cart: (() => {
            try {
               return caJSON.parse(localStorage.getItem('cart')) || []   
            } catch (error) {
                return []
            }
        })()
    }),
    actions: {
        addToCart(product){
            const existing = this.cart.find(i => i.id === product.id);
            if (existing) {
                existing.quantity = product.quantity || 1
            }else{
                this.cart.push({
                    ...product,
                    quantity: product.quantity || 1
                });
            }
            this.saveCart()
        },
        removeFromCart(id){
            this.cart = this.cart.filter(i => i.id !== id);
        },
        clearCart(){
            this.cart = [];
            this.saveCart()
        },
        // حفظ السلة في local Storage
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },
    },
});
