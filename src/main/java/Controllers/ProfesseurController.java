package Controllers;

import Dao.Equipe;
import Dao.Professeur;
import Services.EquipeService;
import Services.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/professeur")
public class ProfesseurController {

    @Autowired
    private ProfesseurService professeurService;
    @Autowired
    private EquipeService equipeService;

    @PostMapping
    public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) {
        Equipe equipe = new Equipe();
        equipe.setIdequipe(8L);
        equipeService.create(equipe);
        professeur.setEquipe(equipe);
        Professeur savedProfesseur = professeurService.saveProfesseur(professeur);
        return new ResponseEntity<>(savedProfesseur, HttpStatus.CREATED);
    }
}