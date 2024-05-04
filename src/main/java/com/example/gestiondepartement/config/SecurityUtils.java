package com.example.gestiondepartement.config;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class SecurityUtils {

    public static SecretKey generateSecretKey() {
        // Generate a secure key for HS512
        return Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }
    
    public static String encodeKey(SecretKey secretKey) {
        // Encode the key as a String for storage
        return java.util.Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    public static SecretKey decodeKey(String encodedKey) {
        // Decode the stored key back into a SecretKey
        byte[] decodedKey = java.util.Base64.getDecoder().decode(encodedKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}
