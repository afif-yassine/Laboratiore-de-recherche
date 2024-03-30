package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.EquipeMapper;
import com.example.gestiondepartement.rest.EquipeDTO;
import com.example.gestiondepartement.service.EquipeService;
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
     public EquipeDTO create(EquipeDTO equipeDTO) {
          Equipe equipe = EquipeMapper.toEquipe(equipeDTO);
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
     public EquipeDTO geById(String id) {
          return null;
     }
}
