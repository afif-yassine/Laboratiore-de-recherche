package com.example.gestiondepartement.rest;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class PublicationDTO {

    private Long id;
    private String content;
    private LocalDate datePublished;
    private byte[] photo;  // Using Base64-encoded string for photo to simplify transfer over JSON
    private String local;
}
