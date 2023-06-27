<template>
    <section>
      <div class="flex">
        <div class="max-w-xs">
          <label for="wallet" class="block text-sm font-medium text-gray-700"
            >Тикер</label
          >
          <div class="mt-1 relative rounded-md shadow-md">
            <input
              v-model="ticker"
              @click="addedTickers = false"
              @keydown.enter="!disabled ? add(ticker.toUpperCase()) : ''"
              type="text"
              name="wallet"
              id="wallet"
              class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          <div v-if="ticker.length && !disabled" class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span @click="add(autocomplite(ticker)[0])" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ autocomplite(ticker)[0] }}
            </span>
            <span @click="add(autocomplite(ticker)[1])" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ autocomplite(ticker)[1] }}
            </span>
            <span @click="add(autocomplite(ticker)[2])" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ autocomplite(ticker)[2] }}
            </span>
            <span @click="add(autocomplite(ticker)[3])" class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              {{ autocomplite(ticker)[3] }}
            </span>
          </div>
          <div v-if="addedTickers" class="text-sm text-red-600">Такой тикер уже добавлен</div>
        </div>
      </div>
      <!-- button Add -->
      <add-button @click="add(ticker.toUpperCase())" type="button" class="my-4" :disabled="disabled"/>
    </section>
</template>
<script>
import AddButton from './AddButton.vue';
export default {
    data(){
      return { 
        ticker: '',
        checkData: [],
        addedTickers: false
      }
    },
    components: {
        AddButton,
        
    },
    props: {
      tickets: {
        type: Array,
        required: false,
        default: []
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    
    emit: {
      'add-ticker': value => typeof value === 'string'
    },
    methods: {
        add(ticker) {
        if (ticker.length && (ticker.toUpperCase() in this.checkData)) {
          if (this.tickets.findIndex(item => item.name === ticker) === -1) {
            this.addedTickers = false 
            this.$emit('add-ticker', this.ticker.toUpperCase())
        } else {
          this.addedTickers = true
        }
        }
        this.ticker = ''
        },
        autocomplite(ticker){
            let fil = Object.keys(this.checkData).filter(item => item.indexOf(ticker.toUpperCase()) !== -1)
            return fil.sort((a, b) => a.length - b.length)
        }
    },
    mounted: async function(){
      const fet = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?summary=true`);
      const dataCrypto = await fet.json()
      this.checkData = dataCrypto.Data
    }
}
</script>