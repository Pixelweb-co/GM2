// React Imports
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import axiosInstance from '@/utils/axiosInterceptor'

const ReporteForm = ({ openForm, RecordData, closeForm }: { openForm: boolean; RecordData: any; closeForm: any }) => {
  // States
  const [open, setOpen] = useState<boolean>(openForm)
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [formTemplate, setFormTemplate] = useState<any[]>([])
  const [product, setProduct] = useState<any>(null)
  const [ciudad, setCiudad] = useState<any>('')

  const [observacion, setObservacion] = useState<any>('')
  const [resumen, setResumen] = useState<any>('')

  // States
  const [value, setValueR] = useState<string>('1')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueR((event.target as HTMLInputElement).value)
  }

  const handleExpandChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    closeForm()
  }

  useEffect(() => {
    setOpen(openForm)
  }, [openForm])

  useEffect(() => {
    const fetchData = async (item: any) => {
      const result = await axiosInstance.get(`/plantillas/producto/${item.idEquipo}`)

      console.log('result:', result)

      setFormTemplate(result.data.plantillas)
      setProduct(result.data.producto)
    }

    if (RecordData) {
      // console.log('RecordData:', RecordData)

      fetchData(RecordData)
    }
  }, [RecordData])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm()

  const getFormattedDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // Meses van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds}`
  }

  const handleInputChange = (id: number, value: any) => {
    console.log('value:', value)

    setFormTemplate(prev =>
      prev.map(
        item => (item.id === id ? { ...item, valor: value } : item) // Actualiza solo el campo modificado
      )
    )
  }

  const handleSubmitForm = async () => {
    console.log('formtemplates', formTemplate)

    const data = {
      idSolicitud: RecordData.idSolicitud,
      idTipoServicio: RecordData.idTipoServicio,
      idEquipo: RecordData.idEquipo,
      idEntidad: RecordData.idEntidad,
      ciudad: ciudad,

      estado: value,
      resumen: resumen,
      observacion: observacion,
      plantillas: formTemplate,
      nombreTypoServicio: RecordData.nombreTipoServicio,
      estadoEquipo: value
    }

    console.log('data', data)

    try {
      const res = await axiosInstance.post('/reportes', data)

      console.log('res', res)

      if (res.status === 201) {
        alert('Reporte creado exitosamente')
        handleClose()
      }
    } catch (error) {
      console.error('Error creating report:', error)
      alert('Error creando el reporte')
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' closeAfterTransition={false}>
        <DialogTitle id='form-dialog-title'>Reporte #21354{RecordData.id}</DialogTitle>
        <DialogContent>
          <DialogContentText className='mbe-3'>
            <b>Fecha: </b> {getFormattedDateTime()}
            <br />
            <b>Cliente:</b> {RecordData.nombreEntidad}
          </DialogContentText>

          <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} />}
            >
              <Typography>Información del servicio</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
              <Grid container spacing={4}>
                <Grid item xs={2} md={2} sm={2}>
                  <p>
                    <b>Equipo: </b>
                  </p>
                </Grid>
                <Grid item xs={10} md={10} sm={10}>
                  <p>{RecordData.nombreEquipo} </p>
                </Grid>

                <Grid item xs={2} md={2} sm={2}>
                  <b>Marca:</b>
                </Grid>
                <Grid item xs={4} md={4} sm={4}>
                  {product && product.brand}
                </Grid>

                <Grid item xs={3} md={3} sm={3}>
                  <b>Modelo:</b>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                  {product && product.model}
                </Grid>

                <Grid item xs={2} md={2} sm={2}>
                  <b>Serie:</b>
                </Grid>
                <Grid item xs={4} md={4} sm={4}>
                  {product && product.licensePlate}
                </Grid>

                <Grid item xs={3} md={3} sm={3}>
                  <b>Código INT:</b>
                </Grid>
                <Grid item xs={3} md={3} sm={3}>
                  {product && product.productCode}
                </Grid>

                <Grid item xs={12} md={12} sm={12}>
                  <Divider />
                </Grid>

                <Grid item xs={3} md={3} sm={3}>
                  <p>
                    <b>Tipo de servicio: </b>
                  </p>
                </Grid>

                <Grid item xs={9} md={9} sm={9}>
                  <p style={{ color: 'red' }}>
                    {' '}
                    <b>{RecordData.nombreTipoServicio}</b>{' '}
                  </p>
                </Grid>

                <Grid item xs={12} md={12} sm={12}>
                  <Controller
                    name='ciudad'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Ciudad'
                        onChange={e => setCiudad(e.target.value)}
                        value={ciudad}
                      />
                    )}
                  />
                </Grid>

                {/* <Grid item xs={12} md={12} sm={12}>
                  <Controller
                    name='ubicacion'
                    control={control}
                    render={({ field }) => <CustomTextField fullWidth label='Ubicación'
                    onChange={(e) => setUbicacion(e.target.value)}
                    value={ubicacion}
                    />}

                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={3}
                    fullWidth
                    multiline
                    label='Descripción del servicio'
                    variant='outlined'
                    id='textarea-standard-static'
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}
                  />
                </Grid> */}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} />}
            >
              <Typography>Lista de checkeo</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
              {formTemplate.length > 0 &&
                formTemplate.map((plantillar, index) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        {plantillar.tipo == 2 && (
                          <Controller
                            name='tipoElementDt'
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={plantillar.valor === 'SI'} // Asegura que el estado refleje correctamente el valor guardado
                                    onChange={e => handleInputChange(plantillar.id, e.target.checked ? 'SI' : 'NO')}
                                  />
                                }
                                label={plantillar.nom}
                              />
                            )}
                          />
                        )}

                        {plantillar.tipo == 3 && (
                          <Controller
                            name='tipoElementcx'
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={plantillar.valor === 'SI'} // Asegura que el estado refleje correctamente el valor guardado
                                    onChange={e => handleInputChange(plantillar.id, e.target.checked ? 'SI' : 'NO')}
                                  />
                                }
                                label={plantillar.nom}
                              />
                            )}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>

          {product && product.verification && 
            <>
            <Accordion expanded={expanded === 'panel3'} onChange={handleExpandChange('panel3')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} />}
            >
              <Typography>Prueba de verificación</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    label='Detalle de la prueba'
                    variant='outlined'
                    onChange={e => setObservacion(e.target.value)}
                    value={observacion}
                    id='textarea-standard-static'
                    placeholder='Detalle'
                  />
                </Grid>
                
              </Grid>
            </AccordionDetails>
          </Accordion>
         
          <Accordion expanded={expanded === 'panel4'} onChange={handleExpandChange('panel4')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} />}
            >
              <Typography> Información del equipo patrón</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    label='Detalle del equipo patrón'
                    variant='outlined'
                    onChange={e => setObservacion(e.target.value)}
                    value={observacion}
                    id='textarea-standard-static'
                    placeholder='Detalle'
                  />
                </Grid>
                
              </Grid>
            </AccordionDetails>
          </Accordion>
          </>

          
          }

          <Accordion expanded={expanded === 'panel5'} onChange={handleExpandChange('panel5')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} style={{ color: 'white' }} />}
            >
              <Typography>Realización</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} sm={12}>
                  <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={handleChange}>
                    <FormControlLabel value='1' label='Funcional' control={<Radio defaultChecked color='success' />} />

                    <FormControlLabel value='2' label='Con fallas' control={<Radio defaultChecked color='warning' />} />

                    <FormControlLabel
                      value='3'
                      label='Fuera de servicio'
                      control={<Radio defaultChecked color='error' />}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    label='Trabajo realizado'
                    variant='outlined'
                    onChange={e => setResumen(e.target.value)}
                    value={resumen}
                    id='textarea-standard-static'
                    placeholder='Describa el trabajo realizado'
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel6'} onChange={handleExpandChange('panel6')}>
            <AccordionSummary
              sx={{
                backgroundColor: '#7367f0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#9e97f5' // Color más claro
                }
              }}
              expandIcon={<i className='tabler-chevron-right' style={{ color: 'white' }} />}
            >
              <Typography>Entrega</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className='!pbs-6'>
              <Grid container spacing={4}>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    label='Observaciones'
                    variant='outlined'
                    onChange={e => setObservacion(e.target.value)}
                    value={observacion}
                    id='textarea-standard-static'
                    placeholder='Observaciones'
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    rows={3}
                    fullWidth
                    multiline
                    label='Repuestos requeridos'
                    variant='outlined'
                    defaultValue=''
                    id='textarea-standard-static'
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={handleSubmitForm}>Crear reporte</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReporteForm
