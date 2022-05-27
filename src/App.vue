<template>
  <div id="app">
    <NavBar :itemsAdded="getItemsAdded()" :user="user" @log-out="logOut" />
    <router-view :products="products" @add-to-cart="addToCart" :sizes="sizes" />
    <CartModal
      :cart="cart"
      @remove-from-cart="removeFromCart"
      @create-order="createOrder"
    />
    <LoginModal
      :isLoggedIn="isLoggedIn"
      :hasAccount="hasAccount"
      @log-in="logIn"
      @create-account="createAccount"
    />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Services from "./services/services";
import CartModal from "./components/cart/CartModal.vue";
import LoginModal from "./components/LoginModal.vue";

export default {
  name: "App",
  data: () => ({
    products: [],
    users: [],
    orders: [],
    sizes: [
      { talle: 35, largo: 22.8 },
      { talle: 36, largo: 23.5 },
      { talle: 37, largo: 24.2 },
      { talle: 38, largo: 24.8 },
      { talle: 39, largo: 25.5 },
      { talle: 40, largo: 26.2 },
      { talle: 41, largo: 27 },
    ],
    cart: [],
    isLoggedIn: false,
    hasAccount: true,
    user: {},
  }),
  components: { NavBar, CartModal, LoginModal },
  mounted() {
    this.getProducts();
    this.getUsers();
  },
  methods: {
    async getProducts() {
      await Services.getProducts()
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.products = data;
        })
        .catch(() => {
          this.$bvToast.toast("Error", {
            title: `No pudimos recuperar la lista de productos, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
    },
    async getUsers() {
      await Services.getUsers()
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.users = data;
        })
        .catch(() => {
          this.$bvToast.toast("Error", {
            title: `No pudimos recuperar la lista de usuarios, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
    },
    logIn(form) {
      this.user = this.users.find(
        (user) => user.user === form.user && user.password === form.password
      );
      if (!this.user) {
        this.hasAccount = false;
        this.$bvToast.toast("Info", {
          title: "No existe cuenta para ese usuario y contraseña. Crea una!",
          variant: "info",
          solid: true,
        });
      } else {
        this.hasAccount = true;
        this.getOrders();
        this.$bvToast.toast("Success", {
          title: "Has ingresado a tu cuenta correctamente",
          variant: "success",
          solid: true,
        });
      }
    },
    async createAccount(form) {
      await Services.addUser(form)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.user = data;
          this.hasAccount = true;
          this.$bvToast.toast("Success", {
            title: "Hemos creado tu cuenta correctamente",
            variant: "success",
            solid: true,
          });
        })
        .catch(() => {
          this.$bvToast.toast("Error", {
            title: `No pudimos crear tu cuenta, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
    },
    logOut() {
      this.user = {};
      this.isLoggedIn = false;
    },
    addToCart(productId) {
      const productInCart = this.cart.find(
        (product) => product.id === productId
      );

      if (productInCart) {
        if (productInCart.quantity < productInCart.stock) {
          productInCart.quantity++;
        } else {
          this.$bvToast.toast("Error", {
            title: "Has alcanzado la cantidad máxima de producto disponible",
            variant: "danger",
            solid: true,
          });
          return;
        }
      } else {
        const newProduct = this.products.find(
          (product) => product.id === productId
        );

        this.cart.push({
          ...newProduct,
          quantity: 1,
        });
      }
      this.$bvToast.toast("Success", {
        title: "Ya agregamos el producto al carrito ✨",
        variant: "success",
        solid: true,
      });
    },
    removeFromCart(productId) {
      const productInCart = this.cart.find(
        (product) => product.id === productId
      );
      if (productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        this.cart = this.cart.filter((p) => {
          return p.id != productId;
        });
      }
    },
    getItemsAdded() {
      var totalItems = this.cart.reduce(function (res, item) {
        return res + item.quantity;
      }, 0);
      return totalItems;
    },
    async createOrder(cart) {
      const order = {
        product: cart,
        userId: this.user.id,
      };
      await Services.addOrder(order)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.orders.push(data);
          this.$bvToast.toast("Success", {
            title:
              "Tu orden ha sido creada correctamente. Ya estamos trabajando en ella!",
            variant: "success",
            solid: true,
          });
        })
        .catch(() => {
          this.$bvToast.toast("Error", {
            title: `No pudimos crear tu orden, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
    },
    async getOrders() {
      await Services.getOrders()
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.orders = data.filter((order) => {
            return (order.userId = this.user.id);
          });
        })
        .catch(() => {
          this.$bvToast.toast("Error", {
            title: `No pudimos recuperar tu lista de ordenes, vuelve a intentarlo`,
            variant: "danger",
            solid: true,
            noAutoHide: true,
          });
        });
    },
  },
};
</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300&family=Satisfy&display=swap");

#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.b-toaster.b-toaster-top-right {
  right: 15px;

  .b-toaster-slot.vue-portal-target {
    font-family: "Dosis", sans-serif;

    .toast {
      border: none;

      .toast-header {
        border: none;
        background-color: #6c757d;
        color: white;
        height: 56px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
        border-radius: 4px;

        .close {
          color: #bebebe;
          font-weight: 400;
          text-shadow: none;

          &:focus,
          &:active {
            border: none;
            outline: none;
          }
        }
      }
      .toast-body {
        display: none;
      }
    }

    .b-toast-danger {
      .toast-header {
        border-left: 4px solid red;

        &:before {
          content: url("../public/assets/danger.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }

    .b-toast-success {
      .toast-header {
        border-left: 4px solid #9df4e2;

        &:before {
          content: url("../public/assets/success.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }

    .b-toast-info {
      .toast-header {
        border-left: 4px solid #83aefb;

        &:before {
          content: url("../public/assets/info.svg");
          height: 25px;
          margin-right: 13px;
        }
      }
    }
  }
}
</style>
