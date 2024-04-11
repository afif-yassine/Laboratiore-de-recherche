package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.dao.InscriptionDoctorant;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/InscriptionDoctorant")
public class InscriptionDoctorantController {
    @Autowired
    public InscriptiondoctorantService inscriptiondoctorantService;

    @GetMapping("/all")
    public List<InscriptionDoctorant> getAllEncadrant (){
        return inscriptiondoctorantService.getAllInscriptionDoctorant();
    }

}
