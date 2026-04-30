// resources/js/stores/creditStore.js
// Store de Pinia para gestionar el estado de los creditos
// Pinia es el gestor de estado oficial de Vue 3 (reemplaza a Vuex)

import { defineStore } from 'pinia'
import { getCredits, getCredit, createCredit, updateCreditStatus } from '../services/api'

export const useCreditStore = defineStore('credit', {
  // STATE: Los datos que queremos almacenar
  state: () => ({
    credits: [],           // Lista de todos los creditos
    currentCredit: null,   // Credito seleccionado actualmente
    loading: false,        // Indicador de carga
    error: null            // Mensaje de error si algo falla
  }),

  // GETTERS: Propiedades computadas del estado
  getters: {
    // Obtener creditos por estado
    creditsByStatus: (state) => (status) => {
      return state.credits.filter(credit => credit.estado === status)
    },
    
    // Total de creditos
    totalCredits: (state) => state.credits.length,
    
    // Verificar si hay un credito cargado
    hasCurrentCredit: (state) => state.currentCredit !== null
  },

  // ACTIONS: Funciones para modificar el estado
  actions: {
    // Cargar todos los creditos desde el backend
    async fetchCredits() {
      this.loading = true
      this.error = null
      try {
        const response = await getCredits()
        this.credits = response.data
      } catch (error) {
        this.error = 'Error al cargar los creditos'
        console.error('Error fetching credits:', error)
      } finally {
        this.loading = false
      }
    },

    // Cargar un credito especifico
    async fetchCredit(id) {
      this.loading = true
      this.error = null
      try {
        const response = await getCredit(id)
        this.currentCredit = response.data
      } catch (error) {
        this.error = 'Error al cargar el credito'
        console.error('Error fetching credit:', error)
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo credito
    async addCredit(creditData) {
      this.loading = true
      this.error = null
      try {
        const response = await createCredit(creditData)
        this.credits.push(response.data)
        return response.data
      } catch (error) {
        this.error = 'Error al crear el credito'
        console.error('Error creating credit:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Actualizar el estado de un credito
    async changeStatus(id, newStatus) {
      this.loading = true
      this.error = null
      try {
        const response = await updateCreditStatus(id, newStatus)
        // Actualizar en la lista local
        const index = this.credits.findIndex(c => c.id === id)
        if (index !== -1) {
          this.credits[index].estado = newStatus
        }
        // Actualizar el credito actual si es el mismo
        if (this.currentCredit && this.currentCredit.id === id) {
          this.currentCredit.estado = newStatus
        }
        return response.data
      } catch (error) {
        this.error = 'Error al actualizar el estado'
        console.error('Error updating status:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Limpiar el credito actual
    clearCurrentCredit() {
      this.currentCredit = null
    }
  }
})
