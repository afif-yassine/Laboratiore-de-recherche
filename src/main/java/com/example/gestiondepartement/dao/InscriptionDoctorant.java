package com.example.gestiondepartement.dao;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "inscriptiondoctorant")
public class InscriptionDoctorant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctorantid")
    private Doctorant doctorant;
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    private boolean valideadmin;
    private boolean valideprof;


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isValideadmin() {
        return valideadmin;
    }

    public void setValideadmin(boolean valideAdmin) {
        this.valideadmin = valideAdmin;
    }

    public Doctorant getDoctorant() {
        return doctorant;
    }

    public void setDoctorant(Doctorant doctorant) {
        this.doctorant = doctorant;
    }

    public boolean isValideprof() {
        return valideprof;
    }

    public void setValideprof(boolean valideProf) {
        this.valideprof = valideProf;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



}
