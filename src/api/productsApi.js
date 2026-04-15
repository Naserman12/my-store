import api from "./api";

export default {

  getProducts() {
    return api.get("/products");
  },
   getProduct(id) {
    return api.get(`/products/${id}`);
  },
  getCategories() {
    return api.get("/categories");
  },
  getCategoriesWithProducts() {
    return api.get("/categories-with-products");
  },
  getCategoryProducts(categoryId) {
      return api.get(`/categories/${categoryId}/products`);
  },
  getCategory(id){
    return api.get(`/category/${id}`)
  },
  editProduct(productId){
    return api.post(`/admin/products/${productId}?_method=PUT`)
  },
  editHiddenStatus(productId, isHidden){
    return api.post(`/admin/products/${productId}?_method=PATCH`, { is_hidden: isHidden })
  },
  deleteProduct(productId){
    return api.delete(`/products/${productId}`)
  },
  getAllProducts() {
    return api.get("/admin/products");
  },

};