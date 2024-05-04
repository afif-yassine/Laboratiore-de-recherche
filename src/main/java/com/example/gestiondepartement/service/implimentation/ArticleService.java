package com.example.gestiondepartement.service.implimentation;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.rest.ArticleDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {
    ArticleDTO createArticle(ArticleDTO articleDTO);

    List<ArticleDTO> AllArticleNoValide();

    List<ArticleDTO> NoActiveArticle();
}
