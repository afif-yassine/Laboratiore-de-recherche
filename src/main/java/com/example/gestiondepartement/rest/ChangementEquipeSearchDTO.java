package com.example.gestiondepartement.rest;

import java.time.LocalDate;

public class ChangementEquipeSearchDTO {

    private Long id;

    private ProfesseurDTO prof;

    private EquipeDTO newEquipe;

    private LocalDate date = LocalDate.now();;

    private Boolean Status_change ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProfesseurDTO getProf() {
        return prof;
    }

    public void setProf(ProfesseurDTO prof) {
        this.prof = prof;
    }

    public EquipeDTO getNewEquipe() {
        return newEquipe;
    }

    public void setNewEquipe(EquipeDTO newEquipe) {
        this.newEquipe = newEquipe;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getStatus_change() {
        return Status_change;
    }

    public void setStatus_change(Boolean status_change) {
        Status_change = status_change;
    }
}
