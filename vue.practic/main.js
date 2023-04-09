const { createApp } = Vue

createApp({
    data() {
        return {
            title: 'Учи слова!',
            description: 'Приложение для изучения слов + заметки'
        }
    }
}).mount('#app')
