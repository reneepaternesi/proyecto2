<template>
  <b-container class="orders-layout p-5">
    <b-row class="justify-content-center">
      <div class="col-12">
        <h1 class="title">Mis Órdenes</h1>
        <div v-for="order in orders" :key="order.id">
          <h2>Orden #{{ order.id }}</h2>
          <h3>Fecha: {{ order.date }}</h3>
          <b-table striped hover :items="order.products"></b-table>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "OrdersView",
  props: {
    orders: {},
  },
};
</script>

<style></style>
