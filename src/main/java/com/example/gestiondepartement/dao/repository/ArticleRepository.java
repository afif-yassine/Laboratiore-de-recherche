package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.Professeur;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article>findByPublicationDate(LocalDate date);

    List<Article>findByPublisher_Id(Long id);

    List<Article> findByPublisher(Professeur professeur);
}

