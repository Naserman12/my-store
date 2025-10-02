import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Category from "../pages/Category.vue";
import ShowProduct from "../components/ShowProduct.vue";
import Cart from "../pages/Cart.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/category/:id", name: "category", component: Category },
  { path: '/product/:id', component: ShowProduct },
  { path: '/cart', component: Cart },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
