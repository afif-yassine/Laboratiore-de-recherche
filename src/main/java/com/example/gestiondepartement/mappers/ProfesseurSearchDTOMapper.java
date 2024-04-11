package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.rest.ProfesseurSearchDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;


@Mapper(componentModel = "spring", uses = {EquipeDTOMapper.class})
public interface ProfesseurSearchDTOMapper {
    ProfesseurSearchDTO toDto(Professeur professeur);
}
