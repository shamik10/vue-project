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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW1fxBC5AVmHWvdXR2Wg_52mxEmLREdJ8",
  authDomain: "online-store-e7dda.firebaseapp.com",
  projectId: "online-store-e7dda",
  storageBucket: "online-store-e7dda.appspot.com",
  messagingSenderId: "1074742219637",
  appId: "1:1074742219637:web:0ccaacf937f40f6a16f93c",
  measurementId: "G-V2CZ41K4Y6"
};

// Initialize Firebase
initializeApp(firebaseConfig);