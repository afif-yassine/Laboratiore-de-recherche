package com.example.gestiondepartement.service.implimentation;


import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private EquipeRepository equipeRepository;


    @Override
    public String deletProfesseur(Long membreid) {
        Professeur professeur = professeurRepository.findById(membreid).get();
        ProfesseurDTO professeurDTO = ProfesseurMapper.toProfesseurDTO(professeur);
        professeurRepository.deleteById(membreid);
        return professeurDTO.getPrenom()+" "+professeurDTO.getNom()+" is Deleted Successfully" ;
    }

    @Override
    public ProfesseurDTO saveProfesseur(ProfesseurDTO professeurDTO) {

        Professeur professeur1 = ProfesseurMapper.toProfesseur(professeurDTO);
        professeur1.setEquipe(equipeRepository.findById(professeurDTO.getIdequipe()).get());  //example Optionel with FindBy
        professeurRepository.save(professeur1);
        return ProfesseurMapper.toProfesseurDTO(professeur1);

        //toDo : utiliser un mappeur ??.!
        //class mapper transtform les valeur d'un object a un autre
    }

    @Override
    public List<ProfesseurDTO> getAllProf() {
        List<Professeur> professeurs = professeurRepository.findAll();
        return professeurs.stream().map(ProfesseurMapper::toProfesseurDTO).toList();
        // stream : pour remplacer for ;
        //map = pour affecter la method a tout les object de la list;
    }

    @Override
    public List<ProfesseurDTO> getProfesseursByEquipeId(long id) {
        List<Professeur> professeurs = professeurRepository.findByEquipe_Id(id);
        return professeurs.stream().map(ProfesseurMapper::toProfesseurDTO).toList();
    }

    @Override
    public ProfesseurDTO updateProfesseur(ProfesseurDTO professeurDTO) {
        Professeur professeur = professeurRepository.findById(professeurDTO.getId()).get();
        professeur.setNumero(professeurDTO.getNumero());
        professeur.setIsadmin(professeurDTO.getIsadmin());
        professeur.setStatus(professeurDTO.getStatus());
        professeur.setNom(professeurDTO.getNom());
        professeur.setPrenom(professeurDTO.getPrenom());
        professeur.setEmail(professeurDTO.getEmail());
        professeur.setIschef(professeurDTO.getIschef());
        professeurRepository.save(professeur);
        return ProfesseurMapper.toProfesseurDTO(professeur);

    }
}
