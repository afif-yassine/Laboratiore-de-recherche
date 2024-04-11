package com.example.gestiondepartement.service;


import com.example.gestiondepartement.dao.repository.EquipeRepository;
import com.example.gestiondepartement.dao.Professeur;
import com.example.gestiondepartement.dao.repository.InscriptiondoctorantRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.mappers.ProfesseurSearchDTOMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.rest.ProfesseurSearchDTO;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import com.example.gestiondepartement.service.implimentation.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private ProfesseurSearchDTOMapper professeurSearchDTOMapper;

    @Autowired
    private InscriptiondoctorantService inscriptiondoctorantService;


    @Override
    public void deletProfesseur(Long membreid) {
        Professeur professeur = professeurRepository.findById(membreid).get();
        ProfesseurDTO professeurDTO = ProfesseurMapper.toProfesseurDTO(professeur);
        professeurRepository.deleteById(membreid);
    }

    @Override
    public ProfesseurDTO saveProfesseur(ProfesseurDTO professeurDTO) {

        Professeur professeur1 = ProfesseurMapper.toProfesseur(professeurDTO);
        professeur1.setEquipe(equipeRepository.findById(professeurDTO.getIdequipe()).get());
        professeur1.setActive(false);//example Optionel with FindBy
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
        if(professeurDTO.getIdequipe() != professeurRepository.findById(professeurDTO.getId()).get().getEquipe().getId()) return null;
        Professeur professeur = ProfesseurMapper.toProfesseur(professeurDTO);
        if(professeurDTO.getIdequipe() != null )
            professeur.setEquipe(equipeRepository.findById(professeurDTO.getIdequipe()).get());
        professeurRepository.save(professeur);
        return ProfesseurMapper.toProfesseurDTO(professeur);

    }

    //-----------------------------forAdmin--------------------------------------------------//

    @Override
    public List<ProfesseurDTO> GetAllNoActive() {
        List<Professeur> professeurs = professeurRepository.findByActiveFalse();
        return professeurs.stream().map(ProfesseurMapper::toProfesseurDTO).toList();
    }

    @Override
    public void accepteProf(Long id) {
        professeurRepository.findById(id).get().setActive(true);
        professeurRepository.save(professeurRepository.findById(id).get());
    }

    @Override
    public void refuseProf(Long id) {
        deletProfesseur(id);
    }

    @Override
    public ProfesseurDTO getProfesseursById(long id) {
        Professeur professeur = professeurRepository.findById(id).get();
        return ProfesseurMapper.toProfesseurDTO(professeur);
    }
    @Override
    public ProfesseurSearchDTO getProfesseursSearchById(long id) {
        Professeur professeur = professeurRepository.findById(id).get();
        return professeurSearchDTOMapper.toDto(professeur);
    }
    /*------------------------------------Professeur--------------------------------------------------*/

    @Override
    public List<DoctorantDTO> getFalseValideProfDoctoran(Long id) {
        return inscriptiondoctorantService.getFalseValideProfDoctoran(id);
    }

    @Override
    public List<ProfesseurSearchDTO> GetAllNoActive2() {
        List<Professeur> professeurs = professeurRepository.findByActiveFalse();
        return professeurs.stream().map(professeurSearchDTOMapper::toDto).toList();
    }


}
