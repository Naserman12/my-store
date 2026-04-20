// stores/wishlist.js
import { defineStore } from 'pinia'
import api from '../api/api'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),

  getters: {
    isInWishlist: (state) => (productId) => {
      return state.items.some(i => i.product_id === productId)
    }
  },
  actions: {
    async loadWishlist() {
      const res = await api.get('/auth/wishlist')
      this.items = res.data
    },
    async toggle(productId) {
      if (this.isInWishlist(productId)) {
        await api.delete(`/auth/wishlist/${productId}`)
        this.items = this.items.filter(i => i.product_id !== productId)
      } else {
        const res = await api.post('/auth/wishlist', { product_id: productId })
        this.items.push(res.data)
      }
    }
  }
})