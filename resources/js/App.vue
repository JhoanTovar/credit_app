<template>
  <div id="app-container">
    <!-- Header de la aplicacion -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <router-link to="/">Sistema de Creditos</router-link>
        </h1>
        <nav class="main-nav">
         
          
        </nav>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>Sistema de Gestion de Creditos - Prueba Tecnica</p>
    </footer>
  </div>
</template>

<script setup>
// App.vue es el componente raiz de la aplicacion
// Contiene el layout principal: header, contenido y footer
</script>

<style>
/* Reset basico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

#app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  background: linear-gradient(135deg, #022C2C 0%, #0BA57B 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.app-title a {
  color: white;
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Footer */
.app-footer {
  background: linear-gradient(135deg, #022C2C 0%, #0BA57B 120%);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
