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
    ArticleDTO articleToArticleDTO(Article article);

    @Mapping(target = "authors", source = "authorIds", qualifiedByName = "idsToAuthors")
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
}
