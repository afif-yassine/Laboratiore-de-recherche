package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Membre, Long> {





}
