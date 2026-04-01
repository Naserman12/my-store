import { defineStore } from 'pinia'
import { useCartStore } from './cart'
export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
      step: 1,
      
      shipping: {
          email: '',
          address: '',
          shippingMethod: 'free',
          shippingPrice: 0,
          coupon: '',
        },

  }),
  getters: {
    discount() {
      if (this.coupon === 'SALE10') {
        const cart = useCartStore()
        return cart.subtotal * 0.1
      }
      return 0
    },
    total() {
      const cart = useCartStore()
      return (
        cart.subtotal +
        this.shipping.shippingPrice -
        this.discount
      )
    }
  },
  actions: {
    nextStep() {
      if (this.step < 3) this.step++
    },
    prevStep() {
      if (this.step > 1) this.step--
    },
    setShippingMethod(method) {
      this.shippingMethod = method
      // حساب سعر الشحن
      switch (method) {
        case 'free':
          this.shippingPrice = 0
          break
        case 'mrsool':
          this.shippingPrice = 25
          break
        case 'store':
          this.shippingPrice = 10
          break
        case 'ourStore':
          this.shippingPrice = 5
          break
      }
    },
    applyCoupon(code) {
      if (code) {
          this.coupon = code
          return code === 'SALE10'
      }
      return false
    },
  },
  persist: true
})