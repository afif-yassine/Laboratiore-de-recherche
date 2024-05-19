package com.example.gestiondepartement.service;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.dao.repository.ChangementEquipeRepository;
import com.example.gestiondepartement.dao.repository.DoctorantRepository;
import com.example.gestiondepartement.dao.repository.ProfesseurRepository;
import com.example.gestiondepartement.mappers.DoctorantMapper;
import com.example.gestiondepartement.mappers.ProfesseurMapper;
import com.example.gestiondepartement.rest.DoctorantDTO;
import com.example.gestiondepartement.rest.ProfesseurDTO;
import com.example.gestiondepartement.service.implimentation.ChangementEquipeService;
import com.example.gestiondepartement.service.implimentation.DoctorantService;
import com.example.gestiondepartement.service.implimentation.InscriptiondoctorantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

@Service
public class DoctorantServiceImpl implements DoctorantService {
    @Autowired
    DoctorantRepository doctorantRepository;

    @Autowired
    ProfesseurRepository professeurRepository;

    @Autowired
    InscriptiondoctorantService inscriptiondoctorantService;


    private void registerWithChatEngine(DoctorantDTO doctorantDTO) {
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
        }""", doctorantDTO.getNom(), doctorantDTO.getPrenom(), doctorantDTO.getNom(), doctorantDTO.getChatpassword());

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
    public DoctorantDTO insertDoctorantInDataBase(DoctorantDTO doctorantDTO){
// Generate a random password if not set

        doctorantDTO.setChatpassword(generateRandomPassword(6));  // Example: generate a 10-character password

        registerWithChatEngine(doctorantDTO);

        Doctorant doctorant = DoctorantMapper.toDoctorant(doctorantDTO);
        doctorant.setEncadrant(professeurRepository.findById(doctorantDTO.getIdencadrant()).get());
        if(doctorantDTO.getCoEncadrant()!=null)
        doctorant.setCoEncadrant(professeurRepository.findById(doctorantDTO.getCoEncadrant()).get());
        doctorantRepository.save(doctorant);
        inscriptiondoctorantService.createInscreption(doctorant);
        return DoctorantMapper.toDoctorantDTO(doctorant);
    }

    @Override
    public void removeDoctorant(Long id) {
        DoctorantDTO doctorantDTO = DoctorantMapper.toDoctorantDTO(doctorantRepository.findById(id).get());
        doctorantRepository.deleteById(id);
    }

    @Override
    public ProfesseurDTO getEncadrantDeDoctorant(Long id) {
        return ProfesseurMapper.toProfesseurDTO(doctorantRepository.findById(id).get().getEncadrant());
    }

    @Override
    public DoctorantDTO updateDoctorant(DoctorantDTO doctorantDTO) {
        Doctorant doctorant = DoctorantMapper.toDoctorant(doctorantDTO);
        doctorant.setEncadrant(professeurRepository.findById(doctorantDTO.getIdencadrant()).get());
        doctorant.setCoEncadrant(professeurRepository.findById(doctorantDTO.getCoEncadrant()).get());
        doctorantRepository.save(doctorant);
        return DoctorantMapper.toDoctorantDTO(doctorant);
    }

    @Override
    public DoctorantDTO getDoctorantById(Long id) {
        Doctorant doctorant = doctorantRepository.findById(id).get();
        return DoctorantMapper.toDoctorantDTO(doctorant);
    }

    @Override
    public List<DoctorantDTO> getAllDoctorant() {
        List<Doctorant> doctorants = doctorantRepository.findAll();
        return doctorants.stream().map(DoctorantMapper::toDoctorantDTO).toList();
    }

}
