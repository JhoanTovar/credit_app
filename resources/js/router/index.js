// resources/js/router/index.js
// Configuracion de Vue Router 4
// Define las rutas de navegacion de la aplicacion

import { createRouter, createWebHistory } from 'vue-router'

// Importar las vistas (componentes de pagina)
import CreditList from '../views/CreditList.vue'
import CreditCreate from '../views/CreditCreate.vue'
import CreditDetail from '../views/CreditDetail.vue'

// Definir las rutas
const routes = [
  {
    path: '/',
    name: 'CreditList',
    component: CreditList
  },
  {
    path: '/credits/create',
    name: 'CreditCreate',
    component: CreditCreate
  },
  {
    path: '/credits/:id',
    name: 'CreditDetail',
    component: CreditDetail
  }
]

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
