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
  Tab,
  Divider,
  Typography,
  CardHeader,
  IconButton,
  Tooltip
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import TabList from '@mui/lab/TabList'

import CustomTextField from '@/@core/components/mui/TextField'
import axiosInstance from '@/utils/axiosInterceptor'

const schema = yup.object().shape({
  typeDevice: yup.string().notRequired(),
  marca: yup.string().required('La marca es obligatoria'),
  modelo: yup.string().required('El modelo es obligatorio'),
  nombreChequeo: yup.string().required('El nombre del chequeo es obligatorio'),
  tipoElement: yup.string().required('El tipo de elemento es obligatorio')
})

const CheckListForm = ({ open, onClose, rowSelect }: any) => {
  const [id, setId] = useState(0)
  const [valueT, setValueT] = useState('itemsf')

  const [editData, setEditData] = useState<any>({
    typeDevice: '1',
    marca: '',
    modelo: '',
    nombreChequeo: '',
    tipoElement: ''
  })

  const [typeDeviceList, setTypeDeviceList] = useState<any[]>([])
  const [customersList, setCustomersList] = useState<any[]>([])
  const [plantillasList, setPlantillasList] = useState<any[]>([])

  const [formTemplate, setFormTemplate] = useState<any[]>([])

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [typeDeviceRes] = await Promise.all([
        axios.get('http://localhost:8080/type-device', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

      setTypeDeviceList(typeDeviceRes.data)


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
      tipoElement: ''
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    console.log('errors ', errors)
  }, [errors])

  const onSubmit = async (data: any) => {
    try {

      // Si tienes un ID, significa que estás actualizando el usuario, de lo contrario, creas uno nuevo

      const method = 'post' // Actualización o Creación
      const apiUrl = 'http://localhost:8080/plantillas' // Creación

      const response = await axiosInstance({
        method: method, // Usa 'put' para actualización o 'post' para creación
        url: apiUrl,
        data: {
          marca: data.marca,
          modelo: data.modelo,

          tipoElement: rowSelect.productType,
          campos: formTemplate // Incluye los campos dinámicos generados
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
      setValue('tipoElement', '')

      reset()
      setId(0)
      setEditData({
        typeDevice: '1',
        marca: '',
        modelo: '',
        nombreChequeo: '',
        tipoElement: '0'
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
      setValue('tipoElement', rowSelect.productCode)


      const getTemplates = async (item:any) => {

        console.error('item:', item);

        try {
          const response = await axiosInstance.get(`/plantillas?marca=${item.brand}&modelo=${item.model}&tipoElement=${item.productType}`);

          console.log('Datos recibidostp :', response.data);

          setFormTemplate(response.data.map((item:any) => ({ nom: item.nom, tipo: (item.tipo).toString() })));

        } catch (error) {

          console.error('Error al obtener los datos:', error);
        }

      }

      getTemplates(rowSelect)




    }
  }, [rowSelect, setValue])

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setValueT(newValue)

  const handleReset = () => {
    setEditData({
      typeDevice: '1',
      marca: '',
      modelo: '',
      nombreChequeo: '',
      tipoElement: ''
    })

    setValue('typeDevice', '')
    setValue('marca', '')
    setValue('modelo', '')
    setValue('nombreChequeo', '')
    setValue('tipoElement', '')
  }

  useEffect(() => {

    console.log('formTemplate:', formTemplate);

  }, [formTemplate]);

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Plantila de checkeo</DialogTitle>

      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
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

            <Typography variant='h6' className='mt-4'>
              Agregar campo
            </Typography>
            <Divider className='mt-4' />

            <Controller
              name='nombreChequeo'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  className='mt-4'
                  fullWidth
                  onChange={e => {
                    setEditData({ ...editData, nombreChequeo: e.target.value })
                    setValue('nombreChequeo', e.target.value)
                  }}
                  label='Nombre del chequeo'
                  error={Boolean(errors.nombreChequeo)}
                  helperText={errors.nombreChequeo?.message}
                />
              )}
            />

            <Controller
              name='tipoElement'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  className='mt-4'
                  select
                  fullWidth
                  value={editData?.tipoElement ? editData?.tipoElement : '1'}
                  onChange={e => {
                    setEditData({ ...editData, tipoElement: e.target.value })
                    setValue('tipoElement', e.target.value)
                  }}
                  label='Tipo elemento'
                  error={Boolean(errors.tipoElement)}
                  helperText={errors.tipoElement?.message}
                >
                  {[
                    { id: '1', name: 'Selecciona un control' },
                    { id: '2', name: 'Caja de texto' },
                    { id: '3', name: 'Caja de checkeo' }
                  ].map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />

            <Button
              type='button'
              variant='contained'
              color='success'
              className='mt-4'
              onClick={() => {
                console.log('editData', editData)

                setFormTemplate([...formTemplate, { nom: editData.nombreChequeo, tipo: editData.tipoElement }])
              }}
            >
              Agregar campo
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title='Formulario de checkeo' />

              <CardContent>
                {formTemplate.length > 0 &&
                  formTemplate.map((plantillar, index) => (
                    <div key={index}>
                      <Grid container spacing={2}>
                        <Grid item xs={10} sm={10}>
                          {plantillar.tipo == 2 && (
                            <Controller
                              name='tipoElementDt'
                              control={control}
                              render={({ field }) => (
                                <CustomTextField className='mt-4' fullWidth label={plantillar.nom} />
                              )}
                            />
                          )}

                          {plantillar.tipo == 3 && (
                            <Controller
                              name='tipoElementcx'
                              control={control}
                              render={({ field }) => (
                                <CustomTextField type='checkbox' className='mt-4' label={plantillar.nom} />
                              )}
                            />
                          )}
                        </Grid>

                        <Grid item xs={2} sm={2}>
                          <Tooltip title='Eliminar campo' placement='top'>
                          <IconButton
                          className='mt-8'
                            onClick={() => {
                              setFormTemplate(formTemplate.filter((item, i) => i !== index))
                            }}
                          >
                            <i className='tabler-trash text-textSecondary' color='danger'/>
                          </IconButton>
                            </Tooltip>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>


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
