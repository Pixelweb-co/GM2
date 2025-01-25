import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import SignatureDialog from '@components/dialogs/SignatureDialog'
import { Button } from '@mui/material';
import Image from 'next/image';


const downloadPDF = async (componentId: string, pdfFileName: string = 'MaintenanceReport.pdf') => {
  const input = document.getElementById(componentId);
  if (!input) {
    console.error(`No se encontró el componente con ID: ${componentId}`);
    return;
  }

  // Captura el contenido del componente como imagen
  const canvas = await html2canvas(input, {
    scale: 2, // Incrementa la calidad de la imagen
    useCORS: true, // Permite cargar imágenes externas
  });

  const imgData = canvas.toDataURL('image/png');

  // Configurar PDF a tamaño carta
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter', // Tamaño carta: 612 x 792 puntos
  });

  const pageWidth = 612; // Ancho de página carta
  const pageHeight = 792; // Altura de página carta

  // Calcular dimensiones de la imagen dentro del tamaño carta
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // Verificar si la imagen excede la altura de la página y dividirla en varias páginas si es necesario
  let position = 0;

  while (position < imgHeight) {

    pdf.addImage(
      imgData,
      'PNG',
      0,
      position > 0 ? 0 : position, // Agregar imagen desde la parte superior o continuar en la siguiente página
      imgWidth,
      imgHeight > pageHeight ? pageHeight : imgHeight,
    );
    position += pageHeight;

    if (position < imgHeight) {
      pdf.addPage(); // Agregar una nueva página si la imagen excede la altura
    }
  }

  pdf.save(pdfFileName); // Descargar el PDF
};


