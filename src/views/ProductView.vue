<template>
  <b-container class="product-layout p-5">
    <b-row class="justify-content-center">
      <div class="col-6">
        <img class="w-100" :src="product.img" />
      </div>
      <div class="col-6">
        <h1 class="title">{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="text-left">
          <strong>Cantidad Disponible: </strong>{{ product.stock }}
        </p>
        <b-row>
          <div class="col-6">
            <b-table striped hover :items="sizes"></b-table>
          </div>
          <div class="col-6">
            <div class="price">Precio: {{ getCurrency(product.price) }}</div>
            <b-form-select
              v-model="product.size"
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
                product.stock === 0 || product.quantity === product.stock
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
    products: [],
    sizes: [],
  },
  data: () => ({
    productId: 0,
    product: {},
  }),
  methods: {
    validPurchase() {
      return (
        this.product.stock > 0 && this.product.quantity < this.product.stock
      );
    },
    addToCart() {
      this.$emit("add-to-cart", this.product.id);
    },
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.product = this.products.find(
      (product) => product.id === this.productId
    );
    this.product.size = 35;
    this.product.quantity = 0;
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
