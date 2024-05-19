package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
//    List<Publication> findByContentContaining(String content);
//    List<Publication> findByDatePublishedBetween(LocalDate start, LocalDate end);

}
