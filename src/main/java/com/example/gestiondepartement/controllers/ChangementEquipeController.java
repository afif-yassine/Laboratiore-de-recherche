package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.rest.ChangementEquipeDTO;
import com.example.gestiondepartement.service.implimentation.ChangementEquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/ChangeEquipe")
@RestController
public class ChangementEquipeController {

    @Autowired
    ChangementEquipeService changementEquipeService;

    @PostMapping("/CreateChangement")
    public ChangementEquipeDTO CreateChangement(@RequestBody ChangementEquipeDTO changementEquipeDTO){
        return changementEquipeService.CreateChangement(changementEquipeDTO);
    }


    @GetMapping("/allChangement")
    public List<ChangementEquipeDTO> getAllChangement (){
        return changementEquipeService.getAllChangement();
    }
}
