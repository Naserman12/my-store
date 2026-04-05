import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminStore = defineStore('admin', {

  state: () => ({
    stats: {},
    latestOrders: [],
    loading: false
  }),

  actions: {

    async fetchDashboard() {
      this.loading = true

      const res = await axios.get('/api/admin/dashboard')
      this.stats = res.data

      this.loading = false
    },

    async fetchLatestOrders() {
      const res = await axios.get('/api/admin/orders/latest')
      this.latestOrders = res.data
    }

  }

})