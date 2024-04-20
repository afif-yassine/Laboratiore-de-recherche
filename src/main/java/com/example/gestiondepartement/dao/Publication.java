package com.example.gestiondepartement.dao;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Publication")
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String doi;

    @Temporal(TemporalType.DATE)
    private Date publicationDate;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article; // This assumes you have an Article entity defined

    // Default constructor
    public Publication() {}

    // Constructor with all fields
    public Publication(Long id, String doi, Date publicationDate, Article article) {
        this.id = id;
        this.doi = doi;
        this.publicationDate = publicationDate;
        this.article = article;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }
}
