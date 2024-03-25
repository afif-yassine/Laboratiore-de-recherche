package Services;

import Dao.Equipe;
import Dao.EquipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipeService {
    @Autowired
    public EquipeRepository equipeRepository;
    public Equipe create(Equipe equipe) {
        return equipeRepository.save(equipe);
    }
}
