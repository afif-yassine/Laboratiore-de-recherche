package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;

public class ProfesseurMapper {

    @Autowired
    EquipeRepository equipeRepository;

    public static ProfesseurDTO toProfesseurDTO(Professeur professeur){

        ProfesseurDTO professeurDTO = new ProfesseurDTO();

        professeurDTO.setId(professeur.getId());
        professeurDTO.setNom(professeur.getNom());
        professeurDTO.setEmail(professeur.getEmail());
        professeurDTO.setPrenom(professeur.getPrenom());
        professeurDTO.setNumero(professeur.getNumero());

        //verifier le reste

        professeurDTO.setIsadmin(professeur.getIsadmin());
        professeurDTO.setIschef(professeur.getIschef());
        professeurDTO.setStatus(professeur.getStatus());
        if(professeur.getEquipe() != null)
        professeurDTO.setIdequipe(professeur.getEquipe().getId());

        return professeurDTO;

    }

    public static Professeur toProfesseur(ProfesseurDTO professeurDTO){

        Professeur professeur = new Professeur();

        professeur.setId(professeurDTO.getId());
        professeur.setNom(professeurDTO.getNom());
        professeur.setEmail(professeurDTO.getEmail());
        professeur.setPrenom(professeurDTO.getPrenom());
        professeur.setNumero(professeurDTO.getNumero());


        //verifier le reste

        professeur.setIsadmin(professeurDTO.getIsadmin());
        professeur.setIschef(professeurDTO.getIschef());
        professeur.setStatus(professeurDTO.getStatus());


        return professeur;

    }

}
