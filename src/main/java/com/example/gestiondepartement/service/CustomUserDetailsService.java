package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.repository.DoctorantRepository;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private DoctorantRepository doctorantRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;

;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Membre professeur = professeurRepository.findByEmail(email);
        Membre doctorant = doctorantRepository.findByEmail(email);


        if (professeur == null && doctorant == null ) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("Admin"));

        if(professeur != null )
            return new User(professeur.getEmail(), professeur.getPassword(), authorities);


        return new User(doctorant.getEmail(), doctorant.getPassword(), authorities);

        // Convert the Role to a GrantedAuthority

    }
}

