package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorantService {

    List<DoctorantDTO> getAllDoctorant();
    DoctorantDTO  insertDoctorantInDataBase(DoctorantDTO doctorantDTO);

    void removeDoctorant(Long id);

    ProfesseurDTO getEncadrantDeDoctorant(Long id);

    DoctorantDTO updateDoctorant(DoctorantDTO doctorantDTO);

    DoctorantDTO getDoctorantById(Long id);
}
