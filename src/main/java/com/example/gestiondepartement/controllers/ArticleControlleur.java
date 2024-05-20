package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.rest.ArticleDTO;
import com.example.gestiondepartement.rest.EquipeDTO;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/Article")
public class ArticleControlleur {

    @Autowired
    ArticleService articleService;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ArticleDTO createArticle(@RequestPart("article") ArticleDTO articleDTO, @RequestPart("file") MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            byte[] filePdf = file.getBytes();
            articleDTO.setPdf(filePdf);
        }
        return articleService.createArticle(articleDTO);
    }

    @PutMapping("/update")
    public ArticleDTO updateArticle(@RequestPart("article") ArticleDTO articleDTO,
                                    @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        // Handle the file upload and update the article with the service
        if (file != null && !file.isEmpty()) {
            byte[] filePdf = file.getBytes();
            articleDTO.setPdf(filePdf);
        }
        return articleService.updateArticle(articleDTO);
    }


    //    @GetMapping("/ParticiperArticle ")
//    public ArticleDTO ParticiperArticle() {
//        return articleService.ParticiperArticle(articleDTO);
//
//    }
    @GetMapping("/notification/AllArticleFiveDays")
    public List<ArticleDTO> AllArticleFiveDays() {
        return articleService.AllArticleFiveDays();
    }

    @GetMapping("/MesArticles/{id}")
    public List<ArticleDTO> MesArticles(@PathVariable(name = "id")Long id) {
        return articleService.MesArticles(id);
    }

    @GetMapping("/AllArticlesOfDashProf")
    public List<ArticleDTO> AllArticlesOfDashProf() {
        return articleService.AllArticlesOfDashProf();
    }


    @GetMapping("/getArticlesByEquipeId/{id}")
    public List<ArticleDTO> getArticlesByEquipeId(@PathVariable(name = "id")Long id) {
        return articleService.getArticlesByEquipeId(id);
    }
}
