package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.repository.DoctorantRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.DoctorantMapper;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.DoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorantServiceImpl implements DoctorantService {
    @Autowired
    DoctorantRepository doctorantRepository;

    @Autowired
    ProfesseurRepository professeurRepository;
    @Override
    public DoctorantDTO insertDoctorantInDataBase(DoctorantDTO doctorantDTO){
        Doctorant doctorant = DoctorantMapper.toDoctorant(doctorantDTO);
        doctorant.setEncadrant(professeurRepository.findById(doctorantDTO.getIdencadrant()).get());
        doctorantRepository.save(doctorant);
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
    public List<DoctorantDTO> getAllDoctorant() {
        List<Doctorant> doctorants = doctorantRepository.findAll();
        return doctorants.stream().map(DoctorantMapper::toDoctorantDTO).toList();
    }
}
