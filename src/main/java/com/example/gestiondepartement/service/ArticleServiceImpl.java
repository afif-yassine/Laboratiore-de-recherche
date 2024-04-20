package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.repository.ArticleRepository;
import com.example.gestiondepartement.mappers.ArticleMapper;
import com.example.gestiondepartement.rest.ArticleDTO;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleMapper articleMapper;
    @Override
    public ArticleDTO createArticle(ArticleDTO articleDTO) {
        // Convert DTO to entity
        Article article = articleMapper.articleDTOToArticle(articleDTO);

        // Save the new article
        article = articleRepository.save(article);

        // Convert the saved entity back to DTO
        ArticleDTO savedArticleDTO = articleMapper.articleToArticleDTO(article);

        // Return the saved DTO
        return savedArticleDTO;
    }
}
