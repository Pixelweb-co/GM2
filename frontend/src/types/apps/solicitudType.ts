export interface SolicitudType {
  idSolicitud: number // ID único de la solicitud
  fecha: string // Fecha en formato string (YYYY-MM-DD o similar)
  hora: string // Hora en formato string (HH:mm)
  idEquipo: string // Identificador del equipo relacionado
  idEntidad: string // Identificador de la entidad relacionada
  status: string // Estado de la solicitud (puede ser un código, e.g., 'A', 'P', etc.)
  idTipoServicio: number // ID del tipo de servicio relacionado

  // Relación con el usuario asignado
  usuarioAsignado?: string // Objeto de tipo UserEntity (opcional)

  // Relación con el tipo de servicio
  typeService?: string // Objeto de tipo TipoServicio (opcional)

  // Relación con el estado de la solicitud
  estadoSolicitud?: string // Objeto de tipo EstadoSolicitud (opcional)
}
