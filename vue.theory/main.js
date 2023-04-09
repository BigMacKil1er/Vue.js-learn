
const { createApp } = Vue
    
createApp({
    data() {
        return {
            product: 'Socks',
            description: 'These socks are soft and smell nice',
            image: './assets/images/socks_green.jpg',
            url: 'https://vk.com/variar',
            inStock: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green'},
                {id: 2235, color: 'blue'},
                {id: 2236, color: 'green'}
            ],
            sizes: [
                {id: 1131, size: 's'},
                {id: 1132, size: 'm'},
                {id: 1133, size: 'l'},
                {id: 1134, size: 'xl'},
            ]
        }
    }
}).mount('#app')