package com.example.gestiondepartement.service;
import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Publication;
import com.example.gestiondepartement.dao.repository.ArticleRepository;
import com.example.gestiondepartement.dao.repository.PublicationRepository;
import com.example.gestiondepartement.mappers.PublicationMapper;
import com.example.gestiondepartement.rest.PublicationDTO;
import com.example.gestiondepartement.service.implimentation.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
public class PublicationServiceImpl implements PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private PublicationMapper publicationMapper;


    public PublicationDTO createPublication(PublicationDTO publicationDTO) {
        // Convert DTO to entity using MapStruct
        Publication publication = publicationMapper.publicationDTOToPublication(publicationDTO);

         Article article = articleRepository.findById(publicationDTO.getArticleId()).get();
         publication.setArticle(article);

        // Save the publication entity
        publicationRepository.save(publication);

        // Convert the saved entity back to DTO
        PublicationDTO savedPublicationDTO = publicationMapper.publicationToPublicationDTO(publication);

        // Return the saved publication DTO
        return savedPublicationDTO;
    }
}
