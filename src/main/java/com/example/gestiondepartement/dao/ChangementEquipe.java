package com.example.gestiondepartement.dao;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "changement_equipe")
public class ChangementEquipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @ManyToOne
    @JoinColumn(name = "prof")
    private Professeur prof;

    private Long newequipe;
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @Column(name = "status_change")
    private Boolean statusChange;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Professeur getProf() {
        return prof;
    }

    public void setProf(Professeur prof) {
        this.prof = prof;
    }

    public Long getNewequipe() {
        return newequipe;
    }

    public void setNewequipe(Long newEquipe) {
        this.newequipe = newEquipe;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate    date) {
        this.date = date;
    }

    public Boolean getStatusChange() {
        return statusChange;
    }

    public void setStatusChange(Boolean status_change) {
        this.statusChange = status_change;
    }
}
