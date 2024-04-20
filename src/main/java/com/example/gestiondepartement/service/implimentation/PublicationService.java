package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.rest.PublicationDTO;
import org.springframework.stereotype.Service;

@Service
public interface PublicationService {
    PublicationDTO createPublication(PublicationDTO publicationDTO);
}
