<template>
  <div class="observation-list">
    <!-- Filtro por area -->
    <div class="filter-section">
      <label>Filtrar por Area:</label>
      <div class="filter-buttons">
        <button 
          @click="filterByArea(null)"
          :class="['filter-btn', { active: !observationStore.currentFilter }]"
        >
          Todas
        </button>
        <button 
          v-for="area in observationStore.availableAreas" 
          :key="area"
          @click="filterByArea(area)"
          :class="['filter-btn', `area-${area.toLowerCase()}`, { active: observationStore.currentFilter === area }]"
        >
          {{ area }}
        </button>
      </div>
    </div>

    <!-- Mensaje de carga -->
    <div v-if="observationStore.loading" class="loading-message">
      Cargando observaciones...
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="observationStore.error" class="error-message">
      {{ observationStore.error }}
    </div>

    <!-- Lista de observaciones -->
    <div v-else-if="observationStore.hasObservations" class="observations-list">
      <div 
        v-for="observation in observationStore.observations" 
        :key="observation.id"
        class="observation-item"
      >
        <div class="observation-header">
          <span :class="['area-badge', `area-${observation.area.toLowerCase()}`]">
            {{ observation.area }}
          </span>
          <span class="observation-date">
            {{ formatDate(observation.created_at) }}
          </span>
        </div>
        <div class="observation-user">
          <strong>{{ observation.usuario }}</strong>
        </div>
        <div class="observation-comment">
          {{ observation.comentario }}
        </div>
      </div>
    </div>

    <!-- Sin observaciones -->
    <div v-else class="empty-message">
      <p>No hay observaciones registradas para este credito.</p>
      <p class="hint">Agrega la primera observacion usando el formulario de abajo.</p>
    </div>
  </div>
</template>

<script setup>
// Importar funciones de Vue 3
import { defineProps } from 'vue'
// Importar el store de observaciones
import { useObservationStore } from '../stores/observationStore'

// Props: recibir el ID del credito
const props = defineProps({
  creditId: {
    type: Number,
    required: true
  }
})

// Usar el store
const observationStore = useObservationStore()

// Filtrar por area
const filterByArea = async (area) => {
  if (area === null) {
    await observationStore.fetchObservations(props.creditId)
  } else {
    await observationStore.fetchObservationsByArea(props.creditId, area)
  }
}

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.observation-list {
  margin-bottom: 2rem;
}

/* Filtro */
.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: white;
  color: #333;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #f8f9fa;
}

.filter-btn.active {
  background-color: #1e3a5f;
  color: white;
  border-color: #1e3a5f;
}

/* Colores por area */
.filter-btn.area-comercial.active {
  background-color: #28a745;
  border-color: #28a745;
}

.filter-btn.area-analisis.active {
  background-color: #007bff;
  border-color: #007bff;
}

.filter-btn.area-tesoreria.active {
  background-color: #6f42c1;
  border-color: #6f42c1;
}

.filter-btn.area-cartera.active {
  background-color: #fd7e14;
  border-color: #fd7e14;
}

/* Lista de observaciones */
.observations-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.observation-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #1e3a5f;
}

.observation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.observation-date {
  font-size: 0.8rem;
  color: #6c757d;
}

.observation-user {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.observation-comment {
  color: #495057;
  line-height: 1.5;
}

/* Area badges */
.area-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.area-comercial {
  background-color: #d4edda;
  color: #155724;
}

.area-analisis {
  background-color: #cce5ff;
  color: #004085;
}

.area-tesoreria {
  background-color: #e2d9f3;
  color: #6f42c1;
}

.area-cartera {
  background-color: #ffe5d0;
  color: #c35a00;
}

/* Observacion segun area */
.observation-item:has(.area-comercial) {
  border-left-color: #28a745;
}

.observation-item:has(.area-analisis) {
  border-left-color: #007bff;
}

.observation-item:has(.area-tesoreria) {
  border-left-color: #6f42c1;
}

.observation-item:has(.area-cartera) {
  border-left-color: #fd7e14;
}

/* Mensajes */
.loading-message,
.error-message,
.empty-message {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
}

.empty-message p {
  margin: 0;
  color: #6c757d;
}

.empty-message .hint {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
</style>
