package Dao;

import jakarta.persistence.*;

@Entity
public class Equipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idequipe;

    private String nomequipe;

    private String axederecherche;


    private String description;

    public Equipe() {
    }

    public Long getIdequipe() {
        return idequipe;
    }

    public void setIdequipe(Long idequipe) {
        this.idequipe = idequipe;
    }

    public String getNomequipe() {
        return nomequipe;
    }

    public void setNomequipe(String nomequipe) {
        this.nomequipe = nomequipe;
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
