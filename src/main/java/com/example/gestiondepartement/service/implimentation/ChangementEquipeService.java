package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.ChangementEquipe;
import com.example.gestiondepartement.rest.ChangementEquipeDTO;
import com.example.gestiondepartement.rest.ChangementEquipeSearchDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChangementEquipeService {

    boolean CheckIsEquipeAreChange(ChangementEquipeDTO changementEquipeDTO);
    ChangementEquipeDTO CreateChangement(ChangementEquipeDTO changementEquipeDTO);

    List<ChangementEquipeDTO> getStatusFalse();

    ProfesseurDTO updateEquipe(Long ID);

    void deleteChangement(Long id);

    List<ChangementEquipeDTO> getAllChangement();

    List<ChangementEquipeSearchDTO> getStatusFalse2();

}
