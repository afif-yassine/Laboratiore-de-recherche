package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import com.example.gestiondepartement.rest.ArticleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.Context;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


public class ArticleMapper {


    public ArticleDTO articleToArticleDTO(Article article) {
        if ( article == null ) {
            return null;
        }

        ArticleDTO articleDTO = new ArticleDTO();

        articleDTO.setAuthorIds( ArticleMapper.authorsToIds( article.getAuthors() ) );
        articleDTO.setPublisher( articlePublisherId( article ) );
        articleDTO.setDoi( article.getDoi() );
        byte[] pdf = article.getPdf();
        if ( pdf != null ) {
            articleDTO.setPdf(pdf);
        }
        articleDTO.setId( article.getId() );
        articleDTO.setTitre( article.getTitre() );
        articleDTO.setDescription( article.getDescription() );
        articleDTO.setPublicationDate( article.getPublicationDate() );

        return articleDTO;
    }


    public Article articleDTOToArticle(ArticleDTO articleDTO, MemberRepository memberRepository) {
        if ( articleDTO == null ) {
            return null;
        }

        Article article = new Article();

        article.setAuthors( ArticleMapper.idsToAuthors( articleDTO.getAuthorIds(), memberRepository ) );
        article.setPublisher( ArticleMapper.idToPublisher( articleDTO.getPublisher(), memberRepository ) );
        article.setDoi( articleDTO.getDoi() );
        byte[] pdf = articleDTO.getPdf();
        if ( pdf != null ) {
            article.setPdf( pdf );
        }
        article.setId( articleDTO.getId() );
        article.setTitre( articleDTO.getTitre() );
        article.setDescription( articleDTO.getDescription() );
        article.setPublicationDate( articleDTO.getPublicationDate() );

        return article;
    }


    public List<ArticleDTO> articlesToArticleDTOs(List<Article> articles) {
        if ( articles == null ) {
            return null;
        }

        List<ArticleDTO> list = new ArrayList<ArticleDTO>( articles.size() );
        for ( Article article : articles ) {
            list.add( articleToArticleDTO( article ) );
        }

        return list;
    }


    private Long articlePublisherId(Article article) {
        if ( article == null ) {
            return null;
        }
        Membre publisher = article.getPublisher();
        if ( publisher == null ) {
            return null;
        }
        Long id = publisher.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    @Named("authorsToIds")
    static List<Long> authorsToIds(List<Membre> authors) {
        if (authors == null) {
            return null;
        }
        return authors.stream().map(Membre::getId).collect(Collectors.toList());
    }

    @Named("idsToAuthors")
    static List<Membre> idsToAuthors(List<Long> authorIds, @Context MemberRepository memberRepository) {
        if (authorIds == null) {
            return null;
        }
        return memberRepository.findAllByIdIn(authorIds);
    }

    @Named("idToPublisher")
    static Membre idToPublisher(Long publisherId, @Context MemberRepository memberRepository) {
        if (publisherId == null) {
            return null;
        }
        return memberRepository.findById(publisherId).orElse(null);
    }
}
