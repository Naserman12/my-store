import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {

  state: () => ({
    orders: []
  }),
  getters: {
  totalSales: (state) =>
    state.orders.reduce((sum,o)=> sum + o.total,0),

  totalOrders: (state) => state.orders.length,

  todaySales: (state) => {
    const today = new Date().toLocaleDateString()

    return state.orders
      .filter(o => o.date === today)
      .reduce((s,o)=> s + o.total,0)
  },

  weeklySales: (state) => {
    const now = new Date()

    return state.orders.filter(order => {
      const d = new Date(order.date)
      const diff = (now - d)/(1000*60*60*24)
      return diff <= 7
    })
    .reduce((s,o)=> s + o.total,0)
  },

  monthlySales: (state) => {
    const month = new Date().getMonth()

    return state.orders.filter(o =>
      new Date(o.date).getMonth() === month
    )
    .reduce((s,o)=> s + o.total,0)
  }
},

  actions: {

    createOrder(cart, checkoutData, total) {

      const newOrder = {
        id: 'ORD-' + Date.now(),
        items: cart,
        shipping: checkoutData.shipping,
        total,
        status: 'قيد المعالجة',
        date: new Date().toLocaleDateString()
      }

      this.orders.unshift(newOrder)
    }
  },
    updateStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId)

    if(order){
      order.status = newStatus
      localStorage.setItem('orders',
        JSON.stringify(this.orders)
      )
    }
  },

  persist: true
})