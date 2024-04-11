package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.ChangementEquipe;
import com.example.gestiondepartement.rest.ChangementEquipeDTO;

public class ChangementEquipeMapper {

    public static ChangementEquipe toChangementEquipe (ChangementEquipeDTO changementEquipeDto){
        ChangementEquipe changementEquipe = new ChangementEquipe();
        changementEquipe.setId(changementEquipeDto.getId());
        changementEquipe.setNewequipe(changementEquipeDto.getNewEquipe());
        changementEquipe.setDate(changementEquipeDto.getDate());
        changementEquipe.setStatusChange(changementEquipeDto.getStatus_change());
        return changementEquipe;
    }

    public static ChangementEquipeDTO toChangementEquipeDTO (ChangementEquipe changementEquipe){
        ChangementEquipeDTO changementEquipeDto = new ChangementEquipeDTO();
        changementEquipeDto.setId(changementEquipe.getId());
        changementEquipeDto.setNewEquipe(changementEquipe.getNewequipe());
        changementEquipeDto.setDate(changementEquipe.getDate());
        changementEquipeDto.setStatus_change(changementEquipe.getStatusChange());
        changementEquipeDto.setProfID(changementEquipe.getProf().getId());
        return changementEquipeDto;
    }
}
