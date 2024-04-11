package com.example.gestiondepartement.rest;

import com.example.gestiondepartement.dao.Professeur;
import jakarta.persistence.Id;

public class DoctorantDTO {

    private Long id;

    private String nom ;

    private String prenom ;
    private String email ;
    private String numero ;
    private Long idencadrant;


    private boolean active;
    private String password;
    private Long coEncadrant;

    public Long getCoEncadrant() {
        return coEncadrant;
    }

    public void setCoEncadrant(Long coEncadrant) {
        this.coEncadrant = coEncadrant;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }


    public Long getIdencadrant() {
        return idencadrant;
    }

    public void setIdencadrant(Long idencadrant) {
        this.idencadrant = idencadrant;
    }

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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
