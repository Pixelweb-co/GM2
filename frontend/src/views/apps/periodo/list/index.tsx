// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Type Imports
import type { PeriodosType } from '@/types/apps/periodoType'

// Component Imports
import PeriodoListTable from './PeriodoListTable'

const PeriodoList = ({ periodoData }: { periodoData?: PeriodosType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col items-left gap-2'>
            <Typography variant='h4'>Liquidacion de nomina</Typography>
            <Typography color='text.secondary'>Calcula las deducciones y devengados de tu equipo de trabajo</Typography>
          </CardContent>
        </Card>
        <Card className='mt-3 bg-purple-100'>
          <CardContent className='flex flex-col items-left gap-2'>
            <Typography variant='h4'>Periodo activo: </Typography>
            <Typography color='text.secondary'>Calcula las deducciones y devengados de tu equipo de trabajo</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <PeriodoListTable tableData={periodoData} />
      </Grid>
    </Grid>
  )
}

export default PeriodoList
