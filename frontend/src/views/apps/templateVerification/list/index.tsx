// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { TypeDeviceType } from '../type/TemplateVerificationType'

// Component Imports
import TypeDeviceListTable from './TemplateVerificationListTable'

const typeDeviceList = ({ typeDeviceData, reload }: { typeDeviceData?: TypeDeviceType[], reload:void }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TypeDeviceListTable tableData={typeDeviceData} reload={reload}/>
      </Grid>
    </Grid>
  )
}

export default typeDeviceList
