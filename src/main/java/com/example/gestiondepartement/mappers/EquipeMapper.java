package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.rest.EquipeDTO;

public class EquipeMapper {

    public static EquipeDTO toEquipeDTO (Equipe equipe){

        EquipeDTO equipeDTO = new EquipeDTO();
        equipeDTO.setId(equipe.getId());
        equipeDTO.setAxederecherche(equipe.getAxederecherche());
        equipeDTO.setDescription(equipe.getDescription());
        equipeDTO.setNom(equipe.getNom());
        if (equipe.getChefequipe() != null)
        equipeDTO.setIdchefequipe(equipe.getChefequipe().getId());
        return equipeDTO;
    }

    public static Equipe toEquipe (EquipeDTO equipeDTO){


        Equipe equipe = new Equipe();
        equipe.setId(equipeDTO.getId());
        equipe.setAxederecherche(equipeDTO.getAxederecherche());
        equipe.setDescription(equipeDTO.getDescription());
        equipe.setNom(equipeDTO.getNom());
        //equipe.setChefEquipe() is in equipeservice ( equipeRepository note allow here !)
        return equipe;
    }
}
