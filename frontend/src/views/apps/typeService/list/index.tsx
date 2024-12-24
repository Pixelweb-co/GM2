// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { TypeServiceType } from '@/types/apps/TypeServiceType'

// Component Imports
import TypeServiceListTable from './TypeServiceListTable'

const TypeServiceList = ({ TypeServiceData }: { TypeServiceData?: TypeServicesType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TypeServiceListTable tableData={TypeServiceData} />
      </Grid>
    </Grid>
  )
}

export default TypeServiceList
