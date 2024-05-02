package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.repository.ArticleRepository;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import com.example.gestiondepartement.mappers.ArticleMapper;
import com.example.gestiondepartement.rest.ArticleDTO;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private MemberRepository memberRepository;
    @Override
    public ArticleDTO createArticle(ArticleDTO articleDTO) {

        Article article = articleMapper.articleDTOToArticle(articleDTO,memberRepository);
        article = articleRepository.save(article);
        ArticleDTO savedArticleDTO = articleMapper.articleToArticleDTO(article);
        return savedArticleDTO;
    }

    @Override
    public List<ArticleDTO> AllArticleNoValide() {
        List<Article>  articles = articleRepository.findByisActiveFalse();
        return articleMapper.articlesToArticleDTOs(articles);
    }
}
