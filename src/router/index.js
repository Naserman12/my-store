import { createRouter, createWebHistory } from "vue-router";
import Categories from "../pages/categories.vue";
import Category from "../pages/Category.vue";
import ShowProduct from "../components/ShowProduct.vue";
import OrderSuccess from "../pages/OrderSuccess.vue";
import Orders from "../pages/Orders.vue";
import Cart from "../pages/Cart.vue";
import Home from "../pages/Home.vue";
import AddProduct from "../pages/admin/AddProduct.vue";
import AdminProducts from "../pages/admin/AdminProducts.vue";
import Search from "../pages/Search.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import Wishlist from "../pages/Wishlist.vue";
import Profile from "../pages/auth/Profile.vue";
import AdminOrders from "../pages/admin/AdminOrders.vue";

const routes = [
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path:'/wishlist', component: Wishlist},
  { path:'/admin/orders/:id', component:()=>import('../pages/admin/OrderDetails.vue')},
  { path: '/admin', name: 'admin', component: AdminDashboard, },
  { path: '/orders', name: 'orders',component: Orders },
  { path: '/admin/orders', component: AdminOrders },
  { path: '/order-success',  name: 'order-success', component: OrderSuccess},
  { path: '/checkout', name: 'checkout',  component: () => import('../pages/Checkout.vue')},
  { path: '/profile', component: Profile},
  { path: '/about', component: About},
  { path: '/contact', component: Contact},
  { path: "/", name: "home", component: Home },
  { path: "/categories", name: "categories", component: Categories },
  { path: "/category/:id", name: "category", component: Category },
  { path: '/product/:id', name: 'product', component: ShowProduct },
  { path: '/cart', component: Cart },
  { path: '/search', name: 'search', component: Search },
  { path: '/add-product', name: 'add-product', component: AddProduct },
  { path: '/admin/products', name: 'AdminProducts',component: AdminProducts,},
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});
export default router;


