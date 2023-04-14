const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        reupdateCart(id){
            let index = this.cart.indexOf(id, 0)
            if (index !== -1) {
                this.cart.splice(index, 1)
            }
            
        }
    }
})