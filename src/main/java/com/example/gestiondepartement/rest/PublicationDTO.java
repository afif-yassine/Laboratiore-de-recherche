package com.example.gestiondepartement.rest;

import java.util.Date;

public class PublicationDTO {

    private Long id;
    private String doi;
    private Date publicationDate;
    private Long articleId; // Assuming you want to reference the associated article by ID

    // Default constructor
    public PublicationDTO() {}

    // Constructor with all fields
    public PublicationDTO(Long id, String doi, Date publicationDate, Long articleId) {
        this.id = id;
        this.doi = doi;
        this.publicationDate = publicationDate;
        this.articleId = articleId;
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

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }
}
