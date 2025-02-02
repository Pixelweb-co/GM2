package com.app.starter1.dto;

import java.util.List;

public class ScheduleRequest {

    private List<String> fechas;
    private int deviceId;

    // Getters y setters
    public List<String> getFechas() {
        return fechas;
    }

    public void setFechas(List<String> fechas) {
        this.fechas = fechas;
    }

    public int getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(int deviceId) {
        this.deviceId = deviceId;
    }
}
