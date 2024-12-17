import React from 'react'

import { Button, Table } from '@mui/material'

const ConceptsPage = () => {
  const concepts = [] // Aquí se cargarían los conceptos

  return (
    <div>
      <h1>Conceptos de Nómina</h1>
      <Button variant='contained' color='primary'>
        Agregar Concepto
      </Button>
      <Table>{/* Aquí va la estructura de la tabla de conceptos */}</Table>
    </div>
  )
}

export default ConceptsPage
