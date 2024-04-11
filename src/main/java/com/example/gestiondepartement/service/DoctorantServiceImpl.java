package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.repository.ChangementEquipeRepository;
import com.example.gestiondepartement.dao.repository.DoctorantRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.DoctorantMapper;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.implimentation.ChangementEquipeService;
import com.example.gestiondepartement.service.implimentation.DoctorantService;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorantServiceImpl implements DoctorantService {
    @Autowired
    DoctorantRepository doctorantRepository;

    @Autowired
    ProfesseurRepository professeurRepository;

    @Autowired
    InscriptiondoctorantService inscriptiondoctorantService;

    @Override
    public DoctorantDTO insertDoctorantInDataBase(DoctorantDTO doctorantDTO){
        Doctorant doctorant = DoctorantMapper.toDoctorant(doctorantDTO);
        doctorant.setEncadrant(professeurRepository.findById(doctorantDTO.getIdencadrant()).get());
        if(doctorantDTO.getCoEncadrant()!=null)
        doctorant.setCoEncadrant(professeurRepository.findById(doctorantDTO.getCoEncadrant()).get());
        doctorantRepository.save(doctorant);
        inscriptiondoctorantService.createInscreption(doctorant);
        return DoctorantMapper.toDoctorantDTO(doctorant);
    }

    @Override
    public String removeDoctorant(Long id) {
        DoctorantDTO doctorantDTO = DoctorantMapper.toDoctorantDTO(doctorantRepository.findById(id).get());
        doctorantRepository.deleteById(id);
        return doctorantDTO.getPrenom()+" "+doctorantDTO.getNom()+" is Deleted Successfully" ;
    }

    @Override
    public ProfesseurDTO getEncadrantDeDoctorant(Long id) {
        return ProfesseurMapper.toProfesseurDTO(doctorantRepository.findById(id).get().getEncadrant());
    }

    @Override
    public DoctorantDTO updateDoctorant(DoctorantDTO doctorantDTO) {
        Doctorant doctorant = DoctorantMapper.toDoctorant(doctorantDTO);
        doctorant.setEncadrant(professeurRepository.findById(doctorantDTO.getIdencadrant()).get());
        doctorant.setCoEncadrant(professeurRepository.findById(doctorantDTO.getCoEncadrant()).get());
        doctorantRepository.save(doctorant);
        return DoctorantMapper.toDoctorantDTO(doctorant);
    }

    @Override
    public List<DoctorantDTO> getAllDoctorant() {
        List<Doctorant> doctorants = doctorantRepository.findAll();
        return doctorants.stream().map(DoctorantMapper::toDoctorantDTO).toList();
    }

}
