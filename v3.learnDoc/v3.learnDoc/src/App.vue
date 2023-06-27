<script>
export default{
    data(){
        return {
            counter: 0,
            hour: 0,
            minute: 0,
            secunds: 0,
            checked: [],
            bool: false,
            radio: {
                name: ''
            },
            selected: '',
            change: ''
        }
    },
    methods: {
        increment(){
            this.counter++
        },
        decrement(){
            this.counter--
        }
    },
    mounted(){
        setInterval(()=> {
            let time = new Date
            let hours = time.getHours()
            let minutes = time.getMinutes()
            let secund = time.getSeconds()
            this.hour = hours; 
            this.minute = minutes; 
            this.secunds = secund
        }, 1000)
    }
}
</script>

<template>
 <h1>Hello world!</h1>
 <span>{{ counter }}</span>
 <div><span>{{ hour }}:{{ minute }}:{{ secunds }}</span></div>
 <button type="button" @click="increment">+</button>
 <button type="button" @click="decrement">-</button>

<input type="checkbox" value="One" id="one" v-model="checked" />
<label for="one">One</label>
<input type="checkbox" value="Two" id="two" v-model="checked" />
<label for="two">Two</label>
<input type="checkbox" value="Three" id="three" v-model="checked" />
<label for="three">Three</label>
<br>
<input type="checkbox" id="checkbox" v-model="bool">
<span>{{ bool }}</span>
<br>
<span>{{ checked }}</span>

<br>
<div class="radio">
    <input type="radio" value="Один" id="one" v-model="radio.name">
    <label for="one">Один</label>
    <br>
    <input type="radio" value="Два" id="two" v-model="radio.name">
    <label for="two">Два</label>
    <br>
    <span>{{ radio }}</span>
</div>
<div id="v-model-select" class="demo">
  <select v-model="selected">
    <option disabled value="">Выберите один из вариантов</option>
    <option>А</option>
    <option>Б</option>
    <option>В</option>
  </select>
  <span>Выбрано: {{ selected }}</span>
</div>
<div class="input-lag">
    <input type="text" v-model.number="change">
    <span>{{ change }}</span>
</div>
</template>

<style scoped>

</style>
