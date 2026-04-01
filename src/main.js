import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ScrollReveal from 'scrollreveal'
import '@fortawesome/fontawesome-free/css/all.css'
import lazy from './directives/lazy'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.directive('lazy', lazy)
app.mount('#app');

