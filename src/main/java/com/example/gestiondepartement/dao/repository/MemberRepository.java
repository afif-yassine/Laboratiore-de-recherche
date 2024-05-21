package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Membre;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Membre, Long> {

    @Query("SELECT m FROM Membre m WHERE m.id IN :ids")
    List<Membre> findAllByIdIn(@Param("ids") List<Long> ids);
    Membre findByEmail(String email);


}
