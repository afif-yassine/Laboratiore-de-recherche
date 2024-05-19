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

    @Mapping(target = "photoBase64", expression = "java(encodePhoto(publication.getPhoto()))")
    PublicationDTO publicationToPublicationDTO(Publication publication);

    @Mapping(target = "photo", expression = "java(decodePhoto(dto.getPhotoBase64()))")
    Publication publicationDTOToPublication(PublicationDTO dto);

    default String encodePhoto(byte[] photo) {
        return photo != null ? Base64.getEncoder().encodeToString(photo) : null;
    }

    default byte[] decodePhoto(String photoBase64) {
        return photoBase64 != null ? Base64.getDecoder().decode(photoBase64) : null;
    }
}
