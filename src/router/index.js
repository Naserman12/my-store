import { createRouter, createWebHistory } from "vue-router";
import Categories from "../pages/categories.vue";
import Category from "../pages/Category.vue";
import ShowProduct from "../components/ShowProduct.vue";
import OrderSuccess from "../pages/OrderSuccess.vue";
import Orders from "../pages/Orders.vue";
import Cart from "../pages/Cart.vue";
import Home from "../pages/Home.vue";
import AddProduct from "../pages/AddProduct.vue";
import AdminProducts from "../pages/AdminProducts.vue";
import Search from "../pages/Search.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Profile from '../pages/Profile.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'


const routes = [
    {
    path:'/admin/orders/:id',
    component:()=>import('../pages/admin/OrderDetails.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
    },
     {
      path: '/orders',
      name: 'orders',
      component: Orders
     },
    {
      path: '/order-success',
      name: 'order-success',
      component: OrderSuccess
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../pages/Checkout.vue')
    },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/contact',
    component: Contact
  },
  { path: "/", name: "home", component: Home },
  { path: "/categories", name: "categories", component: Categories },
  { path: "/category/:id", name: "category", component: Category },
  { path: '/product/:id', name: 'product', component: ShowProduct },
  { path: '/cart', component: Cart },
  { path: '/search', name: 'search', component: Search },
  { path: '/add-product', name: 'add-product', component: AddProduct },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register }
];
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
