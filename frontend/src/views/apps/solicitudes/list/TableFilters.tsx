// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { SolicitudType } from '@/types/apps/solicitudType'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: SolicitudType[]) => void
  tableData?: SolicitudType[]
}) => {
  // Estados
  //const [role, setRole] = useState<string>('') // Estado para filtrar por roles
  const [status, setStatus] = useState<string | ''>('') // Estado para filtrar por estado (activo/inactivo)

  useEffect(() => {
    if (!tableData || !Array.isArray(tableData)) return // Verificar si tableData es un array

    const filteredData = tableData.filter(solicitud => {
      // const matchRole = role ? solicitud.roles.some(r => r.roleEnum === role) : true // Comparar roles

      const matchStatus = status !== '' ? solicitud.status === status : '1' // Comparar el estado

      return matchStatus
    })

    setData(filteredData)
  }, [status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        {/* Status Filter */}
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => {
              const selectedValue = e.target.value

              setStatus(selectedValue === 'active' ? '1' : selectedValue === 'inactive' ? '1' : '0')
            }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='active'>Activo</MenuItem>
            <MenuItem value='inactive'>Inactivo</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
