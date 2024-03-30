package com.example.gestiondepartement.controllers;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin("*") //TODO explaine later
@RestController
@RequestMapping("/professeur")
public class ProfesseurController {

    @Autowired
    private ProfesseurService professeurService;


    @PostMapping("/create")
    public ProfesseurDTO createProfesseur(@RequestBody ProfesseurDTO professeurDTO) {

        ProfesseurDTO savedProfesseur = professeurService.saveProfesseur(professeurDTO);
        return savedProfesseur;
    }

    @DeleteMapping("/remove/{id}")
    public String removeProfesseur(@PathVariable("id") long id){
         return professeurService.deletProfesseur(id);
    }

    @GetMapping("/all")
    public List<ProfesseurDTO>GetAllProf(){
        return professeurService.getAllProf();
    }

    @GetMapping("/equipe/{id}")
    public List<ProfesseurDTO>getProfesseursByEquipeId(@PathVariable("id") long id){
        return professeurService.getProfesseursByEquipeId(id);
    }

    @PutMapping("/update")
    public ProfesseurDTO updateProfesseur (@RequestBody ProfesseurDTO professeurDTO ){
        return professeurService.updateProfesseur(professeurDTO);
    }

}