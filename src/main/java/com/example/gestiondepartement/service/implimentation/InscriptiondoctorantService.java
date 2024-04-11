package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.InscriptionDoctorant;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.DoctorantSearchDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InscriptiondoctorantService {
    List<InscriptionDoctorant> getAllInscriptionDoctorant();

    void createInscreption(Doctorant doctorant);


    List<DoctorantDTO> getFalseValideAdminDoctoran();

    List<DoctorantDTO> getFalseValideProfDoctoran(Long id);

    void accepteAdminDoctorant(Long IDinscriptiondoctorant);

    void accepteProfDoctorant(Long iDinscriptiondoctorant);

    void refuseDoctorant(Long doctorantID);

    List<DoctorantSearchDTO> getFalseValideAdminDoctoran2();
}
