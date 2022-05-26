<template>
  <b-container class="product-layout p-5">
    <b-row class="justify-content-center">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </b-row>
  </b-container>
</template>

<script>
import ProductCard from "../components/products/ProductCard.vue";

export default {
  name: "HomeView",
  props: {
    products: [],
  },
  components: {
    ProductCard,
  },
  methods: {
    addToCart(id) {
      this.$emit("add-to-cart", id);
    },
  },
};
</script>
