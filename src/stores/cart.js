import { defineStore } from "pinia";

export const useCartStore = 
    defineStore("cart", {
    state:  () => ({
        items: []
    }),
    actions: {
        addToCart(product){
            const existing = this.items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity += product.quantity || 1
            }else{
                this.items.push({
                    ...product,
                    quantity: product.quantity || 1
                });
            }
        },
        removeFromCart(id){
            this.items = this.items.filter(i => i.id !== id);
        },
        clearCart(){
            this.items = [];
        },
    },
    getters: {
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0 )
    }
   });