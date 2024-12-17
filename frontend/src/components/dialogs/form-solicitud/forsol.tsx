import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";
import axios from "axios";

const SolicitudForm = () => {
  const [formData, setFormData] = useState({
    entidad: "",
    soli: "",
    fecha: new Date(),
    hora: new Date(),
    tipo: "",
    descr: "",
    asig: "",
    fchasg: new Date(),
    horasg: new Date(),
  });

  const [entidades, setEntidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tiposServicio, setTiposServicio] = useState([]);

  useEffect(() => {
    // Fetch initial data
    axios.get("/api/entidades").then((res) => setEntidades(res.data));
    axios.get("/api/usuarios").then((res) => setUsuarios(res.data));
    axios.get("/api/tipos-servicio").then((res) => setTiposServicio(res.data));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/solicitudes", formData);
      alert("Solicitud registrada con éxito");
      console.log(response.data);
    } catch (error) {
      console.error("Error al registrar la solicitud", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agregar Nueva Solicitud
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Entidad</InputLabel>
        <Select
          value={formData.entidad}
          onChange={(e) => handleInputChange("entidad", e.target.value)}
        >
          {entidades.map((entidad) => (
            <MenuItem key={entidad.id} value={entidad.id}>
              {entidad.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Solicitado por</InputLabel>
        <Select
          value={formData.soli}
          onChange={(e) => handleInputChange("soli", e.target.value)}
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatePicker
        label="Fecha"
        value={formData.fecha}
        onChange={(value) => handleInputChange("fecha", value)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      <TimePicker
        label="Hora"
        value={formData.hora}
        onChange={(value) => handleInputChange("hora", value)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Tipo de Servicio</InputLabel>
        <Select
          value={formData.tipo}
          onChange={(e) => handleInputChange("tipo", e.target.value)}
        >
          {tiposServicio.map((tipo) => (
            <MenuItem key={tipo.id} value={tipo.id}>
              {tipo.descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Descripción"
        multiline
        rows={4}
        value={formData.descr}
        onChange={(e) => handleInputChange("descr", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Asignado a</InputLabel>
        <Select
          value={formData.asig}
          onChange={(e) => handleInputChange("asig", e.target.value)}
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DatePicker
        label="Fecha de Asignación"
        value={formData.fchasg}
        onChange={(value) => handleInputChange("fchasg", value)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      <TimePicker
        label="Hora de Asignación"
        value={formData.horasg}
        onChange={(value) => handleInputChange("horasg", value)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar Solicitud
      </Button>
    </Box>
  );
};

export default SolicitudForm;
