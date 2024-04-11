package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.rest.EquipeDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;


@Mapper(componentModel = "spring")
public interface EquipeDTOMapper {
    EquipeDTO toDto(Equipe equipe);
}
