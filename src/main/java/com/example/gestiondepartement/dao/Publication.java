package com.example.gestiondepartement.dao;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "publication")
@Getter
@Setter
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private LocalDate datepublished;

    @Column(name = "photo",columnDefinition = "bytea")
    private byte[] photo;

    private String local;
}
