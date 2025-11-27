import React, {useState, useEffect } from 'react';

import axios from 'axios';
import dotenv from "dotenv";

import { Box, Button, Card, CardContent, CardHeader, Tooltip } from '@mui/material';
import { userMethods } from '@/utils/userMethods';
import ReportViewver from './ReportViewver';
import axiosInstance from '@/utils/axiosInterceptor';
import ConfirmationDialog from '@components/dialogs/ConfirmationDialog';

function DeviceReports({product_id, reportDocs,handleDeleteConfirm}:{product_id:any, reportDocs:any[], handleDeleteConfirm: (document_name:string) => void}) {
  const [reportes, setReportes] = useState<any[]>([]);
  const [openReport, setOpenReport] = useState(false);
  const [rowSelect, setRowSelect] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);

  const verReporte = (reporte:any) => {
    console.log('Ver reporte:', reporte);
    setRowSelect(reporte)
    setOpenReport(true)
  }

  const eliminarReporte = async (id:any) => {
    console.log('Eliminar reporte:', id);

      await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/reportes/${id}`)

      fetchOptions()


  }

  const  convertirFecha = (mmddaa: string): string => {
  // Espera formato MM-DD-AA (ej: "03-25-24")
  const [mm, dd, aa] = mmddaa.split('-');

  if (!mm || !dd || !aa) {
    throw new Error('Formato inválido, se espera MM-DD-AA');
  }

  // Lógica para convertir año 2 dígitos a 4 dígitos
  // Ejemplo: 00–49 -> 2000–2049, 50–99 -> 1950–1999
  const yearNum = parseInt(aa, 10);
  const yyyy = yearNum < 50 ? 2000 + yearNum : 1900 + yearNum;

  // Asegurar siempre 2 dígitos en mes y día
  const mes = mm.padStart(2, '0');
  const dia = dd.padStart(2, '0');

  return `${yyyy}-${mes}-${dia}`;
}


  const fetchOptions = async () => {
    console.log('fetchOptions')

    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [reportsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes/finalizadas/${product_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

     
        const [documentsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/document/list/${product_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
        ])

        console.log('Documentos recibidos del backend r:', documentsRes.data);
        
        const items:any[] = [];

        documentsRes.data.filter((d:any) => d.report === true).forEach((doc:any) => {
          items.push({
            idSolicitud: doc.id,
            color: '#004aadff',
            nombreTipoServicio: doc.name,
            fecha: convertirFecha(doc.date),
            tipo: 'documento'
          });
        });


        reportsRes.data.forEach((report:any) => {
          items.push({...report, tipo: 'reporte'});
        })

        setReportes(items.sort((a, b) => {
          const fechaA = new Date(a.fecha).getTime();
          const fechaB = new Date(b.fecha).getTime();
          return fechaB - fechaA; // descendente
        }));    




    } catch (error) {
      console.error('Error al obtener los datos:', error)
    }
  }


  useEffect(() => {

    fetchOptions()

  }, []);


useEffect(() => {
console.log('reportDocs changed:', reportDocs); 
fetchOptions();
}, [reportDocs]);


  return (
    <>
    <Card>
    <CardHeader title='Reportes de Mantenimiento y Calibración' />
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
            onClick={() => reporte.tipo === 'reporte' ? verReporte(reporte) : window.open(`${process.env.NEXT_PUBLIC_API_URL}/document/${reporte.nombreTipoServicio}`, '_blank')}
            startIcon={<i className='tabler-eye'></i>}
          >
            {reporte.fecha}
          </Button>

          {(userMethods.isRole('SUPERADMIN') || userMethods.isRole('ADMIN')) && <Button variant='outlined'sx={{backgroundColor:"white"}} onClick={() => {
            
            
            if(reporte.tipo === 'reporte'){

            setOpen(true)
            setRowSelect(reporte)
            console.log("rpd",reporte)

            } else {
             
              handleDeleteConfirm(reporte.nombreTipoServicio)

            }

          }}>
            <i className='tabler-trash' />
          </Button>}
          </Box>
        </Tooltip>
        </Box>
      ))}
      </Box>


    </CardContent>
    </Card>
    <ConfirmationDialog
    open={open}
    setOpen={(p:any) => setOpen(p)}
    entitYName='Reporte'
    onConfirmation ={()=>{
      eliminarReporte(rowSelect?.idSolicitud)
      setOpen(false)
    }}
    name={rowSelect?.nombreTipoServicio}
    />
    {openReport && <ReportViewver
    open={openReport}
    onClose={() => setOpenReport(false)}
    rowSelect={rowSelect}
    />}
    </>
  );
}

export default DeviceReports;
