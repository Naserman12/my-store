// import { defineStore } from 'pinia'
// import axios from 'axios'

// export const useWishlistStore = defineStore('wishlist', {

//     state: () => ({
//         items: [],
//         loading:false
//     }),

//     getters:{
//         isInWishlist:(state)=>(productId)=>{
//             return state.items.some(p => p.id === productId)
//         }
//     },

//     actions:{

//         async fetchWishlist(){
//             this.loading = true

//             const res = await axios.get('/api/wishlist')

//             this.items = res.data

//             this.loading = false
//         },

//         async toggle(product){

//             // remove
//             if(this.isInWishlist(product.id)){
//                 await axios.delete(`/api/wishlist/${product.id}`)

//                 this.items =
//                     this.items.filter(p=>p.id !== product.id)

//                 return
//             }

//             // add
//             await axios.post('/api/wishlist',{
//                 product_id: product.id
//             })

//             this.items.push(product)
//         }
//     }
// })