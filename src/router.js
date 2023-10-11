import { createRouter, createWebHistory } from 'vue-router';    

import Login from './components/Login.vue'
import Home from './view/Home.vue'



const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
]

const router = createRouter({
    history: createWebHistory(), // Utilize `createWebHashHistory()` para usar hash mode
    routes
});

export default router;