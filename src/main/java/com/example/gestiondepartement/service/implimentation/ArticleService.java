package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.rest.ArticleDTO;
import org.springframework.stereotype.Service;

@Service
public interface ArticleService {
    ArticleDTO createArticle(ArticleDTO articleDTO);
}
