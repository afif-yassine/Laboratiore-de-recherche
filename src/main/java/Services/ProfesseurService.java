package Services;

import Dao.Professeur;
import Dao.ProfesseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;
    public Professeur saveProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }
}
