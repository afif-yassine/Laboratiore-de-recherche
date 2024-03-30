package com.example.gestiondepartement.controllers;


import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.DoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctorant")
public class DoctorantControlleur {

    @Autowired
    private DoctorantService doctorantService;


    @PostMapping("/create")
    public DoctorantDTO insertDoctorantInDataBase(@RequestBody DoctorantDTO doctorantDTO){
        return doctorantService.insertDoctorantInDataBase(doctorantDTO);
    }

    @GetMapping("/all")
    public List<DoctorantDTO>getAllDoctorants(){
        return doctorantService.getAllDoctorant();
    }

    @DeleteMapping("/delete/{id}")
    public String removeDoctorant (@PathVariable("id") Long id){
        return  doctorantService.removeDoctorant(id);
    }

    @GetMapping("/encadrant/{id}")
    public ProfesseurDTO getEncadrantDeDoctorant(@PathVariable("id")Long id){
    return doctorantService.getEncadrantDeDoctorant(id);
    }

}
