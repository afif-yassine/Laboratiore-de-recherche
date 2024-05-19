package com.example.gestiondepartement.controllers;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.rest.ProfesseurSearchDTO;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import com.example.gestiondepartement.service.implimentation.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin("*") //TODO explaine later
@RestController
@RequestMapping("/professeur")
public class ProfesseurController {

    @Autowired
    private ProfesseurService professeurService;

    @Autowired
    private InscriptiondoctorantService inscriptiondoctorantService;


    @PostMapping("/inscription")
    public ProfesseurDTO createProfesseur(@RequestBody ProfesseurDTO professeurDTO) {
        ProfesseurDTO savedProfesseur = professeurService.saveProfesseur(professeurDTO);
        return savedProfesseur;
    }


    @GetMapping("/all")
    public List<ProfesseurDTO>GetAllProf(){
        return professeurService.getAllProf();
    }

    @GetMapping("/allProfPESandPH")
    public List<ProfesseurDTO>allProfNoPA(){
        return professeurService.allProfNoPA();
    }

    @GetMapping("/equipe/{id}")
    public List<ProfesseurDTO>getProfesseursByEquipeId(@PathVariable("id") long id){
        return professeurService.getProfesseursByEquipeId(id);
    }

    @GetMapping("/bureau")
    public List<ProfesseurDTO>getBureau(){
        return professeurService.getBureau();
    }

    @GetMapping("/ProfesseursId/{id}")
    public ProfesseurDTO getProfesseursById(@PathVariable("id") long id){
        return professeurService.getProfesseursById(id);
    }

    @GetMapping("/DoctoransOfProfesseur/{id}")
    public List<DoctorantDTO> DoctoransOfProfesseur(@PathVariable("id") long id){
        return professeurService.DoctoransOfProfesseur(id);
    }

    @GetMapping("/ProfesseursId2/{id}")
    public ProfesseurSearchDTO getProfesseursById2(@PathVariable("id") long id){
        return professeurService.getProfesseursSearchById(id);
    }

    @PutMapping("/updateInfo")
    public ProfesseurDTO updateProfesseur (@RequestBody ProfesseurDTO professeurDTO ){
        return professeurService.updateProfesseur(professeurDTO);
    }

    @DeleteMapping("/remove/{id}")
    public void removeProfesseur(@PathVariable("id") long id){
        professeurService.deletProfesseur(id);
    }

    /*------------------------------------- Prof Admin---------------------------------------------*/


    @GetMapping("/NoValideDoctoran/{id}")
    public List<DoctorantDTO> getFalseValideProfDoctoran(@PathVariable("id")Long id){
        return professeurService.getFalseValideProfDoctoran(id);
    }

    @PutMapping("/accepteDoctorant/{iDdoctorant}")
    public void accepteProfDoctorant(@PathVariable(name = "iDdoctorant") Long iDdoctorant){
        inscriptiondoctorantService.accepteProfDoctorant(iDdoctorant);
    }

    @DeleteMapping("/refuseDoctorant/{id}")
    public void refuseProfDoctorant(@PathVariable("id") long id){
        inscriptiondoctorantService.refuseDoctorant(id);
    }

}