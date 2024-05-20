package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Equipe;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.ArticleRepository;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import com.example.gestiondepartement.mappers.ArticleMapper;
import com.example.gestiondepartement.mappers.EquipeMapper;
import com.example.gestiondepartement.rest.ArticleDTO;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    ArticleMapper articleMapper = new ArticleMapper();

    @Autowired
    private MemberRepository memberRepository;
    @Override
    public ArticleDTO createArticle(ArticleDTO articleDTO) {

        Article article = articleMapper.articleDTOToArticle(articleDTO,memberRepository);
        article = articleRepository.save(article);
        return articleMapper.articleToArticleDTO(article);
    }

    @Override
    public List<ArticleDTO> AllArticleFiveDays() {
        LocalDate dateTwoDaysAgo = LocalDate.now().minusDays(5);
        List<Article>  articles = articleRepository.findByPublicationDate(dateTwoDaysAgo);
        return articleMapper.articlesToArticleDTOs(articles);
    }

    @Override
    public List<ArticleDTO> allArticle() {
        List<Article>  articles = articleRepository.findAll();
        return articleMapper.articlesToArticleDTOs(articles);
    }



    @Override
    public List<ArticleDTO> getArticlesByEquipeId(Long equipeId) {
        List<Article> allArticles = articleRepository.findAll();
        Set<Long> uniqueArticleIds = new HashSet<>();

        List<Article> filteredArticles = allArticles.stream()
                .filter(article -> {
                    // Check if the article has already been processed
                    if (!uniqueArticleIds.add(article.getId())) {
                        return false;
                    }
                    // Filter articles where any author is a Professeur belonging to the specified Equipe
                    return article.getAuthors().stream()
                            .anyMatch(author -> author instanceof Professeur && ((Professeur) author).getEquipe().getId().equals(equipeId));
                })
                .collect(Collectors.toList());

        return articleMapper.articlesToArticleDTOs(filteredArticles);
    }




    @Override
    public List<ArticleDTO> MesArticles(Long id) {
        List<Article>  articles = articleRepository.findByPublisher_Id(id);
        return articleMapper.articlesToArticleDTOs(articles);
    }

    @Override
    public List<ArticleDTO> AllArticlesOfDashProf() {
        List<Article>  articles = articleRepository.findAll();
        return articleMapper.articlesToArticleDTOs(articles);
    }

    @Override
    public ArticleDTO updateArticle(ArticleDTO articleDTO) {
        Article article = articleMapper.articleDTOToArticle(articleDTO,memberRepository);
        articleRepository.save(article);
        return articleMapper.articleToArticleDTO(article);
    }
}
