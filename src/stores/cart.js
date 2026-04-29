import { defineStore } from "pinia";
// import Swal from "sweetalert2";
import { ref } from "vue";
import { showToast } from "./toast";
import api from "../api/cart";


export const useCartStore = defineStore("cart", () => {

  const cart = ref([]);
  const items = ref([]);
  const count = ref(0);
  const total = ref(0);


  const setCart =  async (cartData) =>{
    if (!cartData || !cartData.items) {
      items.value = [];
      total.value = 0;
      count.value = 0;
      return ;
    }
    items.value = cartData.items || []
    count.value = cartData.items ? cartData.items.reduce((sum, item) => sum + item.quantity, 0):0
    total.value = cartData.items.reduce((sum, item) => {
    const price = item.product?.sale_price || item.product?.price  || 0
    return sum + (price * item.quantity)
  }, 0)
  };
  
  const loadCart = async () => {
    try {
      const res = await api.getCart({
        headers: {
          "X-Session-ID": localStorage.getItem("session_id")
        }
      });
        console.log("Cart data loaded:", res.data);
          // 🔥 حفظ session
        // if (res.data.session_id) {
        //   localStorage.setItem('session_id', res.data.session_id);
        // }
    setCart(res.data);
    } catch (err) {
      console.log("Load Cart Error:", err);
    }
  };
    const  removeFromCart = async (id) => {
      const res = await api.remove()
      cart.value = res.data
    };
   const confirmDelete = async (id) => {
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
        removeFromCart(id);
        showToast("تم حذف المنتج من السلة", "error");
        }
      });
    };
  return { items, count, total, loadCart, setCart };
});

