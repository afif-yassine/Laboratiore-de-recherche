package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.rest.DoctorantSearchDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProfesseurDTOMapper.class})
public interface DoctorantSearchDTOMapper{
    DoctorantSearchDTO toDto(Doctorant doctorant);
}
