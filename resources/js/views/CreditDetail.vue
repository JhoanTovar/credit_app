<template>
  <div class="credit-detail-page">
    <div class="page-header">
      <h2>Detalle del Credito</h2>
      <router-link to="/" class="btn btn-secondary">
        Volver al Listado
      </router-link>
    </div>

    <!-- Mensaje de carga -->
    <div v-if="creditStore.loading && !creditStore.currentCredit" class="loading-message">
      Cargando informacion del credito...
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="creditStore.error" class="error-message">
      {{ creditStore.error }}
    </div>

    <!-- Contenido del detalle -->
    <div v-else-if="creditStore.currentCredit" class="detail-content">
      <!-- Informacion del credito -->
      <div class="credit-info-card">
        <div class="card-header">
          <h3>Informacion del Credito</h3>
          <span :class="['status-badge', `status-${creditStore.currentCredit.estado.toLowerCase()}`]">
            {{ creditStore.currentCredit.estado }}
          </span>
        </div>
        
        <div class="info-grid">
          <div class="info-item">
            <label>Numero de Credito</label>
            <span>{{ creditStore.currentCredit.numero_credito }}</span>
          </div>
          <div class="info-item">
            <label>Nombre del Cliente</label>
            <span>{{ creditStore.currentCredit.nombre_cliente }}</span>
          </div>
          <div class="info-item">
            <label>Cedula</label>
            <span>{{ creditStore.currentCredit.cedula }}</span>
          </div>
          <div class="info-item">
            <label>Valor del Credito</label>
            <span class="value-highlight">{{ formatCurrency(creditStore.currentCredit.valor_credito) }}</span>
          </div>
          <div class="info-item">
            <label>Fecha de Creacion</label>
            <span>{{ formatDate(creditStore.currentCredit.created_at) }}</span>
          </div>
          <div class="info-item">
            <label>Ultima Actualizacion</label>
            <span>{{ formatDate(creditStore.currentCredit.updated_at) }}</span>
          </div>
        </div>

        <!-- Cambiar estado -->
        <div class="status-change-section">
          <h4>Cambiar Estado</h4>
          <div class="status-change-form">
            <select v-model="newStatus" class="form-control">
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="EN_REVISION">EN_REVISION</option>
              <option value="APROBADO">APROBADO</option>
              <option value="NEGADO">NEGADO</option>
            </select>
            <button 
              @click="updateStatus" 
              class="btn btn-primary"
              :disabled="creditStore.loading || newStatus === creditStore.currentCredit.estado"
            >
              Actualizar Estado
            </button>
          </div>
        </div>
      </div>

      <!-- Seccion de observaciones -->
      <div class="observations-section">
        <div class="section-header">
          <h3>Observaciones / Bitacora</h3>
          <span class="observation-count">{{ observationStore.totalObservations }} observacion(es)</span>
        </div>

        <!-- Componente de lista de observaciones -->
        <ObservationList :credit-id="creditId" />

        <!-- Componente de formulario para agregar observacion -->
        <ObservationForm :credit-id="creditId" />
      </div>
    </div>

    <!-- Credito no encontrado -->
    <div v-else class="empty-message">
      <p>No se encontro el credito solicitado.</p>
      <router-link to="/" class="btn btn-primary">
        Volver al Listado
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Importar funciones de Vue 3
import { ref, onMounted, onUnmounted, computed } from 'vue'
// Importar funciones de Vue Router
import { useRoute } from 'vue-router'
// Importar los stores
import { useCreditStore } from '../stores/creditStore'
import { useObservationStore } from '../stores/observationStore'
// Importar componentes
import ObservationList from '../components/ObservationList.vue'
import ObservationForm from '../components/ObservationForm.vue'

// Usar el route y los stores
const route = useRoute()
const creditStore = useCreditStore()
const observationStore = useObservationStore()

// Obtener el ID del credito de la URL
const creditId = computed(() => Number(route.params.id))

// Estado para cambiar estado del credito
const newStatus = ref('')

// Cargar datos al montar el componente
onMounted(async () => {
  await creditStore.fetchCredit(creditId.value)
  if (creditStore.currentCredit) {
    newStatus.value = creditStore.currentCredit.estado
    await observationStore.fetchObservations(creditId.value)
  }
})

// Limpiar datos al desmontar el componente
onUnmounted(() => {
  creditStore.clearCurrentCredit()
  observationStore.clearObservations()
})

// Actualizar el estado del credito
const updateStatus = async () => {
  if (!newStatus.value || newStatus.value === creditStore.currentCredit.estado) return
  
  try {
    await creditStore.changeStatus(creditId.value, newStatus.value)
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

// Formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value)
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
.credit-detail-page {
  padding: 1rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  color: #1e3a5f;
  margin: 0;
}

/* Card de informacion del credito */
.credit-info-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.card-header h3 {
  color: #1e3a5f;
  margin: 0;
}

/* Grid de informacion */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item label {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.value-highlight {
  color: #1e3a5f !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
}

/* Seccion de cambio de estado */
.status-change-section {
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.status-change-section h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.status-change-form {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.status-change-form .form-control {
  max-width: 200px;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-pendiente {
  background-color: #fff3cd;
  color: #856404;
}

.status-en_revision {
  background-color: #cce5ff;
  color: #004085;
}

.status-aprobado {
  background-color: #d4edda;
  color: #155724;
}

.status-negado {
  background-color: #f8d7da;
  color: #721c24;
}

/* Seccion de observaciones */
.observations-section {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.section-header h3 {
  color: #1e3a5f;
  margin: 0;
}

.observation-count {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Mensajes */
.loading-message,
.error-message,
.empty-message {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.error-message {
  color: #dc3545;
}

.empty-message p {
  margin-bottom: 1rem;
  color: #6c757d;
}

/* Form control */
.form-control {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-control:focus {
  outline: none;
  border-color: #1e3a5f;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

/* Botones */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #097a5c;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0BA57B;
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #097a5c;
  color: white;
}

.btn-secondary:hover {
  background-color: #0BA57B;
}
</style>
