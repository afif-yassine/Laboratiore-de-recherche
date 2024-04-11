package com.example.gestiondepartement.dao;

import jakarta.persistence.*;

@Entity
@Table(name = "Doctorant")
public class Doctorant extends Membre {
    @ManyToOne
    @JoinColumn(name = "idencadrant")
    private Professeur encadrant;
    @ManyToOne
    @JoinColumn(name = "co_encadrant")
    private Professeur coEncadrant;


    public Professeur getCoEncadrant() {
        return coEncadrant;
    }

    public void setCoEncadrant(Professeur coEncadrant) {
        this.coEncadrant = coEncadrant;
    }

    public Professeur getEncadrant() {
        return encadrant;
    }

    public void setEncadrant(Professeur encadrant) {
        this.encadrant = encadrant;
    }
}
