app.component(
  // the registered name
  'product-display',
  // the implementation
  {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :class="{ 'out-of-stock-img': !inStock }" :src="image" alt="" srcset="">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out in Stock</p>
                    <p>Shipping: {{ shipping }}</p>
                    <product-details :details='details'></product-details> 
                    <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateVariant(index)"
                    class="color-circle" 
                    :style="{ backgroundColor: variant.color }"
                    ></div>
                    <!-- <div v-for="size in sizes">{{ size.size }}</div> -->
                    <button class="button" :disabled="!inStock" :class="{ disabledButton: !inStock }" @click="addToCard">Add to Cart</button>
                </div>
            </div>
        </div>`,
        data() {
            return {
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
                // onSale: true
            }
        },
        methods: {
            addToCard(){
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
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
            },
            shipping(){
                if (this.premium) {
                    return 'Free'
                }
                return 2.99
            }
            // sale() {
            //     if (this.onSale) {
            //         return this.brand + ' ' + this.product + ' is on sale.'
            //     }
            //     return ''
            // }
        }
  }
)
