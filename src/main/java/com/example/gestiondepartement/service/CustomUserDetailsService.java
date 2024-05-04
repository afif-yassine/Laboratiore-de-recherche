package com.example.gestiondepartement.service;


import com.example.gestiondepartement.dao.Membre;
import com.example.gestiondepartement.dao.repository.MemberRepository;
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
    private MemberRepository membreRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Membre membre = membreRepository.findByEmail(email);
        if (membre == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Convert the Role to a GrantedAuthority
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("Admin"));

        return new User(membre.getEmail(), membre.getPassword(), authorities);
    }
}