<script>
import { subscribeToTicker, unsubscribeFromTicker } from './api'
import { parse } from '@vue/compiler-dom'
import AddTicker from './components/AddTicker.vue'
import TrashIcon from './components/visual/TrashIcon.vue'
export default {
  name: 'App',
  data(){
    return {
      filter: '',
      tickets: [],
      graph: [],
      selectedTicker: null,
      // addedTickers: false,
      checkData: null,
      page: 1,
      maxGraphElements: 1,
      sizeGraphElement: null,
      checkData: null
    }
  },
  components: {
    AddTicker,
    TrashIcon
  },
  computed: {
    toManyTickersAdded(){
      return this.tickets.length > 4
    },
    startIndex(){
      return (this.page-1) * 6
    },
    endIndex(){
      return this.page * 6
    },
    filteredTickers(){
      return this.tickets.filter(ticker => ticker.name.includes(this.filter.toUpperCase()))
    },
    paginatedTickers(){
      return this.filteredTickers.slice(this.startIndex, this.endIndex)
    },
    hasPages(){
      return this.filteredTickers.length > this.endIndex
    },
    getPercentsFromGraph(){
      let max = Math.max(...this.graph)
      let min = Math.min(...this.graph)
      if (min === max) {
        return this.graph.map(() => 50)
      }
      return this.graph.map(
        price => 5 + ((price-min) * 95) / (max-min)
      )
    },
    pageStateOptions(){
      return {
        filter: this.filter,
        page: this.page
      }
    }
  },
  methods: {
    calculateMaxGraphElements(){
      if (!this.$refs.graph) {
        return
      }
      this.sizeGraphElement = this.$refs.graphElement?.at(-1)?.clientWidth ? this.$refs.graphElement?.at(-1)?.clientWidth : this.sizeGraphElement
      this.maxGraphElements = this.$refs.graph.clientWidth / this.sizeGraphElement
    },
    updateTicker(tickerName, price){
      this.tickets.find(t => t.name === tickerName).price = price
      if (this.selectedTicker?.name === tickerName) {
        this.graph.unshift(price)
        if (this.graph.length > this.maxGraphElements) {
          this.graph = this.graph.slice(0, this.maxGraphElements)
        }
      }
      this.calculateMaxGraphElements()
    },
    formarPrice(price){
      if (price === '-') {
        return price
      }
      return price > 1 ? price.toFixed(2) : price.toPrecision(2)
    },
    add(ticker) {
      const newTicker = {name: ticker, price: '-'}
      this.tickets = [...this.tickets, newTicker]
      this.filter = ''
      subscribeToTicker(ticker,  newPrice => this.updateTicker(ticker, newPrice))
    },
    del(tickerToRemove) {
      this.tickets = this.tickets.filter(t => t !== tickerToRemove)
      if (this.selectedTicker === tickerToRemove) {
        this.selectedTicker = null
      }
      unsubscribeFromTicker(tickerToRemove.name)
    },
    select(ticker){
      this.selectedTicker = ticker
      this.graph = []
    },
  },
  created: async function () {
    const windowData = Object.fromEntries(new URL(window.location).searchParams.entries())
    if (windowData.filter) {
      this.filter = windowData.filter
    }
    if (windowData.page) {
      this.page = windowData.page
    }
    const receivedFromLocalStorage = await localStorage.getItem('dataAboutCrypto')
    if (receivedFromLocalStorage) {
      this.tickets = await JSON.parse(receivedFromLocalStorage)
      this.tickets.forEach(ticker => {
        subscribeToTicker(ticker.name, newPrice => this.updateTicker(ticker.name, newPrice))
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.calculateMaxGraphElements)
  },
  beforeMount(){
    window.removeEventListener('resize', this.calculateMaxGraphElements)
  },
  watch: {
    // sizeGraphElement(){
    //   this.$nextTick(this.calculateMaxGraphElements)
    // },
    tickets(){
      localStorage.setItem('dataAboutCrypto', JSON.stringify(this.tickets))
    },
    paginatedTickers(){
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1
      }
    },
    filter(){
      this.page = 1
      window.history.pushState(null, document.title, `${window.location.pathname}?filter=${this.filter}&page=${this.page}`)
    },
    page(){
      window.history.pushState(null, document.title, `${window.location.pathname}?filter=${this.filter}&page=${this.page}`)
    }
  },
  
}
</script>

<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <!-- <div class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"> -->
      <!-- <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> -->
        <!-- <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> -->
      <!-- <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> -->
      <!-- </svg> -->
    <!-- </div> -->
  <div class="container">
    <!-- Here is the component that adds the ticker -->
      <add-ticker @add-ticker="add" :tickets="tickets" :disabled="toManyTickersAdded" />
      <template v-if="tickets.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <div>
          <button v-if="page > 1" @click="page = page - 1" class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Назад</button>
          <button v-if="hasPages" @click="page = page + 1" class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Вперед</button>
          <div>Фильтр: <input v-model="filter" type="text" class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"></div>
        </div>
        
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="t of paginatedTickers"
            :key="t"
            @click="select(t)"
            :class="{
              'border-4': selectedTicker === t,
              'bg-red-100': t.price === '-',
              'bg-white': t.price !== '-'
            }"
            class="overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ formarPrice(t.price) }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
            @click.stop="del(t)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg>Удалить
            </button>
          </div>
        
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
    </template>
    <section class="relative" v-if="selectedTicker">
      <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
        {{ selectedTicker.name }} - USD
      </h3>
      <div class="flex items-end border-gray-600 border-b border-l h-64" ref="graph">
        <div
          v-for="(bar, idx) in getPercentsFromGraph"
          :key="idx"
          :style="{ height: `${bar}%` }"
          ref="graphElement"
          style="min-width: 40px"
          class="bg-purple-800 border"
        ></div>
      </div>
      <button
        @click="selectedTicker=null"
        type="button"
        class="absolute top-0 right-0"
      >
        <trash-icon />
      </button>
    </section>
  </div>
</div>

</template>

<style src="./app.css">

</style>
