// resources/js/stores/observationStore.js
// Store de Pinia para gestionar el estado de las observaciones
// Cada credito puede tener multiples observaciones como la bitacora

import { defineStore } from 'pinia'
import { getObservations, getObservationsByArea, createObservation } from '../services/api'

export const useObservationStore = defineStore('observation', {
  // STATE: Los datos que queremos almacenar
  state: () => ({
    observations: [],      // Lista de observaciones del credito actual
    loading: false,        // Indicador de carga
    error: null,           // Mensaje de error
    currentFilter: null    // Filtro de area actual (null = todas)
  }),

  // GETTERS: Propiedades computadas
  getters: {
    // Total de observaciones
    totalObservations: (state) => state.observations.length,
    
    // Verificar si hay observaciones
    hasObservations: (state) => state.observations.length > 0,
    
    // Obtener las areas disponibles (constantes)
    availableAreas: () => ['COMERCIAL', 'ANALISIS', 'TESORERIA', 'CARTERA']
  },

  // ACTIONS: Funciones para modificar el estado
  actions: {
    // Cargar todas las observaciones de un credito
    async fetchObservations(creditId) {
      this.loading = true
      this.error = null
      this.currentFilter = null
      try {
        const response = await getObservations(creditId)
        this.observations = response.data
      } catch (error) {
        this.error = 'Error al cargar las observaciones'
        console.error('Error fetching observations:', error)
      } finally {
        this.loading = false
      }
    },

    // Cargar observaciones filtradas por area
    async fetchObservationsByArea(creditId, area) {
      this.loading = true
      this.error = null
      this.currentFilter = area
      try {
        const response = await getObservationsByArea(creditId, area)
        this.observations = response.data
      } catch (error) {
        this.error = 'Error al filtrar las observaciones'
        console.error('Error filtering observations:', error)
      } finally {
        this.loading = false
      }
    },

    // Agregar una nueva observacion
    async addObservation(observationData) {
      this.loading = true
      this.error = null
      try {
        const response = await createObservation(observationData)
        // Agregar la nueva observacion a la lista local
        this.observations.push(response.data.data)
        return response.data
      } catch (error) {
        this.error = 'Error al crear la observacion'
        console.error('Error creating observation:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Limpiar las observaciones (cuando se cambia de credito)
    clearObservations() {
      this.observations = []
      this.currentFilter = null
      this.error = null
    }
  }
})
