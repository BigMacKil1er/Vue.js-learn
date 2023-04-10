const { createApp } = Vue

createApp({
    data() {
        return {
            cart: 0,
            product: 'Socks',
            description: 'These socks are soft and smell nice',
            image: './assets/images/socks_green.jpg',
            url: 'https://vk.com/variar',
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
              ],
            sizes: [
                {id: 1131, size: 's'},
                {id: 1132, size: 'm'},
                {id: 1133, size: 'l'},
                {id: 1134, size: 'xl'},
            ]
        }
    }, 
    methods: {
        addToCard(){
            this.cart += 1
        },
        removeToCard(){
            if(this.cart !== 0) {
                this.cart -= 1
            }
        }, 
        updateImage(variantImage){
            this.image = variantImage
        }
    }
}).mount('#app')
