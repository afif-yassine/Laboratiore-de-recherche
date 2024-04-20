package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Publication;
import com.example.gestiondepartement.rest.PublicationDTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PublicationMapper {

    PublicationMapper INSTANCE = Mappers.getMapper(PublicationMapper.class);

    @Mapping(target = "articleId", source = "article.id")
    PublicationDTO publicationToPublicationDTO(Publication publication);

    @Mapping(target = "article.id", source = "articleId")
    Publication publicationDTOToPublication(PublicationDTO publicationDTO);
}

