<template>
  <div class="observation-form">
    <h4>Agregar Nueva Observacion</h4>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <!-- Usuario -->
        <div class="form-group">
          <label for="usuario">Usuario *</label>
          <input 
            type="text" 
            id="usuario" 
            v-model="form.usuario"
            class="form-control"
            placeholder="Nombre del usuario"
            required
          >
        </div>

        <!-- Area -->
        <div class="form-group">
          <label for="area">Area *</label>
          <select 
            id="area" 
            v-model="form.area"
            class="form-control"
            required
          >
            <option value="">Seleccione un area</option>
            <option value="COMERCIAL">COMERCIAL</option>
            <option value="ANALISIS">ANALISIS</option>
            <option value="TESORERIA">TESORERIA</option>
            <option value="CARTERA">CARTERA</option>
          </select>
        </div>
      </div>

      <!-- Comentario -->
      <div class="form-group">
        <label for="comentario">Comentario *</label>
        <textarea 
          id="comentario" 
          v-model="form.comentario"
          class="form-control"
          placeholder="Escriba su observacion aqui..."
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Mensaje de exito -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <!-- Boton de envio -->
      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="observationStore.loading"
        >
          {{ observationStore.loading ? 'Guardando...' : 'Agregar Observacion' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// Importar funciones de Vue 3
import { ref, reactive, defineProps } from 'vue'
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

// Formulario reactivo
const form = reactive({
  usuario: '',
  area: '',
  comentario: ''
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
  if (!form.usuario.trim()) {
    errorMessage.value = 'El nombre de usuario es requerido'
    return
  }

  if (!form.area) {
    errorMessage.value = 'Debe seleccionar un area'
    return
  }

  if (!form.comentario.trim()) {
    errorMessage.value = 'El comentario es requerido'
    return
  }

  try {
    // Crear la observacion usando el store
    await observationStore.addObservation({
      credit_id: props.creditId,
      usuario: form.usuario.trim(),
      area: form.area,
      comentario: form.comentario.trim()
    })

    successMessage.value = 'Observacion agregada exitosamente!'
    
    // Limpiar el formulario
    form.usuario = ''
    form.area = ''
    form.comentario = ''

    // Limpiar mensaje de exito despues de 3 segundos
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (error) {
    console.error('Error creating observation:', error)
    errorMessage.value = 'Error al agregar la observacion. Por favor intente nuevamente.'
  }
}
</script>

<style scoped>
.observation-form {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.observation-form h4 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* Form row */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #1e3a5f;
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.form-control::placeholder {
  color: #adb5bd;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

/* Mensajes */
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #dc3545;
  font-size: 0.9rem;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 4px solid #28a745;
  font-size: 0.9rem;
}

/* Botones */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
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
</style>
