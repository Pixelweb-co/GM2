'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, useFormState } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import axios from 'axios'
import { MenuItem, Checkbox, FormControlLabel, Grid } from '@mui/material'

import { AuthManager } from '@/utils/authManager'
import CustomTextField from '@core/components/mui/TextField'
import { CustomersType } from '@/types/apps/customerType'
import { RolesType } from '@/types/apps/roleType'
import Roles from '@/components/views/apps/roles'

export type UsersType = {
  id: string
  username: string
  email: string
  accountNoExpired: boolean
  accountNoLocked: boolean
  credentialNoExpired: boolean
  customer: {
    id: string
    name: string
  }
  roles: Array<{
    id: string
    roleEnum: string
  }>
  enabled: boolean
}

const RegisterV3 = ({ id }: { id?: string }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [customersList, setCustomersList] = useState<CustomersType[]>([])
  const [roleList, setRoleList] = useState<RolesType[]>([])
  const [userData, setUserData] = useState<UsersType | undefined>(undefined)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomersType | undefined>(undefined)
  const [selectedRole, setSelectedRole] = useState<RolesType | undefined>(undefined)

  const handleCustomerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCustomer(event.target.value as CustomersType)
  }

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedRole(event.target.value as RolesType)
  }

  const fetchOptions = async () => {
    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [customersRes, rolesRes] = await Promise.all([
        axios.get('http://localhost:8080/customers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('http://localhost:8080/roles', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

      setCustomersList(customersRes.data)
      setRoleList(rolesRes.data)

      if (id) {
        const userRes = await axios.get(`http://localhost:8080/users/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        setUserData(userRes.data)
      }
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  useEffect(() => {
    fetchOptions()
  }, [id])

  const handleClickShowPassword = () => setIsPasswordShown(prev => !prev)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(prev => !prev)

  const schema = yup.object().shape({
    customer: yup.string().required('Cliente es requerido'),
    role: yup.string().when('userData', {
      is: (userData: UsersType | undefined) => !userData,
      then: schema => schema.required('Rol es requerido'),
      otherwise: schema => schema
    }),
    username: yup.string().when('userData', {
      is: (userData: UsersType | undefined) => !userData, // Solo valida si no está en modo edición
      then: schema =>
        schema
          .required('El nombre de usuario es obligatorio')
          .test('username-exists', 'El nombre de usuario ya está en uso', async value => {
            if (!value) return false

            try {
              const response = await AuthManager.validateUsername({ username: value })

              return response.isAvailable
            } catch {
              return false
            }
          }),
      otherwise: schema => schema // No aplica ninguna validación
    }),
    email: yup
      .string()
      .email('El correo electrónico no tiene un formato válido')
      .when('userData', {
        is: (userData: UsersType | undefined) => !userData, // Solo valida si no está en modo edición
        then: schema =>
          schema
            .required('El correo electrónico es obligatorio')
            .test('email-exists', 'El correo electrónico ya está en uso', async value => {
              if (!value) return false

              try {
                const response = await AuthManager.validateEmail({ email: value })

                return response.isAvailable
              } catch {
                return false
              }
            }),
        otherwise: schema => schema // No aplica ninguna validación
      }),
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(/[@$!%*?&]/, 'Debe contener al menos un carácter especial')
      .required('La contraseña es obligatoria'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es obligatoria'),
    credentialNoExpired: yup.boolean(),
    accountNoExpired: yup.boolean(),
    accountNoLocked: yup.boolean(),
    enabled: yup.boolean()
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: UsersType) => {
    try {
      const roleData = {
        ...data,
        roleRequest: {
          roleListName: ['ADMIN']
        }
      }

      if (userData) {
        const response = await axios.put(`http://localhost:8080/users/${userData.id}`, roleData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
          }
        })

        console.log('Usuario actualizado:', response)
      } else {
        const response = await AuthManager.register(roleData)

        console.log('Registro exitoso:', response)
      }
    } catch (error) {
      console.error('Error al registrar o actualizar:', error)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <Typography variant='h4'>{userData ? 'Editar Usuario' : 'Agregar Usuario'}</Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off' className='flex flex-col gap-6'>
            <CustomTextField
              select
              fullWidth
              label='Cliente'
              placeholder='Selecciona un cliente'
              value={selectedCustomer} // Usar el estado para el valor del select
              onChange={handleCustomerChange} // Manejar el cambio de selección
              {...register('customer')}
              error={!!errors.customer}
              disabled={!!userData?.id}
              helperText={errors.customer?.message}
            >
              {customersList
                .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
                .map((item: { id: string; name: string }) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </CustomTextField>

            <CustomTextField
              select
              fullWidth
              label='Rol'
              placeholder='Selecciona un rol'
              value={selectedRole} // Usar el estado para el valor del select
              onChange={handleRoleChange} // Manejar el cambio de selección
              {...register('role')}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              {roleList
                .sort((a: { roleEnum: string }, b: { roleEnum: string }) => a.roleEnum.localeCompare(b.roleEnum))
                .map((item: { id: string; roleEnum: string }) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.roleEnum}
                  </MenuItem>
                ))}
            </CustomTextField>

            <CustomTextField
              {...register('username')}
              fullWidth
              label='Usuario'
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <CustomTextField
              {...register('email')}
              fullWidth
              label='Correo electrónico'
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <CustomTextField
              {...register('password')}
              fullWidth
              type={isPasswordShown ? 'text' : 'password'}
              label='Contraseña'
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>{isPasswordShown ? 'Hide' : 'Show'}</IconButton>
                  </InputAdornment>
                )
              }}
            />

            <CustomTextField
              {...register('confirmPassword')}
              fullWidth
              type={isConfirmPasswordShown ? 'text' : 'password'}
              label='Confirmar contraseña'
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowConfirmPassword}>
                      {isConfirmPasswordShown ? 'Hide' : 'Show'}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox {...register('enabled')} />} label='Activo' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox {...register('accountNoLocked')} />} label='Cuenta bloqueada' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox {...register('accountNoExpired')} />} label='Cuenta expirada' />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={<Checkbox {...register('credentialNoExpired')} />}
                  label='Credenciales expiradas'
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{
                color: '#fff',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              {userData ? 'Actualizar' : 'Registrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterV3
