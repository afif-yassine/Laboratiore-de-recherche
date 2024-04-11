package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.ChangementEquipe;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.ChangementEquipeRepository;
import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.ChangementEquipeMapper;
import com.example.gestiondepartement.mappers.ChangementEquipeSearchDTOMapper;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.ChangementEquipeDTO;
import com.example.gestiondepartement.rest.ChangementEquipeSearchDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.implimentation.ChangementEquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChangementEquipeServiceImpl implements ChangementEquipeService {

    @Autowired
    ChangementEquipeRepository changementEquipeRepository;
    @Autowired
    ProfesseurRepository professeurRepository;
    @Autowired
    EquipeRepository equipeRepository;
    @Autowired
    ChangementEquipeSearchDTOMapper changementEquipeSearchDTOMapper;


    public boolean CheckIsEquipeAreChange(ChangementEquipeDTO changementEquipeDTO){
        if(professeurRepository.findById(changementEquipeDTO.getProfID()).get().getEquipe().getId() != changementEquipeDTO.getNewEquipe())return true;
        else return false;
    }

    @Override
    public ChangementEquipeDTO CreateChangement(ChangementEquipeDTO changementEquipeDTO) {
        if(CheckIsEquipeAreChange(changementEquipeDTO)) {
            ChangementEquipe changementEquipe = ChangementEquipeMapper.toChangementEquipe(changementEquipeDTO);
            changementEquipe.setProf(professeurRepository.findById(changementEquipeDTO.getProfID()).get());
            changementEquipe.setStatusChange(false);
            changementEquipeRepository.save(changementEquipe);
            return ChangementEquipeMapper.toChangementEquipeDTO(changementEquipe);
        }else {return null;}
    }
//---------------------------Admin----------------------------------//
    @Override
    public List<ChangementEquipeDTO> getStatusFalse() {
        List<ChangementEquipe> changementEquipes = changementEquipeRepository.findBystatusChangeFalse();
        return changementEquipes.stream().map(ChangementEquipeMapper::toChangementEquipeDTO).toList();
    }

    @Override
    public List<ChangementEquipeSearchDTO> getStatusFalse2() {
        List<ChangementEquipe> changementEquipes = changementEquipeRepository.findBystatusChangeFalse();
        return changementEquipes.stream().map(changementEquipeSearchDTOMapper::toDto).toList();
    }

    @Override
    public ProfesseurDTO updateEquipe(Long ID) {
        Professeur professeur = changementEquipeRepository.findById(ID).get().getProf();
        professeur.setEquipe(equipeRepository.findById(changementEquipeRepository.findById(ID).get().getNewequipe()).get());
        professeurRepository.save(professeur);
        ChangementEquipe changementEquipe = changementEquipeRepository.findById(ID).get();
        changementEquipe.setStatusChange(true);
        changementEquipeRepository.save(changementEquipe);
        return ProfesseurMapper.toProfesseurDTO(professeur);
    }

    @Override
    public void deleteChangement(Long id) {
        changementEquipeRepository.deleteById(id);
    }

    @Override
    public List<ChangementEquipeDTO> getAllChangement() {
        List<ChangementEquipe> changementEquipes = changementEquipeRepository.findAll();
        return changementEquipes.stream().map(ChangementEquipeMapper::toChangementEquipeDTO).toList();
    }
}
