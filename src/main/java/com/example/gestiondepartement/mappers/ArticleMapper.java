package com.example.gestiondepartement.mappers;


import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.rest.ArticleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    // Use custom mapping method for authors
    @Mapping(target = "authorIds", source = "authors", qualifiedByName = "authorsToIds")
    ArticleDTO articleToArticleDTO(Article article);

    // No direct mapping necessary for reverse since it might need specific logic to fetch entities
    Article articleDTOToArticle(ArticleDTO articleDTO);

    // Mapping lists of articles to lists of DTOs
    List<ArticleDTO> articlesToArticleDTOs(List<Article> articles);

    // Mapping lists of DTOs to lists of articles
    List<Article> articleDTOsToArticles(List<ArticleDTO> articleDTOs);

    // Custom method to map List<Membre> to List<Long> (IDs)
    @Named("authorsToIds")
    default List<Long> authorsToIds(List<Membre> authors) {
        if (authors == null) {
            return null;
        }
        return authors.stream().map(Membre::getId).collect(Collectors.toList());
    }
}



























//import com.example.gestiondepartement.dao.Article;
//import com.example.gestiondepartement.rest.ArticleDTO;
//
//import com.example.gestiondepartement.dao.Membre;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import static java.util.Arrays.stream;
//
//public class ArticleMapper {
//
//    // Converts an Article entity to an ArticleDTO
//    public static ArticleDTO toDto(Article article) {
//        if (article == null) {
//            return null;
//        }
//
//        List<Long> authorIds = article.getAuthors().stream().map(Membre::getId).toList();
//
//        return new ArticleDTO(
//                article.getId(),
//                article.getTitre(),
//                article.getDescription(),
//                article.getPublicationDate(),
//                authorIds
//        );
//    }
//
//    // Converts an ArticleDTO to an Article entity
//    // Note: This method might need adjustments based on how you handle authors in your service layer
//    public static Article toEntity(ArticleDTO articleDTO) {
//        if (articleDTO == null) {
//            return null;
//        }
//
//        Article article = new Article();
//        article.setId(articleDTO.getId());
//        article.setTitre(articleDTO.getTitre());
//        article.setDescription(articleDTO.getDescription());
//        article.setPublicationDate(articleDTO.getPublicationDate());
//
//        // Handling authors is more complex and might require fetching Membre entities by ID
//        // This part is intentionally left for further implementation as it depends on your service layer
//
//        return article;
//    }
//
//    // Converts a list of Article entities to a list of ArticleDTOs
//    public static List<ArticleDTO> toDtoList(List<Article> articles) {
//        if (articles == null) {
//            return null;
//        }
//        return articles.stream()
//                .map(ArticleMapper::toDto)
//                .collect(Collectors.toList());
//    }
//
//    // Converts a list of ArticleDTOs to a list of Article entities
//    // Similar to toEntity, handling authors requires more context about your application's design
//    public static List<Article> toEntityList(List<ArticleDTO> articleDTOs) {
//        if (articleDTOs == null) {
//            return null;
//        }
//        return articleDTOs.stream()
//                .map(ArticleMapper::toEntity)
//                .collect(Collectors.toList());
//    }
//}
