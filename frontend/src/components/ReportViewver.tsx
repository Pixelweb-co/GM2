'use client'

// React Imports
import {useRef, use, useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import { PDFDownloadLink } from '@react-pdf/renderer';

import DialogContentText from '@mui/material/DialogContentText'

import MaintenanceReport from './reports/ReportMP'

import axiosInstance from '@/utils/axiosInterceptor'

const ReportViewver = ({open,onClose,rowSelect}:{open:boolean,onClose:any,rowSelect:any}) => {
  // States

  const printReport = () => {

    console.log('Imprimir reporte')
  }

  const handleClose = () => onClose()


  return (
    <>

      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby='full-screen-dialog-title'
        open={open}
        closeAfterTransition={false}
      >
        <DialogTitle id='alert-dialog-title'>Reporte:</DialogTitle>
        <DialogContent>

        <div>
            <MaintenanceReport data={rowSelect} />
        </div>



        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cerrar</Button>
          <PDFDownloadLink
          document={<MaintenanceReport data={rowSelect} />}
          fileName={`reporte_${rowSelect.idSolicitud || 'mantenimiento'}.pdf`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {({ loading }: { loading: boolean }) => loading ? 'Generando PDF...' : 'Descargar PDF'}
        </PDFDownloadLink>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReportViewver
