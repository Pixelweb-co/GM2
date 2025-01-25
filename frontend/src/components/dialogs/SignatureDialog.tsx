import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

const SignatureDialog = ({ open, onClose, solicitud_id }) => {
  const signatureRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Limpiar firma del canvas
  const clearSignature = () => {
    if (signatureRef.current) signatureRef.current.clear();
    setError("");
  };

  // Manejar el cambio de pestañas
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError("");
    setPreviewImage(null);

    if (newValue === 2) startCamera();
    else stopCamera();
  };

  // Subir archivo seleccionado
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  // Enviar archivo al endpoint
  const sendFileToEndpoint = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("solicitud_id", solicitud_id);

    fetch("/api/endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Archivo enviado con éxito.");
        onClose();
      })
      .catch((error) => {
        console.error("Error al enviar el archivo:", error);
        setError("Error al enviar el archivo.");
      });
  };

  // Guardar firma desde el canvas
  const handleSaveCanvas = () => {
    if (signatureRef.current?.isEmpty()) {
      setError("Por favor, firme antes de guardar.");
      return;
    }

    const fileName = `sign-${Math.floor(Date.now() / 1000)}.png`;
    signatureRef.current.getCanvas().toBlob((blob) => {
      if (blob) {
        const file = new File([blob], fileName, { type: "image/png" });
        sendFileToEndpoint(file);
      }
    });
  };

  // Guardar archivo cargado
  const handleSaveUploadedFile = () => {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      setError("Por favor, cargue un archivo.");
      return;
    }
    sendFileToEndpoint(file);
  };

  // Iniciar cámara
  const startCamera = async () => {
    if (isCameraActive) return;
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraActive(true);
    } catch {
      setError("No se pudo acceder a la cámara.");
    }
  };

  // Detener cámara
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Tomar foto con la cámara
  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) {
      setError("Cámara no disponible.");
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const fileName = `photo-${Math.floor(Date.now() / 1000)}.png`;
        const file = new File([blob], fileName, { type: "image/png" });
        setPreviewImage(URL.createObjectURL(blob));
        sendFileToEndpoint(file);
      }
    });
  };

  // Efecto para manejar la cámara al abrir o cerrar el diálogo
  useEffect(() => {
    if (!open) stopCamera();
    return stopCamera;
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Subir Firma o Imagen</DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Firma Canvas" />
          <Tab label="Cargar Imagen" />
          <Tab label="Foto del Dispositivo" />
        </Tabs>
        <Box mt={2}>
          {activeTab === 0 && (
            <div>
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                  width: 192,
                  height: 64,
                  className: "signature-canvas",
                  style: { border: "1px solid #ddd", margin: "auto" },
                }}
              />
              <Button onClick={clearSignature}>Limpiar</Button>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
              {previewImage && <img src={previewImage} alt="Previsualización" style={{ maxWidth: "100%", marginTop: 10 }} />}
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <video ref={videoRef} style={{ width: "100%" }}></video>
              <Button onClick={takePhoto} disabled={!isCameraActive}>
                Tomar Foto
              </Button>
            </div>
          )}
          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignatureDialog;
