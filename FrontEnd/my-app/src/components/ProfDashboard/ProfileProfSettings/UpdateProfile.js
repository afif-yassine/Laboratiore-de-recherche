import React, { useState } from 'react';
import axios from 'axios';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';


function UpdateProfile({ open, handleClose, doctorant, refreshDoctorant }) {
    // Initialize form data with the doctorant's current information
    const [formData, setFormData] = useState({
        id: doctorant.id,
        nom: doctorant.nom,
        prenom: doctorant.prenom,
        email: doctorant.email,
        numero: doctorant.numero,
        password: doctorant.password,
        idencadrant: doctorant.idencadrant,
        coEncadrant: doctorant.coEncadrant
    });

    // Handle changes in text fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send PUT request to the server with the updated data
            const response = await axios.put('http://localhost:8080/doctorant/update', formData);
            if (response.status === 200) {
                // Optionally refresh the doctorant's data in the parent component
                refreshDoctorant();
                // Close the dialog on successful update
                handleClose();
            }
        } catch (error) {
            console.error('Failed to update doctorant:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Doctorant Profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please update the doctorant information below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nom"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.nom}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="prenom"
                    label="Surname"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.prenom}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="numero"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.numero}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={formData.password}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateProfile;
