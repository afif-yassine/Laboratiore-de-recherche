package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.service.implimentation.ArticleService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Article")
public class ArticleControlleur {

    @Autowired
    ArticleService articleService;

}
