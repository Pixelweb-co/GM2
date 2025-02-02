package com.app.starter1.persistence.repository;

import com.app.starter1.persistence.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    // Método para encontrar todos los schedules por el dispositivo
    List<Schedule> findByDeviceId(int deviceId);

    // Método para encontrar un schedule por su fecha
    List<Schedule> findByDate(String date);

    // Si necesitas algún método adicional según tus necesidades
}
