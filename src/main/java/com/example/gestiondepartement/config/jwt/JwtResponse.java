package com.example.gestiondepartement.config.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
    @AllArgsConstructor
    public class JwtResponse {
        private String token;
    }