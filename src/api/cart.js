import api from "./api";

export default {

  getCart() {
    return api.get("/cart");
  },

  add(product_id, quantity = 1) {
    return api.post("/cart/add", {
      product_id,
      quantity
    });
  },

  update(itemId, quantity) {
    return api.put(`/cart/item/${itemId}`, {
      quantity
    });
  },

  remove(itemId) {
    return api.delete(`/cart/item/${itemId}`);
  },

  clear() {
    return api.delete("/cart/clear");
  }
};