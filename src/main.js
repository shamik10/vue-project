import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AssortimentsList from './modules/AssortimentsList.vue'
import FavoritesCard from './pages/FavoritesCard.vue'
import store from './store'
import Cart from './pages/Cart.vue'


const app = createApp(App)

const routes = [
  { path: `/`, name: 'AssortimentsList', component: AssortimentsList },
  { path: '/favorites', name: 'favorites', component: FavoritesCard },
  { path: '/cart', name: 'cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router);
app.use(store);

app.mount('#app');