package com.example.gestiondepartement.dao;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.dao.Membre;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Professeur")
public class Professeur extends Membre {

    private String status ;
    private Boolean isadmin;
    private Boolean ischef;

    @ManyToOne
    @JoinColumn(name = "equipe")
    private Equipe equipe;

    public Professeur(String status, Boolean isadmin, Boolean ischef, Equipe equipe) {
        this.status = status;
        this.isadmin = isadmin;
        this.ischef = ischef;
        this.equipe = equipe;
    }


    public Professeur() {
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getIsadmin() {
        return isadmin;
    }

    public void setIsadmin(Boolean admin) {
        this.isadmin = admin;
    }

    public Boolean getIschef() {
        return ischef;
    }

    public void setIschef(Boolean chefEquipe) {
        this.ischef = chefEquipe;
    }

    public Equipe getEquipe() {
        return equipe;
    }

    public void setEquipe(Equipe idEquipe) {
        this.equipe = idEquipe;
    }
}
