'use client' // Esto indica que este archivo es un Componente del Cliente
// Component Imports
import { useEffect, useState } from 'react'

import axios from 'axios'

import TypeDeviceListTable from '../../../../../views/apps/typeDevice/list/TypeDeviceListTable'

const getTypeDeviceData = async () => {
  console.log('TypeDeviceList ', process.env.BACKEND_PUBLIC_APP_URL)

  try {
    // Recupera el token desde localStorage
    const token = localStorage.getItem('AuthToken')

    console.log('token ', token)

    // Realiza la petición con el token en el encabezado Authorization
    const res = await axios.get(`http://localhost:8080/type-device`, {
      headers: {
        'Content-Type': 'application/json', // Asegúrate de que el contenido sea JSON
        Authorization: `Bearer ${token}` // Añade el token en el encabezado
      }
    })

    return res.data
  } catch (error) {
    console.error('Error fetching TypeDevice data:', error)
    throw error
  }
}

const TypeDeviceListApp = () => {
  const [TypeDeviceData, setTypeDeviceData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = async () => {
    try {
      const data = await getTypeDeviceData()

      console.log('Datostp', data)
      setTypeDeviceData(data)
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTypeDeviceData()

        console.log('Datos', data)
        setTypeDeviceData(data)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading TypeDevice data: {String(error)}</p>

  return <TypeDeviceListTable tableData={TypeDeviceData} reload={()=>reload()}/>
}

export default TypeDeviceListApp
