package com.example.gestiondepartement.dao;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    @Column(name = "isactive")
    private boolean isActive;

    @Temporal(TemporalType.DATE)
    private Date publicationDate;

    // DOI field
    @Column(name = "doi", unique = true)
    private String doi;

    // PDF field as a byte array
    @Lob  // Specifies that the database should treat this as a Large Object
    @Column(name = "pdf", columnDefinition="bytea")
    private byte[] pdf;

    @ManyToOne
    @JoinColumn(name = "publisher_id") // Ensures that the foreign key column name matches what is in the database
    private Membre publisher;

    @ManyToMany
    @JoinTable(
            name = "article_authors",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "membre_id")
    )
    private List<Membre> authors;
}
