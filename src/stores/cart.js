// import { defineStore } from "pinia";
// import { ref } from "vue";
// import Swal from "sweetalert2";
// import { showToast } from "./toast";


// export const useCartStore = 
//     defineStore("cart", {
//         state:() => ({
//             cart: [],
//             cart: JSON.parse(localStorage.getItem('cart') || '[]'),}),
//          getters: {

//         subtotal: (state) =>
//             state.cart.reduce(
//             (sum, item) => sum + item.newPrice * item.quantity,
//             0
//             ),

//         },
//             actions: {
//         addToCart(product){
//             const existing = this.cart.value.find(i => i.id === product.id);
//             if (existing) {
//                 existing.quantity = product.quantity || 1
//             }else{
//                 this.cart.value.push({
//                     ...product,
//                     quantity: product.quantity || 1
//                 });
//             }
//             saveCart()
//            console.log('Saved', this.cart)
//         },
//         removeFromCart(id){
//             this.cart.value = this.cart.value.filter(i => i.id !== id);
//             saveCart();
//         },
//          confirmDelete(id) {
//             Swal.fire({
//                 title: 'هل أنت متأكد؟',
//                 text: 'سيتم حذف المنتج من السلة',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonText: 'نعم، احذف',
//                 cancelButtonText: 'إلغاء',
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6'
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     removeFromCart(id);
//                     showToast('تم حذف المنتج من السلة', 'error');
//                 }
//             });
//         },
//          clearCart(){
//             cart.value = [];
//             saveCart();
//         },
//         // حفظ السلة في local Storage
//          saveCart() {
//             localStorage.setItem('cart', JSON.stringify(this.cart.value))
//         },
//          increaseQuantity(id){
//              const item = this.cart.value.find(item => item.id === id)
//              if (item) {
//                  item.quantity++
//                  saveCart()
//                  console.log('++', item)
//                 }
//             },  
//          decreaseQuantity(id){
//             const item = cart.value.find(item => item.id === id)
//             if (item && item.quantity> 1) {
//                 item.quantity--
//                 saveCart()
//                 console.log('-- ', item)
//             }
//             }}
//         // return {cart, addToCart, increaseQuantity, decreaseQuantity, clearCart, removeFromCart, confirmDelete}
// });


import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { showToast } from "./toast";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),
  getters: {
    subtotal: (state) =>
      state.cart.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
        0
      ),
  },
  actions: {
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product) {
      const existing = this.cart.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        this.cart.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
      this.saveCart();
      console.log("Saved", this.cart);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((i) => i.id !== id);
      this.saveCart();
    },
    confirmDelete(id) {
      Swal.fire({
        title: "هل أنت متأكد؟",
        text: "سيتم حذف المنتج من السلة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذف",
        cancelButtonText: "إلغاء",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeFromCart(id);
          showToast("تم حذف المنتج من السلة", "error");
        }
      });
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },

    increaseQuantity(id) {
      const item = this.cart.find((item) => item.id === id);
      if (item) {
        item.quantity++;
        this.saveCart();
      }
    },

    decreaseQuantity(id) {
      const item = this.cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.saveCart();
      }
    },
  },
  persist: true,
});

