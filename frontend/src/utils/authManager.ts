import axios from 'axios'

export const AuthManager = {
  async authorize(data: { username: string; password: string }) {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', data, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
        }
      })

      console.log(response.data)
      localStorage.setItem('AuthToken', response.data.jwt)
      localStorage.setItem('UserLogin', JSON.stringify(response.data.userEntity))

      return response.data // Devuelve la respuesta con los datos de autenticación
    } catch (error) {
      console.error('Error durante la autenticación:', error) // Manejo de errores

      throw error
    }
  },

  async register(data: { username: string; password: string; email: string; roleRequest: any }) {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', data, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
        }
      })

      localStorage.setItem('AuthToken', response.data.jwt)
      localStorage.setItem('UserLogin', JSON.stringify(response.data.userEntity))

      return response.data // Devuelve la respuesta con los datos de registro
    } catch (error) {
      console.error('Error durante el registro:', error) // Manejo de errores
      throw error
    }
  },

  async validateUsername(data: { username: string }) {
    try {
      const response = await axios.post('http://localhost:8080/auth/validate-username', data, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
        }
      })

      return response.data // Devuelve la respuesta con los datos de validación
    } catch (error) {
      console.error('Error durante la validación del username:', error) // Manejo de errores
      throw error
    }
  },
  async validateAccount(data: { validationToken: string }) {
    try {
      const response = await axios.post('http://localhost:8080/auth/validate-account', data, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
        }
      })

      return true // Devuelve la respuesta con los datos de validación
    } catch (error) {
      console.error('Error durante la validación de la cuenta:', error) // Manejo de errores
      throw error
    }
  },
  async validateEmail(data: { email: string }) {
    try {
      const response = await axios.post('http://localhost:8080/auth/validate-email', data, {
        headers: {
          'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
        }
      })

      return response.data // Devuelve la respuesta con los datos de validación
    } catch (error) {
      console.error('Error durante la validación del email:', error) // Manejo de errores
      throw error
    }
  },
  async logout() {
    try {
      localStorage.removeItem('AuthToken')
      localStorage.removeItem('UserLogin')
    } catch (error: any) {
      console.log(error)
    }
  },

  async validateToken() {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/validate-token',
        { token: localStorage.getItem('AuthToken') },
        {
          headers: {
            'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
          }
        }
      )

      return response.data // Devuelve la respuesta con los datos de validación
    } catch (error) {
      console.error('Error durante la validación del token:', error) // Manejo de errores
      throw error

      return false
    }
  },
  async resetPassword(data) {
    try {
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        newPassword: data.newPassword,
        token: data.token
      })

      return response.data // Devuelve la respuesta con los datos de validación
    } catch (error) {
      console.error('Error durante la validación del token:', error) // Manejo de errores
      throw error

      return false
    }
  }
}
