// Next Imports
'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import LoginV2 from '@/views/pages/auth/LoginV2'
import { AuthManager } from '@/utils/authManager'

const LoginPage = () => {
  // Vars
  const isTokenValid: any = AuthManager.validateToken()
  const router = useRouter()

  useEffect(() => {
    if (isTokenValid && isTokenValid.valid) {
      router.push('/home')
    }
  }, [])

  return <LoginV2 mode='light' />
}

export default LoginPage
