package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.rest.ArticleDTO;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/Article")
public class ArticleControlleur {

    @Autowired
    ArticleService articleService;

    @PostMapping("/create")
    public ArticleDTO createArticle(@RequestBody ArticleDTO articleDTO) {
        return articleService.createArticle(articleDTO);

    }

//    @GetMapping("/ParticiperArticle ")
//    public ArticleDTO ParticiperArticle() {
//        return articleService.ParticiperArticle(articleDTO);
//
//    }
    @GetMapping("/AllArticleNoValide")
    public List<ArticleDTO> AllArticleNoValide() {
        return articleService.AllArticleNoValide();
    }
}
