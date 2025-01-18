import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import axios from 'axios';

interface DocumentsProps {
  product_id: any;
}

const Documents: React.FC<DocumentsProps> = ({ product_id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [tag, setTag] = useState<string>('');
  const [isReport, setIsReport] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any[]>([]);

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo.');

      return;
    }

    const formData = new FormData();

    formData.append('file', file);
    formData.append('tag', tag);
    formData.append('isReport', String(isReport));
    formData.append('product_id', product_id);

    try {

      const token = localStorage.getItem('AuthToken')

      console.log('token ', token)

      if (!token) {
        throw new Error('Token no disponible. Por favor, inicia sesión nuevamente.')
      }

      const method = 'post'; // Crear documento
      const apiUrl = 'http://localhost:8080/document'; // Ruta de la API

      const response = await axios({
        method: method,
        url: apiUrl,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      alert('Archivo cargado exitosamente');
      console.log('Respuesta:', response.data);

      setDocuments(response.data);

      // Resetear el estado después de la carga
      setFile(null);
      setTag('');
      setIsReport(false);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      alert('Hubo un error al cargar el archivo.');
    }
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-console
    console.info('You clicked the delete icon.')
  }

  return (
    <>
      {/* Card para subir documentos */}
      <Card>
        <CardHeader title="Documentos Anexos" />
        <CardContent>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            {/* Input para cargar archivos */}
            <input
              type="file"
              onChange={handleFileChange}
              className="btn"
              style={{ marginRight: '16px' }}
            />

            {/* Campo de etiqueta */}
            <TextField
              placeholder="Etiqueta"
              size="small"
              sx={{ flexGrow: 1, mr: 2 }}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />

            {/* Checkbox para reporte */}
            <Checkbox
              checked={isReport}
              onChange={(e) => setIsReport(e.target.checked)}
            />
            <Typography variant="body2" sx={{ mr: 2 }}>
              Reporte
            </Typography>

            {/* Botón para cargar */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!file || !tag}
            >
              Cargar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Card para listar documentos */}
      <Card>
        <CardHeader title="Documentos relacionados" />
        <CardContent>

          <Grid container spacing={2}>
            {documents.map((document) => (
              <Grid item xs={3} key={document.id}>



                  <Chip
          label={document.name}
          color='primary'
          variant='tonal'
          onClick={() => {

            router.push(`/document/${document.name}`)

          }}
          onDelete={handleDelete}
          deleteIcon={<i className='tabler-trash-x' />}
        />



              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Documents;
