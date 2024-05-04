package com.example.gestiondepartement.dao.repository;

import com.example.gestiondepartement.dao.Membre;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Membre, Long> {
    Membre findMembreById(Long id);
    @NotNull List<Membre> findAllById(Iterable<Long> ids);
    Membre findByEmail(String email);
}
