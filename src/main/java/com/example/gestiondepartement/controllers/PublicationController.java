package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.rest.PublicationDTO;
import com.example.gestiondepartement.service.implimentation.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/Publication")
public class PublicationController {

    @Autowired
    PublicationService publicationService;
    @PostMapping("/createPublication")
    public PublicationDTO createPublication(@RequestBody PublicationDTO publicationDTO) {
        return publicationService.createPublication(publicationDTO);
    }
}
