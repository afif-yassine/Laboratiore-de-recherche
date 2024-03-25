package Dao;

import jakarta.persistence.*;

@Entity
public class Encadrement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idencadrement;
    @OneToOne
    @JoinColumn(name = "doctorantid")
    private Doctorant doctorant;
    @OneToOne
    @JoinColumn(name = "profid")
    private Professeur professeur;
    @OneToOne
    @JoinColumn(name = "idCo-encadront")
    private Professeur co_encadron;

    // Constructors, getters, and setters
}
