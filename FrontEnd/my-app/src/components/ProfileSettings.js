import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@mui/material/styles';

const ProfesseurUpdateForm = ({ professorId }) => {
    const [formData, setFormData] = useState({
        id: professorId,
        nom: '',
        prenom: '',
        email: '',
        password: '',
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const theme = useTheme();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateData = new FormData();
        updateData.append('professeurDTO', new Blob([JSON.stringify(formData)], { type: "application/json" }));
        if (profilePhoto) {
            updateData.append('photo', profilePhoto);
        }

        try {
            const response = await axios.put('http://localhost:8080/professeur/updateInfo', updateData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Update Success:', response.data);
            // Handle success feedback
        } catch (error) {
            console.error('Update Error:', error);
            // Handle error feedback
        }
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
            <Typography variant="h6">Update Professor Information</Typography>
            <Avatar sx={{ width: 56, height: 56 }} src={profilePhoto ? URL.createObjectURL(profilePhoto) : "https://via.placeholder.com/150"} />
            <Box>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handlePhotoChange}
                />
                <label htmlFor="contained-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Profile Photo</Typography>
                <Avatar
                    sx={{ width: 90, height: 90, margin: 'auto' }}
                    src={profilePhoto ? URL.createObjectURL(profilePhoto) : "https://via.placeholder.com/150"}
                    alt="Profile Photo"
                />
                <Box sx={{ marginTop: 2 }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-photo-upload"
                        type="file"
                        onChange={handlePhotoChange}
                    />
                    <label htmlFor="profile-photo-upload">
                        <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
                            Upload
                        </Button>
                    </label>
                </Box>
            </Box>
            <TextField label="Name" variant="outlined" name="nom" value={formData.nom} onChange={handleChange} />
            <TextField label="Surname" variant="outlined" name="prenom" value={formData.prenom} onChange={handleChange} />
            <TextField label="Email" variant="outlined" name="email" value={formData.email} onChange={handleChange} />
            <TextField label="Password" variant="outlined" name="password" value={formData.password} onChange={handleChange} type="password" />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
};

export default ProfesseurUpdateForm;
