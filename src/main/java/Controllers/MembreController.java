package Controllers;

import Dao.Membre;
import Services.MembreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/membre")
public class MembreController {
    @Autowired
    private MembreService membreService;

    @PostMapping("/storemembre")
    public Membre saveMembre(@RequestBody Membre membre){
        return membreService.create(membre);
    }
}
