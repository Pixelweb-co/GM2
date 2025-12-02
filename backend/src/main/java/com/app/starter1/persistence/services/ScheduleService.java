package com.app.starter1.persistence.services;
import java.util.Optional;
import java.util.stream.Collectors;

import com.app.starter1.dto.ScheduleProductClientDTO;
import com.app.starter1.dto.ScheduleProductClientProjection;
import com.app.starter1.persistence.services.CustomerService;

import com.app.starter1.dto.ScheduleDto;
import com.app.starter1.dto.ScheduleRequest;
import com.app.starter1.persistence.entity.Schedule;
import com.app.starter1.persistence.entity.Product;
import com.app.starter1.persistence.repository.ScheduleRepository;
import com.app.starter1.persistence.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired CustomerService customerService;

    @Transactional
    public void deleteByDeviceId(Long deviceId) {
        scheduleRepository.deleteByDeviceId(deviceId);
    }

    @Transactional
    public void createSchedules(ScheduleRequest scheduleRequest) {
        // Buscar el dispositivo por ID
        Product device = productRepository.findById(scheduleRequest.getDeviceId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        System.out.println("device "+scheduleRequest.getDeviceId());
        //eliminamos todos la programacion actual del producto

        Long deviceId = device.getId();
        // 1) Borrar programación previa
        long deleted = scheduleRepository.deleteByDeviceId(deviceId);
        System.out.println("Schedules eliminados para device " + deviceId + ": " + deleted);

        System.out.println("eliminaos");

        for (String fecha : scheduleRequest.getFechas()) {
            // Verificar si ya existe un Schedule para este dispositivo y fecha
            boolean exists = scheduleRepository.existsByDeviceIdAndDate(scheduleRequest.getDeviceId(), fecha);

            if (!exists) {
                // Si no existe, guardar el nuevo Schedule
                Schedule schedule = Schedule.builder()
                        .device(device)
                        .date(LocalDate.parse(fecha).toString())  // Convierte la fecha a String
                        .status(Schedule.Status.ACTIVE)  // Estado según corresponda
                        .build();

                scheduleRepository.save(schedule);
            }
        }
    }



    public List<ScheduleProductClientProjection> getAllSchedulesWithProductAndCustomer() {
        return scheduleRepository.findAllScheduleWithProductAndClient();
    }

    public boolean setInactiveById(Long id) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(id);

        if (optionalSchedule.isPresent()) {
            Schedule schedule = optionalSchedule.get();
            schedule.setStatus(Schedule.Status.valueOf("INACTIVE"));
            scheduleRepository.save(schedule);
            return true;
        }

        return false;
    }

}
