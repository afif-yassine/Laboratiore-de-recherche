package com.example.gestiondepartement.service;
import com.example.gestiondepartement.dao.Publication;
import com.example.gestiondepartement.dao.repository.PublicationRepository;
import com.example.gestiondepartement.mappers.PublicationMapper;
import com.example.gestiondepartement.rest.PublicationDTO;
import com.example.gestiondepartement.service.implimentation.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicationServiceImpl implements PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;  // Assume you have a repository

    @Autowired
    private PublicationMapper publicationMapper;

    @Override
    public PublicationDTO createPublication(PublicationDTO publicationDTO) {
        Publication publication = publicationMapper.publicationDTOToPublication(publicationDTO);
        publication = publicationRepository.save(publication);
        return publicationMapper.publicationToPublicationDTO(publication);
    }

    @Override
    public PublicationDTO updatePublication(Long id, PublicationDTO publicationDTO) {
        Publication existingPublication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found with id " + id));
        existingPublication.setContent(publicationDTO.getContent());
        existingPublication.setDatepublished(publicationDTO.getDatePublished());
        existingPublication.setPhoto(publicationMapper.decodePhoto(publicationDTO.getPhotoBase64()));
        existingPublication.setLocal(publicationDTO.getLocal());
        existingPublication = publicationRepository.save(existingPublication);
        return publicationMapper.publicationToPublicationDTO(existingPublication);

    }

    @Override
    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }

    @Override
    public PublicationDTO getPublicationById(Long id) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found with id " + id));
        return publicationMapper.publicationToPublicationDTO(publication);
    }

    @Override
    public List<PublicationDTO> getAllPublications() {
        List<Publication> publications = publicationRepository.findAll();
        return publications.stream()
                .map(publicationMapper::publicationToPublicationDTO)
                .collect(Collectors.toList());    }
}
