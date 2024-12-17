import { CustomersType } from './customerType'
import { RolesType } from './roleType'

export interface UsersType {
  id?: number // Cambiar a opcional
  username?: string
  password?: string
  confirmPassword?: string
  email?: string
  accountNoExpired?: boolean
  accountNoLocked?: boolean
  credentialNoExpired?: boolean
  enabled?: boolean
  roles?: RolesType[]
  customer?: CustomersType
}
