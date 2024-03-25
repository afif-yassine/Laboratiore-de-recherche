package Services;

import Dao.Membre;
import Dao.MembreRepository;
import org.springframework.stereotype.Service;

@Service
public class MembreService {

    private MembreRepository membreRepository;

    public Membre create(Membre membre) {
        return membreRepository.save(membre);
    }
}
