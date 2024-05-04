package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.dao.Article;
import com.example.gestiondepartement.rest.*;
import com.example.gestiondepartement.service.implimentation.ArticleService;
import com.example.gestiondepartement.service.implimentation.ChangementEquipeService;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import com.example.gestiondepartement.service.implimentation.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private ProfesseurService professeurService;

    @Autowired
    private ChangementEquipeService changementEquipeService;

    @Autowired
    private InscriptiondoctorantService inscriptiondoctorantService;

    @Autowired
    private ArticleService articleService;

    /*------------------------------------Notification-----------------------------------------------*/

    @GetMapping("/NoActiveProf")
    public List<ProfesseurDTO> GetAllNoActive(){
        return professeurService.GetAllNoActive();
    }

    @GetMapping("/NoActiveProf2")
    public List<ProfesseurSearchDTO> GetAllNoActive2(){
        return professeurService.GetAllNoActive2();
    }

    @GetMapping("/NoChangeEquipe")
    public List<ChangementEquipeDTO> getStatusFalse(){
        return changementEquipeService.getStatusFalse();
    }

    @GetMapping("/NoChangeEquipe2")
    public List<ChangementEquipeSearchDTO> getStatusFalse2(){
        return changementEquipeService.getStatusFalse2();
    }

    @GetMapping("/NoActiveArticle")
    public List<ArticleDTO> NoActiveArticle(){
        return articleService.NoActiveArticle();
    }

    @GetMapping("/NoValideDoctoran")
    public List<DoctorantDTO> getFalseValideAdminDoctoran(){
        return inscriptiondoctorantService.getFalseValideAdminDoctoran();
    }

    @GetMapping("/NoValideDoctoran2")
    public List<DoctorantSearchDTO> getFalseValideAdminDoctoran2(){
        return inscriptiondoctorantService.getFalseValideAdminDoctoran2();
    }





    /*-------------------------------------Accepte Request-------------------------------------------*/
    @PutMapping("/accepteProf/{idProf}")
    public void accepteProf(@PathVariable(name = "idProf") Long id){
        professeurService.accepteProf(id);
    }

    @PutMapping("/accepteChangement/{ID}")
    public ProfesseurDTO updateEquipe (@PathVariable("ID")Long ID){
        return changementEquipeService.updateEquipe(ID);
    }

    @PutMapping("/accepteDoctorant/{iDdoctorant}")
    public void accepteAdminDoctorant(@PathVariable(name = "iDdoctorant") Long iDdoctorant){
        inscriptiondoctorantService.accepteAdminDoctorant(iDdoctorant);
    }




    /*-------------------------------------Refusé Request-------------------------------------------*/
    @DeleteMapping("/refuseProf/{idProf}")
    public void refuseProf(@PathVariable(name = "idProf") Long idProf){
        professeurService.refuseProf(idProf);
    }

    @DeleteMapping("/refuseChangement/{ID}")
    public void deleteChangement (@PathVariable("ID")Long ID){
        changementEquipeService.deleteChangement(ID);
    }

    @DeleteMapping("/refuseDoctorant/{DoctorantID}")
    public void refuseDoctorant(@PathVariable("DoctorantID")Long DoctorantID){
        inscriptiondoctorantService.refuseDoctorant(DoctorantID);
    }

}
