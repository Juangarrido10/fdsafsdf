export default {
    async login(username, password) {
      try {
        const res = await fetch('/usuarios.json')
        const users = await res.json()
  
        const user = users.find(
          u => u.username === username && u.password === password
        )
  
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          return { success: true, user }
        } else {
          return { success: false, message: 'Credenciales incorrectas' }
        }
      } catch (e) {
        console.error('Error cargando usuarios:', e)
        return { success: false, message: 'Error al validar usuario' }
      }
    },
  
    logout() {
      localStorage.removeItem('user')
    },
  
    getUser() {
      return JSON.parse(localStorage.getItem('user'))
    },
  
    isAuthenticated() {
      return !!localStorage.getItem('user')
    }
  }
  