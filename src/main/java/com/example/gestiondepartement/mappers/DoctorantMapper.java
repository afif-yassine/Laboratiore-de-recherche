package com.example.gestiondepartement.mappers;

import com.example.gestiondepartement.dao.Doctorant;
import com.example.gestiondepartement.rest.DoctorantDTO;

public class DoctorantMapper {
    public static DoctorantDTO toDoctorantDTO(Doctorant doctorant){
        DoctorantDTO doctorantDTO = new DoctorantDTO();
        doctorantDTO.setId(doctorant.getId());
        doctorantDTO.setNom(doctorant.getNom());
        doctorantDTO.setEmail(doctorant.getEmail());
        doctorantDTO.setPrenom(doctorant.getPrenom());
        doctorantDTO.setNumero(doctorant.getNumero());
        doctorantDTO.setActive(doctorant.isActive());
        doctorantDTO.setPassword(doctorant.getPassword());
        if(doctorant.getEncadrant() != null)
            doctorantDTO.setIdencadrant(doctorant.getEncadrant().getId());
        if(doctorant.getCoEncadrant() != null)
            doctorantDTO.setCoEncadrant(doctorant.getCoEncadrant().getId());
        return doctorantDTO;
    }

    public static Doctorant toDoctorant(DoctorantDTO doctorantDTO){
        Doctorant doctorant = new Doctorant();
        doctorant.setId(doctorantDTO.getId());
        doctorant.setNom(doctorantDTO.getNom());
        doctorant.setEmail(doctorantDTO.getEmail());
        doctorant.setPrenom(doctorantDTO.getPrenom());
        doctorant.setNumero(doctorantDTO.getNumero());
        doctorant.setActive(doctorantDTO.isActive());
        doctorant.setPassword(doctorantDTO.getPassword());
        return doctorant;
    }
}