const MaintenanceReport = ({data}:{data:any}) => {

  const [sign,setSign]=useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [firma_solicitud,setFirmaSolicitud]=useState(null)


  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSaveSignature = (file:any) => {
    console.log("Archivo guardado:", file);
    setUploadedFile(file); // Guardar el archivo en el estado
    // Crear una URL para la previsualización
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };



  const fetchOptions = async (data:any) => {
    console.log('fetchOptions')

    try {
      const token = localStorage.getItem('AuthToken')

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const [firmaRes] = await Promise.all([
        axios.get(`http://localhost:8080/firma-user/sign/${data.asig.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      ])

      setSign(firmaRes.data)



      return true
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  useEffect(() => {


    if(data){

      console.log("report data: ",data)
    fetchOptions(data)
    }

  }, [data])



  return (

        <><div className="text-right p-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => downloadPDF('5674', 'MaintenanceReport.pdf')}
        >
          Descargar PDF
        </button>
      </div>

        <div className="container mx-auto text-sm mt-5" id="5674">

            <div className="container w-4/5 p-1 mx-auto">
                <table className="table-auto border text-center w-full">
                    <tbody>
                        <tr>
                            <td rowSpan={3} className="w-1/10">
                                <img src="http://localhost:8080/media/logo.jpg" alt="Logo" className="w-24 h-24 mt-2" />
                            </td>
                            <td rowSpan={3} className="align-middle">
                                <h5>REPORTE SERVICIO MANTENIMIENTO</h5>
                                <p>Orden No: 100-2019{data.idSolicitud}</p>
                            </td>
                            <th colSpan={2} className="w-1/10">F-MTO-11</th>
                        </tr>
                        <tr>
                            <td>Versión</td>
                            <td>Revisión</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>N° 1</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container w-4/5 p-1 mx-auto">
                <table className="table-auto border w-full">
                    <tbody>
                        <tr>
                            <th className="w-1/6">CUIDAD</th>
                            <td className="w-2/6">{data.reporte.ciudad}</td>
                            <th className="w-1/6">FECHA REPORTE</th>
                            <td>{data.fecha}</td>
                        </tr>
                        <tr>
                            <th>INSTITUCION</th>
                            <td>{data.customer.name}</td>
                            <th>SEDE</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="container flex w-4/5 p-1 mx-auto">

                <table className="table-auto border w-full h-24">
                    <tbody>
                        <tr>
                            <th className="w-1/6 text-left">EQUIPO</th>
                            <td className="w-2/6 ">{data.equipo.productName}</td>

                        </tr>
                        <tr>
                            <th className="text-left">MARCA</th>
                            <td>{data.equipo.brand}</td>

                        </tr>
                        <tr>
                            <th className="text-left">MODELO</th>
                            <td>{data.equipo.model}</td>

                        </tr>
                        <tr>
                            <th className="text-left">SERIE</th>
                            <td>{data.equipo.licensePlate}</td>

                        </tr>
                        <tr>
                            <th className="text-left">CODIGO INT</th>
                            <td>{data.equipo.bookValue}</td>

                        </tr>
                        <tr>
                            <th className="text-left">UBICACION</th>
                            <td>{data.equipo.location}</td>

                        </tr>
                        <tr>
                            <th className="text-left">ESTADO DEL EQUIPO</th>
                            <td>FUNCIONAL</td>

                        </tr>
                    </tbody>
                </table>

                <table className="table-auto border w-full">
                    <tbody>
                    {data.typeServiceServiceList.map((typeService:any, index:any) => {
                        return(<tr key={index}>
                          <th className="w-3/6 text-left">{typeService.descripcion}</th>
                          <td className="w-2/6 ">{typeService.id === data.tipoServicio? 'X':''}</td>

                      </tr>)
                    })}
                    </tbody>

                  </table>
            </div>

            <div className="w-4/5 p-1 mx-auto">
                <div className="border rounded shadow-md">
                    <div className="bg-gray-200 font-bold p-2">SOLICITUD Y/O FALLA REPORTADA</div>
                    <div className="p-2">EQUIPO NO ENCIENDE</div>
                </div>
            </div>

            <div className="w-4/5 p-1 mx-auto">
                <div className="border rounded shadow-md">
                    <div className="bg-gray-200 font-bold p-2">TRABAJO REALIZADO</div>
                    <div className="p-2">SE REVISA EL EQUIPO ENCONTRANDO EL PAD TECLADO MALO, SE REALIZA CAMBIO DE ESTE Y EL EQUIPO FUNCIONA OK</div>
                </div>
            </div>

            <div className="w-4/5 p-1 mx-auto">
                <div className="border rounded shadow-md">
                    <div className="bg-gray-200 font-bold p-2">OBSERVACIONES</div>
                    <div className="p-2">EQUIPO FUNCIONAL, SE ENTREGA PROBADO AL PERSONAL ENCARGADO.</div>
                </div>
            </div>

            <div className="container w-4/5 p-1 mx-auto">
                <table className="table-auto border w-full">
                    <tbody>
                        <tr>
                            <th className="w-1/6">Firma</th>
                            <td className="w-2/6">
                                <Image src={`http://localhost:8080/firma-user/${sign.firma}`} alt="Firma 1" width={180} height={64} />
                            </td>
                            <th className="w-1/6">Firma</th>
                            <td>

                                {firma_solicitud?.firma ?

                                <Image src={`http://localhost:8080/firma-solicitud/${firma_solicitud}`} alt="Firma 2" className="w-48 h-16" />

                                :
                                      <Button variant="contained" onClick={handleOpenDialog}>
        Abrir Dialogo de Firma
      </Button>

                                }
                            </td>
                        </tr>
                        <tr>
                            <th>Ingeniero</th>
                            <td>{data.asig.nombres} {data.asig.apellidos}</td>
                            <th>Recibe</th>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <SignatureDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveSignature}
      />

<div style={{ padding: "20px" }}>
      <SignatureDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveSignature}
      />

      {uploadedFile && (
        <div style={{ marginTop: "20px" }}>
          <h3>Archivo de Firma:</h3>
          <p><strong>Nombre:</strong> {uploadedFile.name}</p>
          <p><strong>Tamaño:</strong> {uploadedFile.size} bytes</p>
          <p><strong>Tipo:</strong> {uploadedFile.type}</p>
          {previewUrl && (
            <div>
              <h4>Previsualización:</h4>
              <img
                src={previewUrl}
                alt="Previsualización de la Firma"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "192px",
                  height: "64px",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>


        </>
    );
};

export default MaintenanceReport;
