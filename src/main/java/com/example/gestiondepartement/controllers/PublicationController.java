package com.example.gestiondepartement.controllers;

import com.example.gestiondepartement.mappers.PublicationMapper;
import com.example.gestiondepartement.rest.PublicationDTO;
import com.example.gestiondepartement.service.implimentation.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private PublicationMapper publicationMapper;

    @PostMapping("/create")
    public PublicationDTO createPublication(
            @RequestPart("publicationDTO") PublicationDTO publicationDTO,
            @RequestPart("file") MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            byte[] filephoto = file.getBytes();
            publicationDTO.setPhoto(filephoto);
        }
        return publicationService.createPublication(publicationDTO);
    }

    @PutMapping("/update/{id}")
    public PublicationDTO updatePublication(@PathVariable Long id, @RequestPart("publicationDTO") PublicationDTO publicationDTO, @RequestPart("file") MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            byte[] filephoto = file.getBytes();
            publicationDTO.setPhoto(filephoto);
        }
        return publicationService.updatePublication(id, publicationDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
    }

    @GetMapping("/getById/{id}")
    public PublicationDTO getPublicationById(@PathVariable Long id) {
        return publicationService.getPublicationById(id);
    }

    @GetMapping("/getAll")
    public List<PublicationDTO> getAllPublications() {
        return publicationService.getAllPublications();
    }
}