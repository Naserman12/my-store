import { createRouter, createWebHistory } from "vue-router";
import Categories from "../pages/categories.vue";
import Category from "../pages/Category.vue";
import ShowProduct from "../components/ShowProduct.vue";
import Cart from "../pages/Cart.vue";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/categories", name: "categories", component: Categories },
  { path: "/category/:id", name: "category", component: Category },
  { path: '/product/:id', name: 'product', component: ShowProduct },
  { path: '/cart', component: Cart },
];
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
