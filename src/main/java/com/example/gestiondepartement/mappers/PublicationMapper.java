package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Publication;
import com.example.gestiondepartement.rest.PublicationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.Base64;


@Mapper(componentModel = "spring")
public interface PublicationMapper {

    PublicationMapper INSTANCE = Mappers.getMapper(PublicationMapper.class);

    @Mapping(source = "datepublished", target = "datePublished")
    PublicationDTO publicationToPublicationDTO(Publication publication);

    @Mapping(source = "datePublished", target = "datepublished")
    Publication publicationDTOToPublication(PublicationDTO dto);
}
