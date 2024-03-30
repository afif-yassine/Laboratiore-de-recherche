package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {



}
