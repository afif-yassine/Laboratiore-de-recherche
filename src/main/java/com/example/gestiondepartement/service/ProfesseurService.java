package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProfesseurService {
    public String deletProfesseur(Long membreid);
    public ProfesseurDTO saveProfesseur(ProfesseurDTO professeur);

    List<ProfesseurDTO> getAllProf();

    List<ProfesseurDTO> getProfesseursByEquipeId(long id);


    ProfesseurDTO updateProfesseur(ProfesseurDTO professeurDTO);
}
