<template>
  <b-container class="product-layout p-5">
    <b-row class="justify-content-center">
      <div class="col-6">
        <img class="w-100" :src="productToCart.img" />
      </div>
      <div class="col-6">
        <h1 class="title">{{ productToCart.name }}</h1>
        <p class="description">{{ productToCart.description }}</p>
        <p class="text-left">
          <strong>Cantidad Disponible: </strong>{{ productToCart.stock }}
        </p>
        <b-row>
          <div class="col-6">
            <b-table striped hover :items="sizes"></b-table>
          </div>
          <div class="col-6">
            <div class="price">
              Precio: {{ getCurrency(productToCart.price) }}
            </div>
            <b-form-select
              v-model="productToCart.size"
              :options="getSizes(sizes)"
              class="sizes"
              required
              :disabled="!validPurchase()"
            >
            </b-form-select>
            <b-button
              class="add-to-cart shadow"
              type="submit"
              :disabled="!validPurchase()"
              @click="addToCart"
              >{{
                productToCart.stock === 0 ||
                productToCart.quantity === productToCart.stock
                  ? "No Disponible"
                  : "Comprar"
              }}</b-button
            >
          </div>
        </b-row>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ProductView",
  props: {
    id: String,
    product: {},
    sizes: [],
  },
  data: () => ({
    productToCart: {},
  }),
  methods: {
    validPurchase() {
      return (
        this.productToCart.stock > 0 &&
        this.productToCart.quantity < this.productToCart.stock
      );
    },
    addToCart() {
      this.$emit("add-to-cart", this.productToCart);
    },
  },
  mounted() {
    this.productToCart = this.product;
    this.productToCart.size = 35;
    this.productToCart.quantity = 0;
  },
};
</script>

<style scoped lang="less">
.title {
  text-shadow: 2px 2px 8px #6c757d;
  font-size: 50px;
  margin-bottom: 20px;
}

.description {
  text-align: justify;
}

.price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.sizes {
  padding: 0 15px;
  margin-bottom: 20px;
}
</style>
