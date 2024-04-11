package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.rest.EquipeDTO;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EquipeService {

   public String deleteById(Long id);

   public EquipeDTO create(EquipeDTO equipeDTO);


   List<EquipeDTO> getAllEquipe();

   EquipeDTO geById(Long id);

   EquipeDTO updateEquipe(EquipeDTO equipeDTO);
}
