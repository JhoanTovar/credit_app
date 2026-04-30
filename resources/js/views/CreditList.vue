<template>
  <div class="credit-list-page">
    <div class="page-header">
      <h2>Listado de Creditos</h2>
      <router-link to="/credits/create" class="btn btn-primary">
        + Nuevo Credito
      </router-link>
    </div>

    <!-- Mensaje de carga -->
    <div v-if="creditStore.loading" class="loading-message">
      Cargando creditos...
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="creditStore.error" class="error-message">
      {{ creditStore.error }}
    </div>

    <!-- Lista de creditos -->
    <div v-else-if="creditStore.credits.length > 0" class="credits-table-container">
      <table class="credits-table">
        <thead>
          <tr>
            <th>No. Credito</th>
            <th>Cliente</th>
            <th>Cedula</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Fecha Creacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="credit in creditStore.credits" :key="credit.id">
            <td>{{ credit.numero_credito }}</td>
            <td>{{ credit.nombre_cliente }}</td>
            <td>{{ credit.cedula }}</td>
            <td>{{ formatCurrency(credit.valor_credito) }}</td>
            <td>
              <span :class="['status-badge', `status-${credit.estado.toLowerCase()}`]">
                {{ credit.estado }}
              </span>
            </td>
            <td>{{ formatDate(credit.created_at) }}</td>
            <td class="actions-cell">
              <router-link :to="`/credits/${credit.id}`" class="btn btn-sm btn-info">
                Ver Detalle
              </router-link>
              <button 
                @click="openStatusModal(credit)" 
                class="btn btn-sm btn-warning"
              >
                Cambiar Estado
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensaje sin creditos -->
    <div v-else class="empty-message">
      <p>No hay creditos registrados.</p>
      <router-link to="/credits/create" class="btn btn-primary">
        Crear el primer credito
      </router-link>
    </div>

    <!-- Modal para cambiar estado -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>Cambiar Estado del Credito</h3>
        <p>
          <strong>Cliente:</strong> {{ selectedCredit?.nombre_cliente }}<br>
          <strong>No. Credito:</strong> {{ selectedCredit?.numero_credito }}
        </p>
        <div class="form-group">
          <label for="newStatus">Nuevo Estado:</label>
          <select v-model="newStatus" id="newStatus" class="form-control">
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN_REVISION">EN_REVISION</option>
            <option value="APROBADO">APROBADO</option>
            <option value="NEGADO">NEGADO</option>
          </select>
        </div>
        <div class="modal-actions">
          <button @click="closeModal" class="btn btn-secondary">Cancelar</button>
          <button @click="updateStatus" class="btn btn-primary" :disabled="creditStore.loading">
            {{ creditStore.loading ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar funciones de Vue 3
import { ref, onMounted } from 'vue'
// Importar el store de creditos
import { useCreditStore } from '../stores/creditStore'

// Usar el store
const creditStore = useCreditStore()

// Variables reactivas para el modal
const showModal = ref(false)
const selectedCredit = ref(null)
const newStatus = ref('')

// Cargar creditos al montar el componente
onMounted(() => {
  creditStore.fetchCredits()
})

// Abrir modal para cambiar estado
const openStatusModal = (credit) => {
  selectedCredit.value = credit
  newStatus.value = credit.estado
  showModal.value = true
}

// Cerrar modal
const closeModal = () => {
  showModal.value = false
  selectedCredit.value = null
  newStatus.value = ''
}

// Actualizar el estado
const updateStatus = async () => {
  if (!selectedCredit.value || !newStatus.value) return
  
  try {
    await creditStore.changeStatus(selectedCredit.value.id, newStatus.value)
    closeModal()
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
.credit-list-page {
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

/* Tabla */
.credits-table-container {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.credits-table {
  width: 100%;
  border-collapse: collapse;
}

.credits-table th,
.credits-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.credits-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.credits-table tbody tr:hover {
  background-color: #f8f9fa;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
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

/* Botones */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-sm {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
}

.btn-primary {
  background-color: #097a5c;
  color: white;
}

.btn-primary:hover {
  background-color: #0BA57B;
}

.btn-info {
  background-color: #097a5c;
  color: white;
}

.btn-info:hover {
  background-color: #0BA57B;
}

.btn-warning {
  background-color: #efa229;
  color: #212529;
}

.btn-warning:hover {
  background-color: #f3b24a;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
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

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: #1e3a5f;
}

.modal-content p {
  margin-bottom: 1.5rem;
  color: #6c757d;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #1e3a5f;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
