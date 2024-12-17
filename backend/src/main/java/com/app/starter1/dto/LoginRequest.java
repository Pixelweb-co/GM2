package com.app.starter1.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank String username, String password) {


}
