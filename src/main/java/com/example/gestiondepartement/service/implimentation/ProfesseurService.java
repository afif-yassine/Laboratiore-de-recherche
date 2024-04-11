package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.rest.ChangementEquipeDTO;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.rest.ProfesseurSearchDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProfesseurService {
    public void deletProfesseur(Long membreid);
    public ProfesseurDTO saveProfesseur(ProfesseurDTO professeur);

    List<ProfesseurDTO> getAllProf();

    List<ProfesseurDTO> getProfesseursByEquipeId(long id);


    ProfesseurDTO updateProfesseur(ProfesseurDTO professeurDTO);

    List<ProfesseurDTO> GetAllNoActive();

    void accepteProf(Long id);

    void refuseProf(Long id);

    ProfesseurDTO getProfesseursById(long id);

    List<DoctorantDTO> getFalseValideProfDoctoran(Long id);

    List<ProfesseurSearchDTO> GetAllNoActive2();

    ProfesseurSearchDTO getProfesseursSearchById(long id);
}
