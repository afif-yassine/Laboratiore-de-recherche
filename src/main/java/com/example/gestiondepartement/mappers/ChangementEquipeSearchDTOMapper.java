package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.ChangementEquipe;
import com.example.gestiondepartement.rest.ChangementEquipeDTO;
import com.example.gestiondepartement.rest.ChangementEquipeSearchDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {EquipeDTOMapper.class , ProfesseurDTOMapper.class})
public interface ChangementEquipeSearchDTOMapper {
    ChangementEquipeSearchDTO toDto(ChangementEquipe changementEquipe);
}
