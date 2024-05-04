package com.example.gestiondepartement.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtSecretKey {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public SecretKey getSecretKey() {
        return secretKey;
    }

    public  String generateJWT(String email, String role) {
        // Retrieve your securely stored key (this example uses a hardcoded value, but you should retrieve it from a secure location)
        SecretKey key = getSecretKey(); // Use the centralized secret key

        long expirationTime = 3600000; // 1 hour
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

        // Generate JWT token
        String jwt;
        jwt = Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .signWith(key)
                .claim("role", role) // Add role as a claim
                .compact();

        return jwt;
    }
}
