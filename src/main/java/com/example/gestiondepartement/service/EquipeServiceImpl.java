package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.EquipeMapper;
import com.example.gestiondepartement.rest.EquipeDTO;
import com.example.gestiondepartement.service.implimentation.EquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EquipeServiceImpl implements EquipeService {
     @Autowired
     public EquipeRepository equipeRepository;

     @Autowired
     public ProfesseurRepository professeurRepository;

     @Override
     public String deleteById(Long id) {
          Equipe equipe = equipeRepository.findById(id).get();
          equipeRepository.deleteById(id);
          return "Equipe "+equipe.getNom()+" deleted sucessfuly!";
     }

     @Override
     public EquipeDTO create(EquipeDTO equipeDTO) {
          Equipe equipe = EquipeMapper.toEquipe(equipeDTO);
          if(equipeDTO.getIdchefequipe()!=null)
          equipe.setChefequipe(professeurRepository.findById(equipeDTO.getIdchefequipe()).get());
          equipeRepository.save(equipe);
          return EquipeMapper.toEquipeDTO(equipe);
     }

     @Override
     public List<EquipeDTO> getAllEquipe() {
          List<Equipe> equipes = equipeRepository.findAll();
          return equipes.stream().map(EquipeMapper::toEquipeDTO).toList();
     }

     @Override
     public EquipeDTO geById(Long id) {
          Equipe equipe = equipeRepository.findById(id).get();
          return EquipeMapper.toEquipeDTO(equipe);
     }

     @Override
     public EquipeDTO updateEquipe(EquipeDTO equipeDTO) {
          Equipe equipe = EquipeMapper.toEquipe(equipeDTO);
          equipe.setChefequipe(professeurRepository.findById(equipeDTO.getIdchefequipe()).get());
          equipeRepository.save(equipe);
          return EquipeMapper.toEquipeDTO(equipe);
     }


}
