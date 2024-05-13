package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import com.example.gestiondepartement.rest.ArticleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.Context;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(target = "authorIds", source = "authors", qualifiedByName = "authorsToIds")
    @Mapping(target = "publisher", source = "publisher.id")
    @Mapping(target = "doi", source = "doi")
    @Mapping(target = "pdfUrl", ignore = true)
    ArticleDTO articleToArticleDTO(Article article);

    @Mapping(target = "authors", source = "authorIds", qualifiedByName = "idsToAuthors")
    @Mapping(target = "publisher", source = "publisher", qualifiedByName = "idToPublisher")
    @Mapping(target = "doi", source = "doi")
    @Mapping(target = "pdf", ignore = true)
    Article articleDTOToArticle(ArticleDTO articleDTO, @Context MemberRepository memberRepository);

    List<ArticleDTO> articlesToArticleDTOs(List<Article> articles);

    List<Article> articleDTOsToArticles(List<ArticleDTO> articleDTOs, @Context MemberRepository memberRepository);

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
        return memberRepository.findAllById(authorIds);
    }

    @Named("idToPublisher")
    static Membre idToPublisher(Long publisherId, @Context MemberRepository memberRepository) {
        if (publisherId == null) {
            return null;
        }
        return memberRepository.findById(publisherId).orElse(null);
    }
}
