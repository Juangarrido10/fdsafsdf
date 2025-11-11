import axios from 'axios'

// Cambia baseURL a la API que uses:
// - Si usas json-server local: http://localhost:3000
// - Si usas FakeStore: https://fakestoreapi.com
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

export default {
  listProducts() { return api.get('/products') },
  getProduct(id) { return api.get(`/products/${id}`) },
  createProduct(product) { return api.post('/products', product) },
  updateProduct(id, product) { return api.put(`/products/${id}`, product) },
  deleteProduct(id) { return api.delete(`/products/${id}`) }
}
