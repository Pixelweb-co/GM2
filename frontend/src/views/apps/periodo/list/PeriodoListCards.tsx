// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { PeriodoDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: PeriodoDataType[] = [
  {
    title: 'Session',
    stats: '21,459',
    avatarIcon: 'tabler-periodos',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '29%',
    subtitle: 'Total Periodo'
  },
  {
    title: 'Paid Periodos',
    stats: '4,567',
    avatarIcon: 'tabler-periodo-plus',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '18%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Active Periodos',
    stats: '19,860',
    avatarIcon: 'tabler-periodo-check',
    avatarColor: 'success',
    trend: 'negative',
    trendNumber: '14%',
    subtitle: 'Last week analytics'
  },
  {
    title: 'Pending Periodos',
    stats: '237',
    avatarIcon: 'tabler-periodo-search',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '42%',
    subtitle: 'Last week analytics'
  }
]

const PeriodoListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PeriodoListCards
