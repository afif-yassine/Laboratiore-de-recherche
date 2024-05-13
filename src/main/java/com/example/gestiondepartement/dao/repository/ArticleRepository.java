package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article>findByisActiveFalse();

    List<Article>findByPublisher_Id(Long id);



}

