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
import { userMethods } from '@/utils/userMethods'

const schema = yup.object().shape({
  typeDevice: yup.string().required('El tipo de producto es obligatorio'),
  productCode: yup.string().required('El código de producto es obligatorio'),
  productName: yup.string().required('El nombre de producto es obligatorio'),
  brand: yup.string().required('La marca es obligatoria'),
  model: yup.string().required('El modelo es obligatorio'),
  licensePlate: yup.string().required('La matrícula es obligatoria'),

  //productClass: yup.string().required('La clase de producto es obligatoria'),
  classification: yup.string().required('La clasificación es obligatoria'),
  customer: userMethods.isRole('ADMIN') ? yup.string().notRequired() : yup.string().required('Cliente es requerido'),
  status: yup.string().required('El estado es obligatorio'),

  invimaRegister: yup.string().required('El registro de inventario es obligatorio'),
  origin: yup.string().required('El origen es obligatorio'),
  voltage: yup.string().required('El voltaje es obligatorio'),
  power: yup.string().required('La potencia es obligatoria'),
  frequency: yup.string().required('La frecuencia es obligatoria'),
  amperage: yup.string().required('La corriente es obligatoria'),
  purchaseDate: yup.string().required('La fecha de compra es obligatoria'),
  bookValue: yup.number().required('El valor en libros es obligatorio'),
  supplier: yup.string().required('El proveedor es obligatorio'),
  warranty: yup.string().required('La garantía es obligatoria'),
  warrantyStartDate: yup.string().required('La fecha de inicio de garantía es obligatoria'),
  warrantyEndDate: yup.string().required('La fecha de fin de garantía es obligatoria'),
  manual: yup.string().required('El manual es obligatorio'),
  periodicity: yup.string().required('La periodicidad es obligatoria'),
  location: yup.string().required('La ubicación es obligatoria'),
  placement: yup.string().required('La colocación es obligatoria')
})

