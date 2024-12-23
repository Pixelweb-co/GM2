'use client'
import type { SyntheticEvent } from 'react'
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  MenuItem,
  Grid,
  CardContent,
  Card,
  Tab
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import TabList from '@mui/lab/TabList'

import CustomTextField from '@/@core/components/mui/TextField'

const schema = yup.object().shape({
  typeDevice: yup.string().notRequired(),
  marca: yup.string().required('La marca es obligatoria'),
  modelo: yup.string().required('El modelo es obligatorio'),
  nombreChequeo: yup.string().required('El nombre del chequeo es obligatorio'),
  tipoElemento: yup.string().required('El tipo de elemento es obligatorio')
})

const CheckListForm = ({ open, onClose, rowSelect }: any) => {
  const [id, setId] = useState(0)
  const [valueT, setValueT] = useState('itemsf')

  const [editData, setEditData] = useState<any>({
    typeDevice: '1',
    marca: '',
    modelo: '',
    nombreChequeo: '',
    tipoElemento: ''
  })

  const [typeDeviceList, setTypeDeviceList] = useState<any[]>([])
  const [customersList, setCustomersList] = useState<any[]>([])
  const [plantillasList, setPlantillasList] = useState<any[]>([])

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [typeDeviceRes, plantillasRes] = await Promise.all([
        axios.get('http://localhost:8080/type-device', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('http://localhost:8080/plantillas', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

      setTypeDeviceList(typeDeviceRes.data)
      setPlantillasList(plantillasRes.data)

      return true
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      typeDevice: '1',
      marca: '',
      modelo: '',
      nombreChequeo: '',
      tipoElemento: ''
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    console.log('errors ', errors)
  }, [errors])

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('AuthToken')

      console.log('token ', token)

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      // Si tienes un ID, significa que estás actualizando el usuario, de lo contrario, creas uno nuevo

      const method = 'post' // Actualización o Creación
      const apiUrl = 'http://localhost:8080/plantillas' // Creación

      const response = await axios({
        method: method, // Usa 'put' para actualización o 'post' para creación
        url: apiUrl,
        data: {
          marca: data.marca,
          modelo: data.modelo,
          nom: data.nombreChequeo,
          tipo: data.tipoElemento,
          tipoElement: rowSelect.productType
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      // Procesar la respuesta
      if (response.data.result === 'success') {
        console.log('Plantilla guardado con éxito:', response.data)
        fetchOptions()

        // Aquí puedes redirigir o mostrar un mensaje de éxito
      } else {
        console.error('Error en la respuesta:', response.data.message)
      }

      setValue('typeDevice', '')
      setValue('marca', '')
      setValue('modelo', '')
      setValue('nombreChequeo', '')
      setValue('tipoElemento', '')

      reset()
      setId(0)
      setEditData({
        typeDevice: '1',
        marca: '',
        modelo: '',
        nombreChequeo: '',
        tipoElemento: ''
      })

      onClose()
    } catch (error) {
      console.error('Error al enviar los datos:', error)
    }
  }

  useEffect(() => {
    if (rowSelect.id) {
      console.log('rowSelect:', rowSelect)
      setEditData(rowSelect)
      setId(rowSelect.id)
      setValue('typeDevice', rowSelect.typeDevice)
      setValue('marca', rowSelect.brand)
      setValue('modelo', rowSelect.model)
      setValue('nombreChequeo', rowSelect.productName)
      setValue('tipoElemento', rowSelect.productCode)
    }
  }, [rowSelect, setValue])

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setValueT(newValue)

  const handleReset = () => {
    setEditData({
      typeDevice: '1',
      marca: '',
      modelo: '',
      nombreChequeo: '',
      tipoElemento: ''
    })

    setValue('typeDevice', '')
    setValue('marca', '')
    setValue('modelo', '')
    setValue('nombreChequeo', '')
    setValue('tipoElemento', '')
  }

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Plantila de checkeo</DialogTitle>

      <DialogContent>
        <Card>
          <TabContext value={valueT}>
            <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
              <Tab label='Ingreso items' value='itemsf' />
              <Tab label='Formulario' value='formulario' />
            </TabList>

            <CardContent>
              <TabPanel value='itemsf'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='typeDevice'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          fullWidth
                          value={
                            editData.productType
                              ? typeDeviceList.find(item => item.id === parseInt(editData.productType)).typeDevice
                              : ''
                          }
                          label='Tipo de dispositivo'
                          error={Boolean(errors.typeDevice)}
                          helperText={errors.typeDevice?.message}
                        />
                      )}
                    />

                    <Controller
                      name='marca'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          className='mt-4'
                          fullWidth
                          label='Marca'
                          error={Boolean(errors.marca)}
                          helperText={errors.marca?.message}
                        />
                      )}
                    />

                    <Controller
                      name='modelo'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          className='mt-4'
                          fullWidth
                          label='Modelo'
                          error={Boolean(errors.modelo)}
                          helperText={errors.modelo?.message}
                        />
                      )}
                    />

                    <Controller
                      name='nombreChequeo'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          className='mt-4'
                          fullWidth
                          label='Nombre del chequeo'
                          error={Boolean(errors.nombreChequeo)}
                          helperText={errors.nombreChequeo?.message}
                        />
                      )}
                    />

                    <Controller
                      name='tipoElemento'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          value={editData?.tipoElemento ? editData?.tipoElemento : '1'}
                          onChange={e => {
                            setEditData({ ...editData, tipoElemento: e.target.value })
                            setValue('tipoElemento', e.target.value)
                          }}
                          label='Tipo elemento'
                          error={Boolean(errors.tipoElemento)}
                          helperText={errors.tipoElemento?.message}
                        >
                          {[
                            { id: 1, name: 'Caja de texto' },
                            { id: 2, name: 'Caja de checkeo' }
                          ].map(item => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* datos_tecnicos */}
              <TabPanel value='formulario'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {plantillasList.length > 0 &&
                      plantillasList
                        .filter(plantilla => plantilla.tipoElement === parseInt(editData.productType))
                        .map((plantillar, index) => (
                          <div key={index}>
                            {plantillar.tipo === 'text' && (
                              <Controller
                                name='tipoElemento'
                                control={control}
                                render={({ field }) => (
                                  <CustomTextField className='mt-4' fullWidth label={plantillar.nom} />
                                )}
                              />
                            )}

                            {plantillar.tipo === 'check' && (
                              <Controller
                                name='tipoElemento'
                                control={control}
                                render={({ field }) => (
                                  <CustomTextField type='checkbox' className='mt-4' fullWidth label={plantillar.nom} />
                                )}
                              />
                            )}
                          </div>
                        ))}
                  </Grid>
                </Grid>
              </TabPanel>
            </CardContent>
          </TabContext>
        </Card>
      </DialogContent>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <DialogActions>
          <Button color='error' onClick={handleReset}>
            Limpiar
          </Button>
          <Button onClick={onClose} color='secondary'>
            Cerrar
          </Button>
          <Button type='submit' variant='contained' color='primary'>
            Guardar datos
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CheckListForm
