

import { useRouter } from 'next/navigation';

import axios from 'axios';

// Crear una instancia personalizada de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto por tu URL base
  timeout: 10000, // Tiempo máximo de espera en ms
});

// Interceptor de solicitudes
axiosInstance.interceptors.request.use(
  (config:any) => {
    // Agrega encabezados o lógica personalizada antes de enviar la solicitud
    const token = localStorage.getItem('AuthToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log(`[Request] ${config.method.toUpperCase()} ${config?.url}`, config);

    return config;
  },
  (error) => {
    // Manejo de errores antes de que se envíe la solicitud
    console.error('[Request Error]', error);


    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response:any) => {
    // Procesa la respuesta antes de entregarla al código
    console.log('[Response]', response);

    return response;
  },
  (error) => {
    // Manejo de errores globales
    if (error.response) {
      console.error('[Response Error]', error.response);

      if (error.response.status === 401) {
        console.log('Token inválido o expirado. Redirigiendo al login...');


      // Redirigir al login
      window.location.href = '/login';

        // Lógica para redirigir al login o renovar token
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
