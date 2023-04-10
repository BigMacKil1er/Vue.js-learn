
const { createApp } = Vue
    
createApp({
    data() {
        return {
            cart: 0,
            brand: 'Vue mastery',
            product: 'Socks',
            sale: 'is on sale',
            description: 'These socks are soft and smell nice',
            selectedVariant: 0,
            url: 'https://vk.com/variar',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
              ],
        }
    },
    methods: {
        addToCard(){
            this.cart += 1
        },
        removeToCard(){
            if(this.cart !== 0) {
                this.cart -=1
            }
        },
        updateVariant(index){
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product + ' ' + this.onSale
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        onSale() {
            return this.variants[this.selectedVariant].quantity ? this.sale: ''
        }
    }
}).mount('#app')