const ProductForm = ({ open, onClose, rowSelect }: any) => {
  const [id, setId] = useState(0)
  const [valueT, setValueT] = useState('dispositivo')

  const [editData, setEditData] = useState<any>({
    typeDevice: '1',
    productCode: '',
    productName: '',
    brand: '',
    model: '',
    licensePlate: '',

    //productClass: '',
    classification: '',
    customer: 0,
    status: '1',
    invimaRegister: '',
    origin: '',
    voltage: '',
    power: '',
    frequency: '',
    amperage: '',
    purchaseDate: '',
    bookValue: 0,
    supplier: '',
    warranty: '',
    warrantyStartDate: '',
    warrantyEndDate: '',
    manual: '',
    periodicity: '',
    location: '',
    placement: ''
  })

  const [typeDeviceList, setTypeDeviceList] = useState<any[]>([])
  const [customersList, setCustomersList] = useState<any[]>([])

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [typeDeviceRes, customersRes] = await Promise.all([
        axios.get('http://localhost:8080/type-device', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('http://localhost:8080/customers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

      setTypeDeviceList(typeDeviceRes.data)
      setCustomersList(customersRes.data)

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
      typeDevice: '',
      productCode: '',
      productName: '',
      brand: '',
      model: '',
      licensePlate: '',

      //productClass: '',
      classification: '',
      customer: '',
      status: '1',
      invimaRegister: '',
      origin: '',
      voltage: '',
      power: '',
      frequency: '',
      amperage: '',
      purchaseDate: '',
      bookValue: 0,
      supplier: '',
      warranty: '',
      warrantyStartDate: '',
      warrantyEndDate: '',
      manual: '',
      periodicity: '',
      location: '',
      placement: ''
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    console.log('errors ', errors)
  }, [errors])

  const onSubmit = async (data: any) => {
    console.log('sunnii')

    try {
      const token = localStorage.getItem('AuthToken')

      console.log('token ', token)

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      // Si tienes un ID, significa que estás actualizando el usuario, de lo contrario, creas uno nuevo

      const method = id ? 'put' : 'post' // Actualización o Creación
      const apiUrl = id ? `http://localhost:8080/products/${id}` : 'http://localhost:8080/products' // Creación

      const response = await axios({
        method: method, // Usa 'put' para actualización o 'post' para creación
        url: apiUrl,
        data: {
          ...data,
          customer:
            userMethods.isRole('ADMIN') || userMethods.isRole('USER')
              ? userMethods.getUserLogin().customer?.id
              : data?.customer
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      // Procesar la respuesta
      if (response.data.result === 'success') {
        console.log('Product guardado con éxito:', response.data)

        // Aquí puedes redirigir o mostrar un mensaje de éxito
      } else {
        console.error('Error en la respuesta:', response.data.message)
      }

      setValue('typeDevice', '')
      setValue('productCode', '')
      setValue('productName', '')
      setValue('brand', '')
      setValue('model', '')
      setValue('licensePlate', '')

      //setValue('productClass', '')
      setValue('classification', '')
      setValue('customer', '')
      setValue('status', '1')

      //setValue('dateAdded', '')
      setValue('invimaRegister', '')
      setValue('origin', '')
      setValue('voltage', '')
      setValue('power', '')
      setValue('frequency', '')
      setValue('amperage', '')
      setValue('purchaseDate', '')
      setValue('bookValue', 0)
      setValue('supplier', '')
      setValue('warranty', '')
      setValue('warrantyStartDate', '')
      setValue('warrantyEndDate', '')
      setValue('manual', '')
      setValue('periodicity', '')
      setValue('location', '')
      setValue('placement', '')
      reset()
      setId(0)
      setEditData({
        typeDevice: '',
        productCode: '',
        productName: '',
        brand: '',
        model: '',
        licensePlate: '',

        //productClass: '',
        classification: '',
        customer: '',
        status: '1',

        //dateAdded: '',
        invimaRegister: '',
        origin: '',
        voltage: '',
        power: '',
        frequency: '',
        amperage: '',
        purchaseDate: '',
        bookValue: 0,
        supplier: '',
        warranty: '',
        warrantyStartDate: '',
        warrantyEndDate: '',
        manual: '',
        periodicity: '',
        location: '',
        placement: ''
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
      setValue('productCode', rowSelect.productCode)
      setValue('productName', rowSelect.productName)
      setValue('brand', rowSelect.brand)
      setValue('model', rowSelect.model)
      setValue('licensePlate', rowSelect.licensePlate)

      // setValue('productClass', rowSelect.productClass)
      setValue('classification', rowSelect.classification)
      setValue('customer', rowSelect.client)
      setValue('status', rowSelect.status)

      // setValue('dateAdded', rowSelect.dateAdded)
      setValue('invimaRegister', rowSelect.invimaRegister)
      setValue('origin', rowSelect.origin)
      setValue('voltage', rowSelect.voltage)
      setValue('power', rowSelect.power)
      setValue('frequency', rowSelect.frequency)
      setValue('amperage', rowSelect.amperage)
      setValue('purchaseDate', rowSelect.purchaseDate)
      setValue('bookValue', rowSelect.bookValue)
      setValue('supplier', rowSelect.supplier)
      setValue('warranty', rowSelect.warranty)
      setValue('warrantyStartDate', rowSelect.warrantyStartDate)
      setValue('warrantyEndDate', rowSelect.warrantyEndDate)
      setValue('manual', rowSelect.manual)
      setValue('periodicity', rowSelect.periodicity)
      setValue('location', rowSelect.location)
      setValue('placement', rowSelect.placement)
    }
  }, [rowSelect, setValue])

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setValueT(newValue)

  const handleReset = () => {
    setEditData({
      typeDevice: '1',
      productCode: '',
      productName: '',
      brand: '',
      model: '',
      licensePlate: '',

      // productClass: '',
      classification: '',
      customer: '',
      status: '1',
      dateAdded: '',
      invimaRegister: '',
      origin: '',
      voltage: '',
      power: '',
      frequency: '',
      amperage: '',
      purchaseDate: '',
      bookValue: 0,
      supplier: '',
      warranty: '',
      warrantyStartDate: '',
      warrantyEndDate: '',
      manual: '',
      periodicity: '',
      location: '',
      placement: ''
    })

    setValue('typeDevice', '')
    setValue('productCode', '')
    setValue('productName', '')
    setValue('brand', '')
    setValue('model', '')
    setValue('licensePlate', '')

    //setValue('productClass', '')
    setValue('classification', '')
    setValue('customer', '')
    setValue('status', '1')

    //setValue('dateAdded', '')
    setValue('invimaRegister', '')
    setValue('origin', '')
    setValue('voltage', '')
    setValue('power', '')
    setValue('frequency', '')
    setValue('amperage', '')
    setValue('purchaseDate', '')
    setValue('bookValue', 0)
    setValue('supplier', '')
    setValue('warranty', '')
    setValue('warrantyStartDate', '')
    setValue('warrantyEndDate', '')
    setValue('manual', '')
    setValue('periodicity', '')
    setValue('location', '')
    setValue('placement', '')
  }

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Agregar nuevo producto</DialogTitle>

      <DialogContent>
        <Card>
          <TabContext value={valueT}>
            <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
              <Tab label='Dispositivo' value='dispositivo' />
              <Tab label='Datos Tecnicos' value='datos_tecnicos' />
              <Tab label='Información comercial' value='info_comercial' />
              <Tab label='Periodicidad' value='periodicidad' />
            </TabList>

            <CardContent>
              <TabPanel value='dispositivo'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='typeDevice'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          value={editData?.typeDevice ? editData.typeDevice : '1'}
                          onChange={e => {
                            if (editData) {
                              setEditData({
                                ...editData,
                                typeDevice: typeDeviceList.find(item => item.id === e.target.value).id
                              })
                              setValue('typeDevice', typeDeviceList.find(item => item.id === e.target.value)?.id)
                            }
                          }}
                          label='Tipo dispositivo'
                          error={Boolean(errors.typeDevice)}
                          helperText={errors.typeDevice?.message}
                        >
                          {typeDeviceList.map((item: any) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.typeDevice}
                              </MenuItem>
                            )
                          })}
                        </CustomTextField>
                      )}
                    />

                    <Controller
                      name='productCode'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Número de serie'
                          error={Boolean(errors.productCode)}
                          helperText={errors.productCode?.message}
                        />
                      )}
                    />

                    <Controller
                      name='productName'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Nombre'
                          error={Boolean(errors.productName)}
                          helperText={errors.productName?.message}
                        />
                      )}
                    />

                    <Controller
                      name='brand'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Marca'
                          error={Boolean(errors.brand)}
                          helperText={errors.brand?.message}
                        />
                      )}
                    />

                    <Controller
                      name='model'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Modelo'
                          error={Boolean(errors.model)}
                          helperText={errors.model?.message}
                        />
                      )}
                    />
                    <Controller
                      name='licensePlate'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Placa'
                          error={Boolean(errors.licensePlate)}
                          helperText={errors.licensePlate?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='classification'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          value={editData?.classification ? editData?.classification : '1'}
                          onChange={e => {
                            setEditData({ ...editData, classification: e.target.value })
                            setValue('classification', e.target.value)
                          }}
                          label='Clasificación'
                          error={Boolean(errors.classification)}
                          helperText={errors.classification?.message}
                        >
                          {[
                            { id: 1, name: 'Apoyo' },
                            { id: 2, name: 'Biomedico' }
                          ].map(item => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />

                    {(userMethods.isRole('SUPERADMIN') || userMethods.isRole('BIOMEDICAL')) && (
                      <Controller
                        name='customer'
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            value={editData?.customer ? editData?.customer : '1'}
                            onChange={e => {
                              setEditData({ ...editData, customer: e.target.value })
                              setValue('customer', e.target.value)
                            }}
                            label='Cliente'
                            error={Boolean(errors.customer)}
                            helperText={errors.customer?.message}
                          >
                            {customersList.map(item => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    )}

                    <Controller
                      name='location'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Sede'
                          error={Boolean(errors.location)}
                          helperText={errors.location?.message}
                        />
                      )}
                    />

                    <Controller
                      name='placement'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Ubicación'
                          error={Boolean(errors.placement)}
                          helperText={errors.placement?.message}
                        />
                      )}
                    />

                    <Controller
                      name='invimaRegister'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Registro Invima'
                          error={Boolean(errors.invimaRegister)}
                          helperText={errors.invimaRegister?.message}
                        />
                      )}
                    />

                    <Controller
                      name='origin'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Procedencia'
                          error={Boolean(errors.origin)}
                          helperText={errors.origin?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* datos_tecnicos */}
              <TabPanel value='datos_tecnicos'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='voltage'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Voltaje'
                          error={Boolean(errors.voltage)}
                          helperText={errors.voltage?.message}
                        />
                      )}
                    />
                    <Controller
                      name='power'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Potencia'
                          error={Boolean(errors.power)}
                          helperText={errors.power?.message}
                        />
                      )}
                    />
                    <Controller
                      name='frequency'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Frecuencia'
                          error={Boolean(errors.frequency)}
                          helperText={errors.frequency?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='amperage'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Amperios'
                          error={Boolean(errors.amperage)}
                          helperText={errors.amperage?.message}
                        />
                      )}
                    />

                    <Controller
                      name='manual'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Manual de usuario'
                          error={Boolean(errors.manual)}
                          helperText={errors.manual?.message}
                        />
                      )}
                    />

                    <Controller
                      name='status'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          value={editData?.status ? editData.status : '1'}
                          onChange={e => {
                            if (editData) {
                              setEditData({
                                ...editData,
                                status: e.target.value
                              })
                              setValue('status', e.target.value)
                            }
                          }}
                          label='Estado'
                          error={Boolean(errors.status)}
                          helperText={errors.status?.message}
                        >
                          {[
                            { id: 1, name: 'Activo' },
                            { id: 2, name: 'Inactivo' }
                          ].map((item: any) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            )
                          })}
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* info_comercial */}
              <TabPanel value='info_comercial'>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='purchaseDate'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha de compra'
                          error={Boolean(errors.purchaseDate)}
                          helperText={errors.purchaseDate?.message}
                        />
                      )}
                    />
                    <Controller
                      name='bookValue'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Valor contable'
                          error={Boolean(errors.bookValue)}
                          helperText={errors.bookValue?.message}
                        />
                      )}
                    />

                    <Controller
                      name='warrantyStartDate'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha inicio garantia'
                          error={Boolean(errors.warrantyStartDate)}
                          helperText={errors.warrantyStartDate?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='warranty'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Garantia'
                          error={Boolean(errors.warranty)}
                          helperText={errors.warranty?.message}
                        />
                      )}
                    />
                    <Controller
                      name='supplier'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Proveedor'
                          error={Boolean(errors.supplier)}
                          helperText={errors.supplier?.message}
                        />
                      )}
                    />
                    <Controller
                      name='warrantyEndDate'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha fin garantia'
                          error={Boolean(errors.warrantyEndDate)}
                          helperText={errors.warrantyEndDate?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* periodicidad */}
              <TabPanel value='periodicidad'>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name='periodicity'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          value={editData?.periodicity ? editData.periodicity : '1'}
                          onChange={e => {
                            if (editData) {
                              setEditData({
                                ...editData,
                                periodicity: e.target.value
                              })
                              setValue('periodicity', e.target.value)
                            }
                          }}
                          label='Periodicidad'
                          error={Boolean(errors.periodicity)}
                          helperText={errors.periodicity?.message}
                        >
                          {[
                            { id: 1, name: '1 Mes' },
                            { id: 2, name: '2 Meses' },
                            { id: 3, name: '3 Meses' },
                            { id: 4, name: '4 Meses' },
                            { id: 5, name: '5 Meses' },
                            { id: 6, name: '6 Meses' },
                            { id: 7, name: '7 Meses' },
                            { id: 8, name: '8 Meses' },
                            { id: 9, name: '9 Meses' },
                            { id: 10, name: '10 Meses' },
                            { id: 11, name: '11 Meses' },
                            { id: 12, name: '12 Meses' }
                          ].map((item: any) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            )
                          })}
                        </CustomTextField>
                      )}
                    />
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

export default ProductForm
