package com.example.gestiondepartement.dao;


import jakarta.persistence.*;

@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Membre")
@Entity
public abstract class Membre {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom ;
    private String prenom ;
    private String email ;
    private String numero ;

    public Membre() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long membreId) {
        this.id = membreId;
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
