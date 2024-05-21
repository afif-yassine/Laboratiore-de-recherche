package com.example.gestiondepartement.rest;;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class MembreDTO {

        private Long id;
        private String chatpassword;
        private boolean active;
        private String password;
        private String nom ;
        private String prenom ;
        private String email ;
        private String numero ;

    }
