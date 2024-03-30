package com.example.gestiondepartement.rest;

import com.example.gestiondepartement.dao.Professeur;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class EquipeDTO {
    @Id
    private Long id;

    private String nom;

    private String axederecherche;

    private String description;

    private Long idchefequipe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAxederecherche() {
        return axederecherche;
    }

    public void setAxederecherche(String axederecherche) {
        this.axederecherche = axederecherche;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getIdchefequipe() {
        return idchefequipe;
    }

    public void setIdchefequipe(Long idchefequipe) {
        this.idchefequipe = idchefequipe;
    }
}
