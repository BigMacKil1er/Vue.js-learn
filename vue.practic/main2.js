const { createApp } = Vue 

createApp({
    data(){
        return {
            title: 'some Title',
            description: 'No way!'
        }
    }
}).mount('#app')