package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.rest.EquipeDTO;
import com.example.gestiondepartement.service.EquipeService;
import com.example.gestiondepartement.service.implimentation.EquipeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/equipe")
public class EquipeController {


    @Autowired //injection de dépendances
    EquipeService equipeService;

    @PostMapping("/create")
    public EquipeDTO createEquipe(@RequestBody EquipeDTO equipeDTO){
        return equipeService.create(equipeDTO);
    }

    @GetMapping("/all")
    public List<EquipeDTO> getAllEquipe (){
        return equipeService.getAllEquipe();
    }

    @GetMapping("/{id}")
    public EquipeDTO getById(@PathVariable("id") Long id){
        return equipeService.geById("id");
    }
}

