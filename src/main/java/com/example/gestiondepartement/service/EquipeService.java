package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.rest.EquipeDTO;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface EquipeService {

   public EquipeDTO create(EquipeDTO equipeDTO);


   List<EquipeDTO> getAllEquipe();

   EquipeDTO geById(String id);

}
