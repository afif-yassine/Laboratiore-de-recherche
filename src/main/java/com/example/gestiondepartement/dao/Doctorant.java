package com.example.gestiondepartement.dao;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Table(name = "Doctorant")
public class Doctorant extends Membre {
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "idencadrant")
    private Professeur encadrant;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
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
