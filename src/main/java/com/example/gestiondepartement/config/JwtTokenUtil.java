package com.example.gestiondepartement.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {

    @Autowired
    private JwtSecretKey jwtSecretKey; // Inject the JwtSecretKey


    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getBody().getSubject();
    }

    private Jws<Claims> getClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(jwtSecretKey.getSecretKey()).build().parseClaimsJws(token);
    }
}
