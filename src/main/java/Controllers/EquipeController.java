package Controllers;

import Dao.Equipe;
import Dao.EquipeRepository;
import Services.EquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/equipe")
public class EquipeController {
    @Autowired
    private EquipeService equipeService;


    @PostMapping("/store")
    public Equipe saveEquipe(@RequestBody Equipe equipe){
        return equipeService.create(equipe);
    }
}
