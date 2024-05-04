package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.rest.DoctorantSearchDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorantRepository extends JpaRepository<Doctorant,Long> {

    List<Doctorant>findAllByEncadrant_IdOrCoEncadrant_IdAndActiveFalse(Long encadrant_id, Long coEncadrant_id);

}
