import { defineStore } from 'pinia'
import axios from '../api/api'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    stats: {},
    latestOrders: [],
    loading: false
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true
      const res = await axios.get('/admin/dashboard')
      this.stats = res.data
      this.loading = false
    },
    async fetchLatestOrders() {
      const res = await axios.get('/admin/orders/latest')
      this.latestOrders = res.data
    }
  }
})