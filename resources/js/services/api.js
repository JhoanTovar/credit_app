// resources/js/services/api.js
// Servicio centralizado para llamadas al backend Laravel
// Usa axios (ya configurado en bootstrap.js)

import axios from 'axios'

// Configurar la URL base para las llamadas API
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// ==========================================
// CREDITOS
// ==========================================

// Obtener todos los creditos
export const getCredits = () => {
  return api.get('/credits')
}

// Obtener un credito especifico por ID
export const getCredit = (id) => {
  return api.get(`/credits/${id}`)
}

// Crear un nuevo credito
export const createCredit = (creditData) => {
  return api.post('/credits', creditData)
}

// Actualizar el estado de un credito
export const updateCreditStatus = (id, estado) => {
  return api.patch(`/credits/${id}/status`, { estado })
}

// ==========================================
// OBSERVACIONES
// ==========================================

// Obtener todas las observaciones de un credito
export const getObservations = (creditId) => {
  return api.get(`/observations/credit/${creditId}`)
}

// Obtener observaciones filtradas por area
export const getObservationsByArea = (creditId, area) => {
  return api.get(`/observations/credit/${creditId}/${area}`)
}

// Crear una nueva observacion
export const createObservation = (observationData) => {
  return api.post('/observations', observationData)
}

export default api
