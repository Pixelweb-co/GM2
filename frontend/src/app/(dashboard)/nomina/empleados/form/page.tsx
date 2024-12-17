'use client'

import { Fragment, useState } from 'react'

import FormEmploye from '@/views/apps/employe/form/page'

const EmpleoyeForm = () => {
  const [employeData, setEmployeData] = useState(null)

  return (
    <Fragment>
      <h2 className='mb-2'>Datos del empleado</h2>
      <FormEmploye />
    </Fragment>
  )
}

export default EmpleoyeForm
