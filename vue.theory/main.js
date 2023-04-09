
const { createApp } = Vue
    
createApp({
    data() {
        return {
            product: 'Socks',
            description: 'These socks are soft and smell nice'
        }
    }
}).mount('#app')