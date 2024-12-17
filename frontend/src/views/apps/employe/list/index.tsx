// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { EmployesType } from '@/types/apps/employeType'

// Component Imports
import EmployeListTable from './EmployeListTable'
import EmployeListCards from './EmployeListCards'

const EmployeList = ({ employeData }: { employeData?: EmployesType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EmployeListCards />
      </Grid>
      <Grid item xs={12}>
        <EmployeListTable tableData={employeData} />
      </Grid>
    </Grid>
  )
}

export default EmployeList
