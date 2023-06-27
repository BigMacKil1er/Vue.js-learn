<template>
    <button
        type="button"
        :disabled="disabled"
        class="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        :class="{
            'bg-gray-400': disabled,
            'cursor-default': disabled,
            'hover:bg-gray-700': !disabled,
            'bg-gray-600': !disabled
            }"
        >
        
        <!-- Heroicon name: solid/mail -->
        <add-icon />Добавить
    </button>
</template>

<script>
import AddIcon from './visual/AddIcon.vue'
export default {
    components: {
        AddIcon
    },
    props: {
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
}
</script>
