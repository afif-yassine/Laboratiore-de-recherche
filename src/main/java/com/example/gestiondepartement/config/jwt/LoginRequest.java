package com.example.gestiondepartement.config.jwt;

import lombok.Data;

@Data
    public class LoginRequest {
        private String email;
        private String password;
    }