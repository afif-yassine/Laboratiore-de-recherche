package com.example.gestiondepartement.dao;


import jakarta.persistence.*;



@Entity
public class Equipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String axederecherche;

    private String description;

    @OneToOne
    @JoinColumn(name = "chefequipe")
    private Professeur chefequipe;


    public Professeur getChefequipe() {
        return chefequipe;
    }

    public void setChefequipe(Professeur idchefequipe) {
        this.chefequipe = idchefequipe;
    }

    public Equipe() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long idequipe) {
        this.id = idequipe;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nomequipe) {
        this.nom = nomequipe;
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
}
