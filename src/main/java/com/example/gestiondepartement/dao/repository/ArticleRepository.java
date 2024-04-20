package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

}

