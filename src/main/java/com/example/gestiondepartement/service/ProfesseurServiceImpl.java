package com.example.gestiondepartement.service;


import com.example.gestiondepartement.dao.*;
import com.example.gestiondepartement.dao.repository.*;
import com.example.gestiondepartement.mappers.DoctorantMapper;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.mappers.ProfesseurSearchDTOMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.rest.ProfesseurSearchDTO;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import com.example.gestiondepartement.service.implimentation.ProfesseurService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private DoctorantRepository doctorantRepository;

    @Autowired
    private ProfesseurSearchDTOMapper professeurSearchDTOMapper;

    @Autowired
    private InscriptiondoctorantService inscriptiondoctorantService;

    @Autowired
    private ChangementEquipeRepository changementEquipeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ArticleRepository articleRepository;

    private void registerWithChatEngine(ProfesseurDTO professeurDTO) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("PRIVATE-KEY", "cb2081bb-862b-47c2-a9ba-9e6c966dff84");

        String requestBody = String.format("""
        {
            "username": "%s",
            "first_name": "%s",
            "last_name": "%s",
            "secret": "%s"
        }""", professeurDTO.getNom(), professeurDTO.getPrenom(), professeurDTO.getNom(), professeurDTO.getChatpassword());

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity("https://api.chatengine.io/users/", entity, String.class);
        // Optionally handle the response
        System.out.println("ChatEngine response: " + response.getBody());
    }

    private String generateRandomPassword(int length) {
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        Random random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(charSet.charAt(random.nextInt(charSet.length())));
        }
        return sb.toString();
    }

    @Override
    @Transactional
    public void deletProfesseur(Long membreid) {
        Professeur professeur = professeurRepository.findById(membreid).orElseThrow(() -> new RuntimeException("Professeur not found"));


        // Handle ChangementEquipe
        List<ChangementEquipe> changements = changementEquipeRepository.findByProf(professeur);
        for (ChangementEquipe changement : changements) {
            changement.setProf(null); // Or set it to a default value
            changementEquipeRepository.save(changement);
        }

        // Handle Equipe
        Equipe equipe = equipeRepository.findByChefequipe(professeur);
        if (equipe != null) {
            equipe.setChefequipe(null); // Or set it to a default value
            equipeRepository.save(equipe);
        }

        // Handle Articles
        List<Article> articles = articleRepository.findByPublisher(professeur);
        for (Article article : articles) {
            article.setPublisher(null); // Or set it to a default value
            articleRepository.save(article);
        }


        List<Doctorant> doctorants = doctorantRepository.findByEncadrantOrCoEncadrant(professeur, professeur);
        for (Doctorant doctorant : doctorants) {
            if (doctorant.getEncadrant().equals(professeur)) {
                doctorant.setEncadrant(null); // Or set it to a default value
            }
            if (doctorant.getCoEncadrant().equals(professeur)) {
                doctorant.setCoEncadrant(null); // Or set it to a default value
            }
            doctorantRepository.save(doctorant);
        }

        // Finally, delete the Professeur
        professeurRepository.deleteById(membreid);
    }

    @Override
    public ProfesseurDTO saveProfesseur(ProfesseurDTO professeurDTO) {

        professeurDTO.setChatpassword(generateRandomPassword(6));  // Example: generate a 10-character password

        registerWithChatEngine(professeurDTO);

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

    @Override
    public List<DoctorantDTO> DoctoransOfProfesseur(long id) {
        List<Doctorant> doctorants = doctorantRepository.findAllByEncadrant_IdOrCoEncadrant_IdAndActiveFalse(id,id);
        return doctorants.stream().map(DoctorantMapper::toDoctorantDTO).toList();
        //todo remétre to findAllByEncadrant_IdOrCoEncadrant_IdAndActiveTrue
    }

    @Override
    public List<ProfesseurDTO> getBureau() {
        List<Professeur> professeurs = professeurRepository.findAllByIsadminTrueOrIschefTrue();
        return professeurs.stream().map(ProfesseurMapper::toProfesseurDTO).toList();
    }

    @Override
    public List<ProfesseurDTO> allProfNoPA() {
        List<Professeur> professeurs = professeurRepository.findByStatusIn(Arrays.asList("PES", "PH", "Treasury"));
        return professeurs.stream().map(ProfesseurMapper::toProfesseurDTO).toList();
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
