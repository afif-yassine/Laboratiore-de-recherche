package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Doctorant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorantRepository extends JpaRepository<Doctorant,Long> {
}
