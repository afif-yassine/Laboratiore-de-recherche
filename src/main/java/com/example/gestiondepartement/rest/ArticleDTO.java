package com.example.gestiondepartement.rest;

import java.util.Date;
import java.util.List;

public class ArticleDTO {

    private Long id;
    private String titre;
    private String description;
    private Date publicationDate;
    // Assuming you want to only send basic member information like IDs or names
    private List<Long> authorIds;

    // Constructors
    public ArticleDTO() {}

    public ArticleDTO(Long id, String titre, String description, Date publicationDate, List<Long> authorIds) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.publicationDate = publicationDate;
        this.authorIds = authorIds;
    }

    // Getters and Setters
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

    public List<Long> getAuthorIds() {
        return authorIds;
    }

    public void setAuthorIds(List<Long> authorIds) {
        this.authorIds = authorIds;
    }
}

