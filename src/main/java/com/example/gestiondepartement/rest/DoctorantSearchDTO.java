package com.example.gestiondepartement.rest;

public class DoctorantSearchDTO {

    private Long id;

    private String nom ;

    private String prenom ;
    private String email ;
    private String numero ;
    private ProfesseurDTO encadrant;


    private boolean active;
    private String password;
    private ProfesseurDTO coEncadrant;

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

    public ProfesseurDTO getEncadrant() {
        return encadrant;
    }

    public void setEncadrant(ProfesseurDTO encadrant) {
        this.encadrant = encadrant;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ProfesseurDTO getCoEncadrant() {
        return coEncadrant;
    }

    public void setCoEncadrant(ProfesseurDTO coEncadrant) {
        this.coEncadrant = coEncadrant;
    }
}
