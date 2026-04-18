// api/cart.js

import api from './api'

export default {
    // جلب محتويات السلة
    getCart() {
        return api.get('/cart')
    },

    // إضافة منتج للسلة
    add(productId, quantity) {
        return api.post('/cart/add', {
            product_id: productId,
            quantity: quantity,
        })
    },

    // تحديث كمية منتج في السلة
    updateQuantity(cartItemId, quantity) {
        return api.put(`/cart/${cartItemId}`, {
            quantity: quantity,
        })
    },

    // حذف منتج من السلة
    remove(cartItemId) {
        return api.delete(`/cart/${cartItemId}`)
    },

    // تفريغ السلة
    clear() {
        return api.delete('/cart/clear')
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

