// ./ProfileDoctorantSettings/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axiosInstance from "../../login/interceptor";

const UpdateProfile = ({ professorDetails, open, handleClose, refreshProfile }) => {
    const [formData, setFormData] = useState({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        numero: '',
        status: '',
        isadmin: false,
        ischef: false,
        idequipe: null,
        active: true,
        password: '',
    });

    useEffect(() => {
        if (professorDetails) {
            setFormData({
                ...professorDetails, // Populate with current professor details
                idequipe: professorDetails.equipe?.id,
            });
        }
    }, [professorDetails, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = () => {
        axiosInstance.put('http://localhost:8080/doctorant/update', formData)
            .then(response => {
                console.log(response.data);
                handleClose(); // Close dialog after update
                refreshProfile(); // Refresh the displayed profile details
            })
            .catch(error => console.error('Failed to update profile:', error));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To update your profile, please edit the information below.
                </DialogContentText>
                <TextField autoFocus margin="dense" name="nom" label="Nom" fullWidth variant="outlined" value={formData.nom} onChange={handleChange} />
                <TextField margin="dense" name="prenom" label="Prénom" fullWidth variant="outlined" value={formData.prenom} onChange={handleChange} />
                <TextField margin="dense" name="email" label="Email" fullWidth variant="outlined" value={formData.email} onChange={handleChange} />
                <TextField margin="dense" name="numero" label="Numéro" fullWidth variant="outlined" value={formData.numero} onChange={handleChange} />
                <TextField margin="dense" name="password" label="Password" fullWidth variant="outlined" type="text" value={formData.password} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdateProfile}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateProfile;
