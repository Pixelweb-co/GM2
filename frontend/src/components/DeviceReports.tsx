import React, {useState, useEffect } from 'react';

import axios from 'axios';
import { Box, Button, Card, CardContent, CardHeader, Tooltip } from '@mui/material';
import { userMethods } from '@/utils/userMethods';
import ReportViewver from './ReportViewver';

function DeviceReports({product_id}:{product_id:any}) {
  const [reportes, setReportes] = useState<any[]>([]);
  const [openReport, setOpenReport] = useState(false);
  const [rowSelect, setRowSelect] = useState<any>(null);

  const verReporte = (reporte:any) => {
    console.log('Ver reporte:', reporte);
    setRowSelect(reporte)
    setOpenReport(true)
  }

  const eliminarReporte = (id:any) => {
    console.log('Eliminar reporte:', id);
  }

  useEffect(() => {

    const fetchOptions = async () => {
      console.log('fetchOptions')

      try {
        const token = localStorage.getItem('AuthToken')

        if (!token) {
          throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
        }

        const [reportsRes] = await Promise.all([
          axios.get(`http://localhost:8080/solicitudes/finalizadas/${product_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
        ])

        setReportes(reportsRes.data)

      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    fetchOptions()

  }, []);

  return (
    <>
    <Card>
    <CardHeader title='Reportes de Mantenimiento' />
    <CardContent>
      <Box display='flex' flexWrap='wrap' gap={1}>
        {reportes.map((reporte,index) => (
          <Box
            key={index}
            display='flex'
            alignItems='center'
            gap={1}
            sx={{
              backgroundColor:reporte.color,
              padding: 1,
              borderRadius: 1
            }}
          >
            <Tooltip title={`${reporte.nombreTipoServicio}`}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant='outlined'
                  color="primary"
                  sx={{backgroundColor:"white",minWidth: 100}}
                  onClick={() => verReporte(reporte)}
                  startIcon={<i className='tabler-eye'></i>}
                >
                  {reporte.fecha}
                </Button>

                {(userMethods.isRole('SUPERADMIN') || userMethods.isRole('ADMIN')) && <Button variant='outlined'sx={{backgroundColor:"white"}} onClick={() => eliminarReporte(reporte.id)}>
                  <i className='tabler-trash' />
                </Button>}
              </Box>
            </Tooltip>
          </Box>
        ))}
      </Box>


    </CardContent>
  </Card>
  {openReport && <ReportViewver
  open={openReport}
  onClose={() => setOpenReport(false)}
  rowSelect={rowSelect}
  />}
  </>
  );
}

export default DeviceReports;
