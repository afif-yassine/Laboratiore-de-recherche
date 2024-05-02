package com.example.gestiondepartement.rest;

import com.example.gestiondepartement.dao.Membre;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class GeneraleArticleDTO {

    private Long id;
    private String titre;
    private String description;
    private Date publicationDate;
    private Boolean isActive;
    // Assuming you want to only send basic member information like IDs or names
    private List<Membre> authorIds;

    // Constructors
    public GeneraleArticleDTO() {
    }

    public GeneraleArticleDTO(Long id, String titre, String description, Date publicationDate, List<Long> authorIds, Boolean isActive) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.publicationDate = publicationDate;
        //todo : authorIds  Long -> Membre
        this.isActive = isActive;
    }

    // Getters and Setters

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
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

}
