package com.app.starter1.event;

import com.app.starter1.dto.AuthCreateUserRequest;
import com.app.starter1.persistence.entity.UserEntity;
import com.app.starter1.persistence.repository.UserRepository;
import com.app.starter1.persistence.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private final UserEntity user;

    public OnRegistrationCompleteEvent(UserEntity user) {
        super(user);
        this.user = user;
    }

    public UserEntity getUser() {
        return user;
    }
}
