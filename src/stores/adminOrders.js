import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminOrdersStore = defineStore('adminOrders', {

  state: () => ({
    orders: [],
    pagination: {},
    loading: false,
    order: null,
  }),

  actions: {

    async fetchOrders(page = 1) {
      this.loading = true

      const res = await axios.get(`/api/admin/orders?page=${page}`)

      this.orders = res.data.data
      this.pagination = res.data.meta

      this.loading = false
    },
    async fetchOrder(id) {

  this.loading = true

  const res = await axios.get(`/admin/orders/${id}`)

  this.order = res.data

  this.loading = false
},

    async updateStatus(id, status) {
      await axios.patch(`/admin/orders/${id}`, {
        status
         // تحديث مباشر بدون إعادة fetch
        })
        if (this.order && this.order.id === id) {
            this.order.status = status
        }

      await this.fetchOrders()
    }

  }

})