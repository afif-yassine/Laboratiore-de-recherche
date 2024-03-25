package Dao;

import jakarta.persistence.*;

@Entity
@Table(name = "Professeur")
public class Professeur extends Membre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profId ;
    private String status ;
    private Boolean admin ;
    private Boolean chefEquipe ;

    @ManyToOne
    @JoinColumn(name = "idequipe")
    private Equipe equipe;

    public Professeur() {
    }

    public Long getProfId() {
        return profId;
    }

    public void setProfId(Long profId) {
        this.profId = profId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Boolean getChefEquipe() {
        return chefEquipe;
    }

    public void setChefEquipe(Boolean chefEquipe) {
        this.chefEquipe = chefEquipe;
    }

    public Equipe getEquipe() {
        return equipe;
    }

    public void setEquipe(Equipe idEquipe) {
        this.equipe = idEquipe;
    }
}
