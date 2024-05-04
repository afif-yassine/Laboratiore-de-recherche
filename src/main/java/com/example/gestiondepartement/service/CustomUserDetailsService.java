package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.Professeur;
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
        Professeur professeur = professeurRepository.findByEmail(email);
        Doctorant doctorant = doctorantRepository.findByEmail(email);


        if (professeur == null && doctorant == null ) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        List<GrantedAuthority> authorities ;

        if(professeur != null ){
            if(professeur.getIsadmin()){
                authorities = Collections.singletonList(new SimpleGrantedAuthority("Admin"));
                return new User(professeur.getEmail(), professeur.getPassword(), authorities);
            }
            if(professeur.getIschef()){
                authorities = Collections.singletonList(new SimpleGrantedAuthority("Chef"));
                return new User(professeur.getEmail(), professeur.getPassword(), authorities);
            }
            authorities = Collections.singletonList(new SimpleGrantedAuthority("Professeur"));
            return new User(professeur.getEmail(), professeur.getPassword(), authorities);

        }

        authorities = Collections.singletonList(new SimpleGrantedAuthority("Doctorant"));
        return new User(doctorant.getEmail(), doctorant.getPassword(), authorities);

        // Convert the Role to a GrantedAuthority

    }
}

