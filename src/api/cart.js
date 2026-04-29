// api/cart.js

import api from './api'


function headers() {
  return {
    "X-Session-ID": localStorage.getItem("session_id")
  }
}
export default {

    // جلب محتويات السلة
    getCart() {
        return api.get('/cart', { headers: headers() })
    },
    // إضافة منتج للسلة
    add(productId, quantity) {
        return api.post('/cart/add', {
            product_id: productId,
            quantity: quantity,
        },  { headers: headers() })
    },

    // تحديث كمية منتج في السلة
    updateQuantity(cartItemId, quantity) {
        return api.put(`/cart/${cartItemId}`, {
            quantity: quantity,
        }, { headers: headers() })
    },

    // حذف منتج من السلة
    remove(cartItemId) {
        return api.delete(`/cart/${cartItemId}`, { headers: headers() })
    },

    // تفريغ السلة
    clear() {
        return api.delete('/cart/clear', { headers: headers() })
    },
}



// import api from "./api";
// export default {

//   getCart() {
//     return api.get("/cart");
//   },

//   add(product_id, quantity = 1) {
//     return api.post("/cart/add", {
//       product_id,
//       quantity
//     });
//   },

//   update(itemId, quantity) {
//     return api.put(`/cart/item/${itemId}`, {
//       quantity
//     });
//   },

//   remove(itemId) {
//     return api.delete(`/cart/item/${itemId}`);
//   },

//   clear() {
//     return api.delete("/cart/clear");
//   }
// };

