package com.example.gestiondepartement.dao;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Article")
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
    @ManyToOne
    private Membre publisher;

    @ManyToMany
    @JoinTable(
            name = "article_authors", // Corrected table name for clarity and correctness
            joinColumns = @JoinColumn(name = "article_id"), // Specifies the column used for joining with the Article table
            inverseJoinColumns = @JoinColumn(name = "membre_id") // Specifies the column used for joining with the Membre table
    )
    private List<Membre> authors;

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public List<Membre> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Membre> authors) {
        this.authors = authors;
    }
}
