<template>
  <div class="credit-create-page">
    <div class="page-header">
      <h2>Crear Nuevo Credito</h2>
      <router-link to="/" class="btn btn-secondary">
        Volver al Listado
      </router-link>
    </div>

    <div class="form-card">
      <form @submit.prevent="handleSubmit">
        <!-- Nombre del cliente -->
        <div class="form-group">
          <label for="nombre_cliente">Nombre del Cliente *</label>
          <input 
            type="text" 
            id="nombre_cliente" 
            v-model="form.nombre_cliente"
            class="form-control"
            placeholder="Ingrese el nombre completo del cliente"
            required
          >
        </div>

        <!-- Cedula -->
        <div class="form-group">
          <label for="cedula">Cedula *</label>
          <input 
            type="text" 
            id="cedula" 
            v-model="form.cedula"
            class="form-control"
            placeholder="Ingrese el numero de cedula"
            required
          >
        </div>

        <!-- Valor del credito -->
        <div class="form-group">
          <label for="valor_credito">Valor del Credito *</label>
          <input 
            type="number" 
            id="valor_credito" 
            v-model.number="form.valor_credito"
            class="form-control"
            placeholder="Ingrese el valor del credito"
            min="0"
            step="1000"
            required
          >
        </div>

        <!-- Mensaje de informacion -->
        <div class="info-message">
          <p>
            <strong>Nota:</strong> El numero de credito se generara automaticamente 
            y el estado inicial sera <span class="status-badge status-pendiente">PENDIENTE</span>
          </p>
        </div>

        <!-- Mensaje de error -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Mensaje de exito -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <!-- Botones -->
        <div class="form-actions">
          <button 
            type="button" 
            @click="resetForm" 
            class="btn btn-secondary"
          >
            Limpiar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="creditStore.loading"
          >
            {{ creditStore.loading ? 'Guardando...' : 'Crear Credito' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// Importar funciones de Vue 3
import { ref, reactive } from 'vue'
// Importar el router para redirigir
import { useRouter } from 'vue-router'
// Importar el store de creditos
import { useCreditStore } from '../stores/creditStore'

// Usar el router y el store
const router = useRouter()
const creditStore = useCreditStore()

// Formulario reactivo
const form = reactive({
  nombre_cliente: '',
  cedula: '',
  valor_credito: null
})

// Mensajes
const errorMessage = ref('')
const successMessage = ref('')

// Manejar el envio del formulario
const handleSubmit = async () => {
  // Limpiar mensajes
  errorMessage.value = ''
  successMessage.value = ''

  // Validar campos
  if (!form.nombre_cliente.trim()) {
    errorMessage.value = 'El nombre del cliente es requerido'
    return
  }

  if (!form.cedula.trim()) {
    errorMessage.value = 'La cedula es requerida'
    return
  }

  if (!form.valor_credito || form.valor_credito <= 0) {
    errorMessage.value = 'El valor del credito debe ser mayor a 0'
    return
  }

  try {
    // Crear el credito usando el store
    const newCredit = await creditStore.addCredit({
      nombre_cliente: form.nombre_cliente.trim(),
      cedula: form.cedula.trim(),
      valor_credito: form.valor_credito
    })

    successMessage.value = 'Credito creado exitosamente!'
    
    // Redirigir al detalle del credito despues de 1.5 segundos
    setTimeout(() => {
      router.push(`/credits/${newCredit.id}`)
    }, 1500)

  } catch (error) {
    console.error('Error creating credit:', error)
    errorMessage.value = 'Error al crear el credito. Por favor intente nuevamente.'
  }
}

// Limpiar el formulario
const resetForm = () => {
  form.nombre_cliente = ''
  form.cedula = ''
  form.valor_credito = null
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<style scoped>
.credit-create-page {
  padding: 1rem 0;
  max-width: 600px;
  margin: 0 auto;
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

/* Formulario */
.form-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #1e3a5f;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.form-control::placeholder {
  color: #adb5bd;
}

/* Mensajes */
.info-message {
  background-color: #e7f1ff;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #1e3a5f;
}

.info-message p {
  margin: 0;
  color: #333;
  font-size: 0.9rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #dc3545;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #28a745;
}

/* Status badge */
.status-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pendiente {
  background-color: #fff3cd;
  color: #856404;
}

/* Botones */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #efa229;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #f3b24a;
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
