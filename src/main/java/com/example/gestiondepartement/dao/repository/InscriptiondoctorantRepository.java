package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.InscriptionDoctorant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscriptiondoctorantRepository extends JpaRepository<InscriptionDoctorant, Long> {
    List<InscriptionDoctorant> findByValideadminFalseAndValideprofTrue();
    List<InscriptionDoctorant> findByValideprofFalse();
    InscriptionDoctorant findInscriptionDoctorantByDoctorant_Id(Long id);

}
