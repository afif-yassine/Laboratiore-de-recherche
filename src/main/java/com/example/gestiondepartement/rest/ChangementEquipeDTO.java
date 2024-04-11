package com.example.gestiondepartement.rest;

import jakarta.persistence.Id;
import org.springframework.data.annotation.CreatedDate;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.Date;

public class ChangementEquipeDTO {

    private Long id;

    private Long profID;

    private Long newEquipe;

    private LocalDate date = LocalDate.now();;

    private Boolean Status_change ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProfID() {
        return profID;
    }

    public void setProfID(Long profID) {
        this.profID = profID;
    }

    public Long getNewEquipe() {
        return newEquipe;
    }

    public void setNewEquipe(Long newEquipe) {
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
