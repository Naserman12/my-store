// stores/wishlist.js
import { defineStore } from 'pinia';
import api from '../api/api';
import { showToast } from './toast';

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
      const res = await api.get('/wishlist')
      this.items = res.data.data
    },
    async toggle(productId) {
      try {
        const res = await api.post('/wishlist/toggle', { product_id: productId })
       if (res.data.status === "added") {
      this.items.push({ product_id: productId })
      showToast("تمت الإضافة إلى المفضلة", "success")
      } else {
        this.items = this.items.filter(i => i.product_id !== productId)
        showToast("تمت الإزالة من المفضلة", "error")
      }
    }
      catch (e) {
        console.log('Error toggling wishlist:', e.response || e)
      }
  }
}
})