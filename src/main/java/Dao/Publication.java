package Dao;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Publication {
    @OneToOne   //One PUB to One Article
    @JoinColumn(name = "Referance_OF_Article_on publication ")
    private Article doi;

    @ManyToOne
    @JoinColumn(name = "membreid")
    private Membre membreid;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pubid;


    private Date datepub;


    // Constructors
    public Publication() {
    }

    // getters, and setters


}