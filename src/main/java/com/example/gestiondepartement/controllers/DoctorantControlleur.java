package com.example.gestiondepartement.controllers;


import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.EquipeDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.implimentation.DoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/doctorant")
public class DoctorantControlleur {

    @Autowired
    private DoctorantService doctorantService;


    @PostMapping("/inscription")
    public DoctorantDTO insertDoctorantInDataBase(@RequestBody DoctorantDTO doctorantDTO){
        return doctorantService.insertDoctorantInDataBase(doctorantDTO);
    }

    @GetMapping("/all")
    public List<DoctorantDTO>getAllDoctorants(){
        return doctorantService.getAllDoctorant();
    }

    @DeleteMapping("/delete/{id}")
    public void removeDoctorant (@PathVariable("id") Long id){
          doctorantService.removeDoctorant(id);
    }

    @PutMapping("/update")
    public DoctorantDTO updateDoctorant(@RequestBody DoctorantDTO doctorantDTO){
        return doctorantService.updateDoctorant(doctorantDTO);
    }

    @GetMapping("/encadrant/{id}")
    public ProfesseurDTO getEncadrantDeDoctorant(@PathVariable("id")Long id){
    return doctorantService.getEncadrantDeDoctorant(id);
    }

    @GetMapping("/{id}")
    public DoctorantDTO getDoctorantById(@PathVariable("id")Long id){
        return doctorantService.getDoctorantById(id);
    }




}
