// resources/js/app.js
// Punto de entrada principal de la aplicacion Vue 3
// Aqui se configuran Pinia (estado global) y Vue Router (navegacion)

import './bootstrap';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Crear la app de Vue 3 con el componente raiz App.vue
const app = createApp(App)

// Usar Pinia para estado global (como Redux en React)
app.use(createPinia())

// Usar Vue Router para la navegacion entre paginas
app.use(router)

// Montar la app en el elemento #app del HTML
app.mount('#app')
