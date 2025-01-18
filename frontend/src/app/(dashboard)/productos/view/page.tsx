'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { Grid, Card, CardHeader, CardContent, Typography, TextField, Button, Box, Checkbox, Alert } from '@mui/material'

import axiosInstance from '@/utils/axiosInterceptor'
import Documents from '@/components/Documents'

const ProductViewLayout = () => {
  // Estado inicial de los reportes
  const [reportes, setReportes] = useState([
    { id: 1, fecha: '2019-06-25', color: 'primary' },
    { id: 2, fecha: '2022-05-31', color: 'primary' },
    { id: 3, fecha: '2023-04-22', color: 'primary' },
    { id: 4, fecha: '2023-10-06', color: 'error' },
    { id: 5, fecha: '2024-04-03', color: 'error' },
    { id: 6, fecha: '2024-10-09', color: 'primary' }
  ])

  const [formTemplate, setFormTemplate] = useState<any[]>([])

  // Estado inicial del producto
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    // Carga los datos del localStorage
    const productData = localStorage.getItem('productview') ? JSON.parse(localStorage.getItem('productview')) : null

    if (productData) {
      console.log('productData', productData)
      setProduct(productData) // Usa el primer producto para mostrar los datos
    }

    const getTemplates = async (item:any) => {

      console.error('item:', item);

      try {
        const response = await axiosInstance.get(`/plantillas?marca=${item.brand}&modelo=${item.model}&tipoElement=${item.productType}`);

        console.log('Datos recibidostp :', response.data);

        setFormTemplate(response.data.map((item:any) => ({ nom: item.nom, tipo: (item.tipo).toString() })));

      } catch (error) {

        console.error('Error al obtener los datos:', error);
      }

    }

    getTemplates(productData)

  }, [])

  if (!product) {
    return <Typography>Cargando datos del producto...</Typography>
  }

  // Función para eliminar un reporte
  const eliminarReporte = (id: any) => {
    setReportes(reportes.filter(reporte => reporte.id !== id))
  }

  // Función para visualizar un reporte (puedes expandirla para mostrar contenido)
  const verReporte = (fecha: any) => {
    alert(`Visualizando reporte del ${fecha}`)
  }

  return (
    <Grid container spacing={2}>
      {/* Columna izquierda (30%) */}
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Image
              src={
                product.image
                  ? `http://localhost:8080/media/${product.image.name}`
                  : 'http://localhost:8080/media/default.png'
              }
              alt={product.productName}
              width={300}
              height={300}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Columna derecha (70%) */}
      <Grid item xs={12} md={9}>
        <Card sx={{ mb: 2 }}>
          <CardHeader title='Dispositivo' />
          <CardContent className='flex  gap-4'>
            <Grid container spacing={4}>
              <Grid item xs={4} sm={4}>
                <Typography>
                  <strong>Nombre:</strong> {product.productName}
                </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Marca:</strong> {product.brand}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Modelo:</strong> {product.model}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Serial:</strong> {product.productCode}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Voltaje:</strong> {product.voltage}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Registro Invima:</strong> {product.invimaRegister}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Procedencia:</strong> {product.origin}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Ubicación:</strong> {product.location}
            </Typography>
              </Grid>

            </Grid>







          </CardContent>
        </Card>

        <Card>
          <CardHeader title='Datos Técnicos' />
          <CardContent className='flex  gap-4'>
          <Grid container spacing={4}>
              <Grid item xs={4} sm={4}>
                <Typography>
                  <strong>Nombre:</strong> {product.productName}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Amperios:</strong> {product.amperage}
            </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Potencia:</strong> {product.power}
            </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Frecuencia:</strong> {product.frequency}
            </Typography>
              </Grid>

              <Grid item xs={4} sm={4}>
              <Typography>
              <strong>Manual de Usuario:</strong> {product.manual}
            </Typography>
              </Grid>


              </Grid>


          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 2 }}>
          <CardHeader title='Información Comercial' />
          <CardContent className='flex  gap-2'>
          <Grid container spacing={4}>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Fecha de Compra:</strong> {product.purchaseDate}
            </Typography>

              </Grid>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Valor Contable:</strong> {product.bookValue}
            </Typography>

              </Grid>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Proveedor:</strong> {product.supplier}
            </Typography>

              </Grid>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Tiempo de Garantía:</strong> {product.warranty}
            </Typography>

              </Grid>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Inicio Garantía:</strong> {product.warrantyStartDate}
            </Typography>

              </Grid>


              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Finaliza Garantía:</strong> {product.warrantyEndDate}
            </Typography>

              </Grid>
              <Grid item xs={3} sm={3}>
              <Typography>
              <strong>Periodicidad del Mantenimiento:</strong> {product.periodicity}
            </Typography>

              </Grid>

              </Grid>

          </CardContent>
        </Card>

        <Card>
          <CardHeader title='Protocolo de Mantenimiento' />
          <CardContent>
            {formTemplate.length > 0 && formTemplate.map((item, index) => (
              <Alert severity='info' key={index} sx={{marginBottom:2}}>{item.nom}</Alert>

            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12}>
          <Documents product_id={product.id} />


      </Grid>

      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Reportes de Mantenimiento' />
          <CardContent>
            <Box display='flex' flexWrap='wrap' gap={1}>
              {reportes.map(reporte => (
                <Box
                  key={reporte.id}
                  display='flex'
                  alignItems='center'
                  gap={1}
                  sx={{
                    backgroundColor: 'lightgray',
                    padding: 1,
                    borderRadius: 1
                  }}
                >
                  <Button
                    variant='contained'
                    color={reporte.color}
                    onClick={() => verReporte(reporte.fecha)}
                    startIcon={<i className='fas fa-eye'></i>}
                  >
                    {reporte.fecha}
                  </Button>
                  <Button variant='contained' color='error' onClick={() => eliminarReporte(reporte.id)}>
                    <i className='tabler-trash text-textSecondary' />
                  </Button>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>


      </Grid>

      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Herramientas' />
          <CardContent>
            <Box display='flex' gap={2}>
              <Button variant='contained'>Lista de Chequeo</Button>
              <Button variant='contained'>Firmas</Button>
              <Button variant='contained'>Editar</Button>
            </Box>
            <Typography variant='body2' sx={{ mt: 2 }}>
              Biomédico
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProductViewLayout
