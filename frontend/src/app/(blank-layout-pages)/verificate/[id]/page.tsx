'use client'

import { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import VerifyEmailLink from '@/views/pages/auth/VerifyEmailLink'
import { AuthManager } from '@/utils/authManager'

const VerficateEmailPage = () => {
  const params = useParams()
  const [emailToken, setEmailToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Extrae el parámetro que necesitas, por ejemplo: `params.token`
    if (params?.id) {
      setEmailToken(String(params.id))
      console.log('Token almacenado:', params.id) // Para verificar en consola

      const result = AuthManager.validateAccount({ validationToken: String(params.id) })

      setLoading(false)
      console.log('result', result)
    }
  }, [params])

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      {loading && <p>Validadado...</p>}

      {!loading && <VerifyEmailLink />}
    </div>
  )
}

export default VerficateEmailPage
