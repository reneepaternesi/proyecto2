import axios from 'axios'

export default {
  async getProducts () {
    return await axios.get('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/products')
  },
  async getProduct (productId) {
    return await axios.get('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/products', productId)
  },
  async addProduct (product) {
    return await axios.post('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/product', product)
  },
  async getUsers () {
    return await axios.get('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/users')
  },
  async getUser (userId) {
    return await axios.get('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/users', userId)
  },
  async addUser (user) {
    return await axios.post('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/users', user)
  },
  async addOrder (order) {
    return await axios.post('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/orders', order)
  },
  async getOrders () {
    return await axios.get('https://628e6ce6a339dfef87adf203.mockapi.io/reneeshoes/orders')
  },
}