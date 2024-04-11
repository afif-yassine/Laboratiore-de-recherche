package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface ProfesseurDTOMapper {
    ProfesseurDTO toDto(Professeur professeur);
}
