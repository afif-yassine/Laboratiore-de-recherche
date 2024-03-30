package com.example.gestiondepartement.dao;

import jakarta.persistence.*;

@Entity
@Table(name = "Doctorant")
public class Doctorant extends Membre {
    @ManyToOne
    @JoinColumn(name = "idencadrant")
    private Professeur encadrant;

    public Professeur getEncadrant() {
        return encadrant;
    }

    public void setEncadrant(Professeur encadrant) {
        this.encadrant = encadrant;
    }
}
