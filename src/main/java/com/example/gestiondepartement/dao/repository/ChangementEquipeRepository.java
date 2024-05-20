package com.example.gestiondepartement.dao.repository;


import com.example.gestiondepartement.dao.ChangementEquipe;
import com.example.gestiondepartement.dao.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChangementEquipeRepository extends JpaRepository<ChangementEquipe,Long>  {

    List<ChangementEquipe>findBystatusChangeFalse();

    List<ChangementEquipe> findByProf(Professeur professeur);
}
