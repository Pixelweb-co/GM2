package com.sendermail.serviceSender.controller;

import com.sendermail.serviceSender.service.NotificationProducerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    private final NotificationProducerService producerService;

    public NotificationController(NotificationProducerService producerService) {
        this.producerService = producerService;
    }

    @GetMapping("/sendnotification")
    public String sendNotification(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String body
    ) {
        String message = String.format("{\"to\":\"%s\",\"subject\":\"%s\",\"body\":\"%s\"}", to, subject, body);
        producerService.sendMessage("email-notifications", message);
        return "Notificación enviada a la cola.";
    }
}
