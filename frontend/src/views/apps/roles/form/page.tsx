'use client'

// React Imports
import { useState, useEffect } from 'react'
import type { SyntheticEvent } from 'react'

import axios from 'axios'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import MenuItem from '@mui/material/MenuItem'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Divider from '@mui/material/Divider'

// React Hook Form and Yup
import { useForm, Controller, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type FormDataType = {
  firstName: string
  lastName: string
  birthDate: Date | null
  phoneNumber: string
  email: string
  eps: string
  cajacompensacion: string
  pension: string
  cesantia: string
  arl: string
  contractType: string
  contractStartDate: Date | null
  contractEndDate: Date | null
  salary: number | string
  cargo: string
  documents: {
    hojaDeVida: File | null
    cedulaFrontal: File | null
    cedulaTrasera: File | null
    foto: File | null
    otros: File[] // Varios otros documentos
  }
}

const schema = yup.object().shape({
  firstName: yup.string().required('Nombre es requerido'),
  lastName: yup.string().required('Apellido es requerido'),
  phoneNumber: yup
    .string()
    .required('Número de teléfono es requerido')
    .matches(/^\d{10}$/, 'Número de teléfono no es válido'),
  email: yup.string().email('Email no válido').required('Email es requerido'),
  eps: yup.string().required('EPS es requerida'),
  cajacompensacion: yup.string().required('Caja de compensación es requerida'),
  pension: yup.string().required('Pensión es requerida'),
  cesantia: yup.string().required('Cesantías es requerido'),
  arl: yup.string().required('ARL es requerida'),
  contractType: yup.string().required('Tipo de contrato es requerido'),
  contractStartDate: yup.date().required('Fecha de inicio es requerida'),
  contractEndDate: yup.date().required('Fecha de fin es requerida'),
  salary: yup.number().typeError('El salario debe ser un número').required('Salario es requerido'),
  cargo: yup.string().required('Cargo es requerido')
})

const FormEmploye = () => {
  const [value, setValue] = useState('personal_info')

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    birthDate: null,
    phoneNumber: '',
    email: '',
    eps: '',
    cajacompensacion: '',
    pension: '',
    cesantia: '',
    arl: '',
    contractType: '',
    contractStartDate: null,
    contractEndDate: null,
    salary: '',
    cargo: '',
    documents: {
      hojaDeVida: null,
      cedulaFrontal: null,
      cedulaTrasera: null,
      foto: null,
      otros: []
    }
  })

  const [epsList, setEpsList] = useState([])
  const [cajasList, setCajasList] = useState([])
  const [pensionList, setPensionList] = useState([])
  const [cesantiaList, setCesantiaList] = useState([])
  const [arlList, setArlList] = useState([])
  const [contractTypes, setContractTypes] = useState([])
  const [cargoList, setCargoList] = useState([]) // Lista de cargos

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: formData
  })

  const onSubmit = async (data: FormDataType) => {
    try {
      const formData = new FormData()

      // Agregar los campos simples al FormData
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('birthDate', data.birthDate ? data.birthDate.toISOString() : '')
      formData.append('phoneNumber', data.phoneNumber)
      formData.append('email', data.email)
      formData.append('eps', data.eps)
      formData.append('pension', data.pension)
      formData.append('cesantia', data.cesantia)
      formData.append('arl', data.arl)
      formData.append('contractType', data.contractType)
      formData.append('contractStartDate', data.contractStartDate ? data.contractStartDate.toISOString() : '')
      formData.append('contractEndDate', data.contractEndDate ? data.contractEndDate.toISOString() : '')
      formData.append('salary', data.salary.toString())
      formData.append('cargo', data.cargo)

      // // Agregar los archivos al FormData
      // if (data.documents.hojaDeVida) formData.append('hojaDeVida', data.documents.hojaDeVida)
      // if (data.documents.cedulaFrontal) formData.append('cedulaFrontal', data.documents.cedulaFrontal)
      // if (data.documents.cedulaTrasera) formData.append('cedulaTrasera', data.documents.cedulaTrasera)
      // if (data.documents.foto) formData.append('foto', data.documents.foto)

      // // Agregar los archivos múltiples (otros documentos)
      // if (data.documents.otros && data.documents.otros.length > 0) {
      //   data.documents.otros.forEach((file, index) => {
      //     formData.append(`otros[${index}]`, file)
      //   })
      // }

      // Realizar la solicitud POST usando axios
      const response = await axios.post('http://localhost:8080/api/empleados', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Respuesta del servidor:', response.data)
      alert('Formulario enviado exitosamente')
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      alert('Ocurrió un error al enviar el formulario')
    }
  }

  const fetchOptions = async () => {
    try {
      const [epsRes, pensionRes, cesantiaRes, arlRes, cajasRes, contractTypesRes, cargoRes] = await Promise.all([
        axios.get('http://localhost:8080/api/eps'),
        axios.get('http://localhost:8080/api/pensiones'),
        axios.get('http://localhost:8080/api/cesantias'),
        axios.get('http://localhost:8080/api/arls'),
        axios.get('http://localhost:8080/api/cajas'),

        axios.get('http://localhost:8080/api/tipocontratos'),
        axios.get('http://localhost:8080/api/cargos') // Obtención de los cargos
      ])

      console.log('data', epsRes.data)
      setEpsList(epsRes.data)
      setCajasList(cajasRes.data)
      setPensionList(pensionRes.data)
      setCesantiaList(cesantiaRes.data)
      setArlList(arlRes.data)

      setContractTypes(contractTypesRes.data)
      setCargoList(cargoRes.data)
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  const handleTabChange = (event: SyntheticEvent, newValue: string) => setValue(newValue)

  const handleChange = (field: keyof FormDataType, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      birthDate: null,
      phoneNumber: '',
      email: '',
      eps: '',
      cajacompensacion: '',
      pension: '',
      cesantia: '',
      arl: '',
      contractType: '',
      contractStartDate: null,
      contractEndDate: null,
      salary: '',
      cargo: '',
      documents: {
        hojaDeVida: null,
        cedulaFrontal: null,
        cedulaTrasera: null,
        foto: null,
        otros: []
      }
    })
  }

  const handleFileChange = (
    documentType: keyof FormDataType['documents'],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]

      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [documentType]: file
        }
      })
    }
  }

  const handleOtherFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)

      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          otros: files
        }
      })
    }
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList variant='scrollable' onChange={handleTabChange} className='border-be'>
          <Tab label='Información Personal' value='personal_info' />
          <Tab label='Aportes Laborales' value='labor_contributions' />
          <Tab label='Contrato' value='contract' />
          <Tab label='Documentos' value='documents' />
        </TabList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <TabPanel value='personal_info'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstName'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Nombre'
                        {...field}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lastName'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Apellido'
                        {...field}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='birthDate'
                    control={control}
                    render={({ field }) => (
                      <AppReactDatepicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        customInput={<CustomTextField fullWidth label='Fecha de Nacimiento' />}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Número de Teléfono'
                        {...field}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Email'
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Aportes Laborales */}
            <TabPanel value='labor_contributions'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='eps'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='EPS'
                        {...field}
                        error={!!errors.eps}
                        helperText={errors.eps?.message}
                      >
                        {epsList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='cajacompensacion'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Caja de compensación'
                        {...field}
                        error={!!errors.cajacompensacion}
                        helperText={errors.cajacompensacion?.message}
                      >
                        {cajasList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='pension'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Pensión'
                        {...field}
                        error={!!errors.pension}
                        helperText={errors.pension?.message}
                      >
                        {pensionList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='cesantia'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Cesantías'
                        {...field}
                        error={!!errors.cesantia}
                        helperText={errors.cesantia?.message}
                      >
                        {cesantiaList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='arl'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='ARL'
                        {...field}
                        error={!!errors.arl}
                        helperText={errors.arl?.message}
                      >
                        {arlList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Contrato */}
            <TabPanel value='contract'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contractType'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Tipo de Contrato'
                        {...field}
                        error={!!errors.contractType}
                        helperText={errors.contractType?.message}
                      >
                        {contractTypes.map((item: { id: string; tipo_contrato: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.tipo_contrato}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contractStartDate'
                    control={control}
                    render={({ field }) => (
                      <AppReactDatepicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        customInput={<CustomTextField fullWidth label='Fecha de Inicio' />}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='contractEndDate'
                    control={control}
                    render={({ field }) => (
                      <AppReactDatepicker
                        selected={field.value}
                        onChange={(date: Date | null) => field.onChange(date)}
                        customInput={<CustomTextField fullWidth label='Fecha de Fin' />}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='salary'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Salario'
                        type='number'
                        {...field}
                        error={!!errors.salary}
                        helperText={errors.salary?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='cargo'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Cargo'
                        {...field}
                        error={!!errors.cargo}
                        helperText={errors.cargo?.message}
                      >
                        {cargoList.map((item: { id: string; nombre: string }) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombre}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Documentos */}
            <TabPanel value='documents'>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <input type='file' onChange={e => handleFileChange('hojaDeVida', e)} />
                  <input type='file' onChange={e => handleFileChange('cedulaFrontal', e)} />
                  <input type='file' onChange={e => handleFileChange('cedulaTrasera', e)} />
                  <input type='file' onChange={e => handleFileChange('foto', e)} />
                  <input type='file' multiple onChange={handleOtherFilesChange} />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>

          <CardActions className='justify-between'>
            <Button variant='outlined' color='error' onClick={handleReset}>
              Limpiar
            </Button>
            <Button type='submit' variant='contained'>
              Guardar
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

export default FormEmploye
