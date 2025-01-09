import com.app.starter1.dto.ReportDTO;
import com.app.starter1.persistence.entity.Reporte;
import com.app.starter1.persistence.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    // Guardar reporte
    public Reporte save(ReportDTO reportDTO) {
        Reporte reporte = mapToEntity(reportDTO);

        return reportRepository.save(reporte);
    }

    // Mapear DTO a entidad
    public Reporte mapToEntity(ReportDTO reportDTO) {
        return Reporte.builder()
                .solicitud(reportDTO.getIdSolicitud()) // Se asume que el ID es suficiente para relacionar
                .ciudad(reportDTO.getCiudad())
                .ubicacion(reportDTO.getUbicacion())
                .trabajoRealizado(reportDTO.getResumen())
                .observaciones(reportDTO.getObservacion())
                .estadoEquipo(reportDTO.getEstadoEquipo())
                .build();
    }

    // Mapear entidad a DTO (opcional)
    public ReportDTO mapToDTO(Reporte reporte) {
        return ReportDTO.builder()
                .id(reporte.getId())
                .idSolicitud(reporte.getSolicitud())
                .ciudad(reporte.getCiudad())
                .ubicacion(reporte.getUbicacion())
                .resumen(reporte.getTrabajoRealizado())
                .observacion(reporte.getObservaciones())
                .estadoEquipo(reporte.getEstadoEquipo())
                .build();
    }
}
