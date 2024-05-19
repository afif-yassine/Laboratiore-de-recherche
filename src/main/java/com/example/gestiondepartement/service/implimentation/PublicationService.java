package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.rest.PublicationDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PublicationService {

    PublicationDTO createPublication(PublicationDTO publicationDTO);

    PublicationDTO updatePublication(Long id, PublicationDTO publicationDTO);

    void deletePublication(Long id);

    PublicationDTO getPublicationById(Long id);

    List<PublicationDTO> getAllPublications();
}
