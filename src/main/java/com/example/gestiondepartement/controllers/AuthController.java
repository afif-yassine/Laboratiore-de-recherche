package com.example.gestiondepartement.controllers;


import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser() {

        return null;
    }
}
