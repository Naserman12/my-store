import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Category from "../pages/Category.vue";
import ShowProduct from "../components/ShowProduct.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/category/:id", name: "category", component: Category },
  { path: '/product/:id', component: ShowProduct },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
