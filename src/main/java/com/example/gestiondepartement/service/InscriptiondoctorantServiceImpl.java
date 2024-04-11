package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.InscriptionDoctorant;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.DoctorantRepository;
import com.example.gestiondepartement.dao.repository.InscriptiondoctorantRepository;
import com.example.gestiondepartement.mappers.DoctorantMapper;
import com.example.gestiondepartement.mappers.DoctorantSearchDTOMapper;
import com.example.gestiondepartement.mappers.ProfesseurSearchDTOMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.DoctorantSearchDTO;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InscriptiondoctorantServiceImpl implements InscriptiondoctorantService {
    @Autowired
    InscriptiondoctorantRepository inscriptionDoctorantRepository;

    @Autowired
    DoctorantRepository doctorantRepository;
    @Autowired
    DoctorantSearchDTOMapper doctorantSearchDTOMapper;


    @Override
    public void createInscreption(Doctorant doctorant) {
        InscriptionDoctorant inscriptionDoctorant = new InscriptionDoctorant();
        inscriptionDoctorant.setDoctorant(doctorant);
        inscriptionDoctorant.setDate(LocalDate.now());
        inscriptionDoctorant.setValideadmin(false);
        inscriptionDoctorant.setValideprof(false);
        inscriptionDoctorantRepository.save(inscriptionDoctorant);
    }

    @Override
    public List<InscriptionDoctorant> getAllInscriptionDoctorant() {
        return inscriptionDoctorantRepository.findAll();
    }

    @Override
    public List<DoctorantDTO> getFalseValideAdminDoctoran() {
        List<Doctorant> Doctorants = inscriptionDoctorantRepository.findByValideadminFalseAndValideprofTrue().stream().map(InscriptionDoctorant::getDoctorant).toList();
        return Doctorants.stream().map(DoctorantMapper::toDoctorantDTO).toList();
    }

    @Override
    public List<DoctorantSearchDTO> getFalseValideAdminDoctoran2() {
        List<Doctorant> Doctorants = inscriptionDoctorantRepository.findByValideadminFalseAndValideprofTrue().stream().map(InscriptionDoctorant::getDoctorant).toList();
        return Doctorants.stream().map(doctorantSearchDTOMapper::toDto).toList();
    }

    @Override
    public List<DoctorantDTO> getFalseValideProfDoctoran(Long id) {
        List<Doctorant> Doctorants = inscriptionDoctorantRepository.findByValideprofFalse().stream().map(InscriptionDoctorant::getDoctorant).toList();
        List<Doctorant> DoctorantsFilter= new ArrayList<>();
        for(Doctorant doctorant1 : Doctorants){
            if (doctorant1.getEncadrant().getId()!=id){
                DoctorantsFilter.add(doctorant1);
            }
        }
        return DoctorantsFilter.stream().map(DoctorantMapper::toDoctorantDTO).toList();
    }

    @Override
    public void accepteAdminDoctorant(Long iDdoctorant) {
        InscriptionDoctorant inscriptionDoctorant = inscriptionDoctorantRepository.findInscriptionDoctorantByDoctorant_Id(iDdoctorant);
        inscriptionDoctorant.setValideadmin(true);
        inscriptionDoctorantRepository.save(inscriptionDoctorant);
    }

    @Override
    public void accepteProfDoctorant(Long iDdoctorant) {
        InscriptionDoctorant inscriptionDoctorant = inscriptionDoctorantRepository.findInscriptionDoctorantByDoctorant_Id(iDdoctorant);
        inscriptionDoctorant.setValideprof(true);
        inscriptionDoctorantRepository.save(inscriptionDoctorant);
    }

    @Override
    public void refuseDoctorant(Long doctorantID) {
        // Find the InscriptionDoctorant by Doctorant's ID
        InscriptionDoctorant inscriptionDoctorant = inscriptionDoctorantRepository.findInscriptionDoctorantByDoctorant_Id(doctorantID);
        if (inscriptionDoctorant != null) {
            // First, delete the InscriptionDoctorant to remove the reference
            inscriptionDoctorantRepository.delete(inscriptionDoctorant);
            // Then, delete the Doctorant since it's no longer referenced
            doctorantRepository.delete(inscriptionDoctorant.getDoctorant());
        }
    }


}
