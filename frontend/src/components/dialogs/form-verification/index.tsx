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
  Tooltip,
  FormControlLabel,
  Switch,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify'

import TabList from '@mui/lab/TabList'

import CustomTextField from '@/@core/components/mui/TextField'
import axiosInstance from '@/utils/axiosInterceptor'
import JsonTreeBuilder from './treeBuilder'

const schema = yup.object().shape({
  nameEquipment: yup.string().notRequired()
})

const VerificationForm = ({ open, onClose, rowSelect }: any) => {
  const [id, setId] = useState(0)
  const [valueT, setValueT] = useState('itemsf')

  const [editData, setEditData] = useState<any>({
    nameEquipment: '1',
   
  })

  const [typeDeviceList, setTypeDeviceList] = useState<any[]>([])
  const [customersList, setCustomersList] = useState<any[]>([])
  const [plantillasList, setPlantillasList] = useState<any[]>([])
  const [disabledAdd, setDisabledAdd] = useState(true)
  const [equimentlist, setEquipmentList] = useState<any>([{id:'4521',equipment:{nom:''},groupsdata:[{idItem:'1',name:'Grupo 1',items:[{idItem:'1',name:'Item 1',value:'0',type:'number'}]}]}])

  const [formTemplate, setFormTemplate] = useState<any[]>()

  const [openCh, setOpenCh] = useState<boolean>(true)

  const handleClick = () => {
    setOpenCh(!openCh)
  }

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

      console.log('typeDeviceRes:', typeDeviceRes.data)
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
    defaultValues: {},
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
      toast.success('Hey 👋!', {
        position: 'top-right'
      })
      console.log('Plantilla guardado con éxito:', response.data)

      fetchOptions()

      // Aquí puedes redirigir o mostrar un mensaje de éxito

      setValue('productType', '')
      setValue('marca', '')
      setValue('modelo', '')
      setValue('nombreChequeo', '')
      setValue('tipoElement', '')

      reset()
      setId(0)
      setEditData({
        productType: '1',
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

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setValueT(newValue)

  const handleReset = () => {
   
    setValue('nameEquipment', '')
    
  }

  useEffect(() => {
    console.log('formTemplate:', formTemplate)
  }, [formTemplate])

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Plantila de verificación</DialogTitle>

      <DialogContent>
        
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Controller
              name='productType'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  value={
                    typeDeviceList.length > 0 && editData.productType
                      ? typeDeviceList.find(item => item.id === editData.productType).typeDevice
                      : ''
                  }
                  label='Tipo de dispositivo'
                  error={Boolean(errors.productType)}
                  helperText={errors.productType?.message}
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
                  onKeyUp={e => {
                    console.log('Check:', e.target.value)

                    if (e.target.value === '') {
                      setDisabledAdd(true)
                    } else {
                      setDisabledAdd(false)
                    }
                  }}
                  onBlur={e => {
                    setEditData({ ...editData, nombreChequeo: e.target.value })
                    setValue('nombreChequeo', e.target.value)
                  }}
                  label='Nombre del chequeo'
                  error={Boolean(errors.nombreChequeo)}
                  helperText={errors.nombreChequeo?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={8}>

          <Button variant='contained' color='success' className='mb-6' onClick={() => setEquipmentList(
            [...equimentlist, [
            {
              id:uuidv4(),
              equipment:{nom:''},
              groupsdata:[]
            }]])}>Agregar equipo</Button>
      
          {equimentlist && equimentlist.map((item: any, index: number) => (
            <div key={index}>

            <Card className="mt-5">
              <CardHeader title='Equipo' />

              <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name='nombreChequeo'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        onKeyUp={e => {
                          console.log('Check:', e.target.value)

                         
                        }}
                        onBlur={e => {
                          setEditData({ ...editData, nombreChequeo: e.target.value })
                          setValue('nombreChequeo', e.target.value)
                        }}
                        label='Nombre del equipo'
                        error={Boolean(errors.nombreChequeo)}
                        helperText={errors.nombreChequeo?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  SERIE:
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Controller
                    name='nombreChequeo'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                       
                        onBlur={e => {
                         
                        }}
                        label='Nombre del chequeo'
                        error={Boolean(errors.nombreChequeo)}
                        helperText={errors.nombreChequeo?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
               
                <JsonTreeBuilder />          

              </CardContent>
            </Card>

            
            </div>
                  ))}
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
      <ToastContainer />
    </Dialog>
  )
}

export default VerificationForm
