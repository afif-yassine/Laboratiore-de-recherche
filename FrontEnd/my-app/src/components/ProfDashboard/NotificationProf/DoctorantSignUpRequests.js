// src/components/DoctorantDashboard/Notifications/DoctorantSignUpRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axiosInstance from "../../login/interceptor";
import {jwtDecode} from "jwt-decode";

function getID() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {

        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.id
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

const DoctorantSignUpRequests = ({ idProfesseur = getID() }) => {
    const [doctorants, setDoctorants] = useState([]);
    const [encadrants, setEncadrants] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [currentDoctorant, setCurrentDoctorant] = useState({id: null, action: ''});

    useEffect(() => {
        axiosInstance.get(`http://localhost:8080/professeur/NoValideDoctoran/${idProfesseur}`)
            .then(response => {
                const doctorantsData = response.data;
                setDoctorants(doctorantsData);
                doctorantsData.forEach(doc => {
                    if (doc.idencadrant) {
                        axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId/${doc.idencadrant}`)
                            .then(resp => {
                                setEncadrants(prev => ({ ...prev, [doc.idencadrant]: `${resp.data.nom} ${resp.data.prenom}` }));
                            })
                            .catch(error => console.error(`Failed to fetch encadrant ${doc.idencadrant}:`, error));
                    }
                });
            })
            .catch(error => console.error('Failed to fetch doctorants:', error));
    }, [idProfesseur]);

    const handleOpenDialog = (id, action) => {
        setCurrentDoctorant({id, action});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const confirmAction = () => {
        if (currentDoctorant.action === 'accept') {
            handleAcceptRequest(currentDoctorant.id);
        } else if (currentDoctorant.action === 'refuse') {
            handleRefuseRequest(currentDoctorant.id);
        }
        handleCloseDialog();
    };

    const handleAcceptRequest = (id) => {
        axiosInstance.put(`http://localhost:8080/admin/accepteDoctorant/${id}`)
            .then(() => {
                setDoctorants(doctorants.filter(doc => doc.id !== id));
                console.log(`Accepted doctorant with ID: ${id}`);
            })
            .catch(error => console.error(`Failed to accept doctorant with ID ${id}:`, error));
    };

    const handleRefuseRequest = (id) => {
        axiosInstance.delete(`http://localhost:8080/admin/refuseDoctorant/${id}`)
            .then(() => {
                setDoctorants(doctorants.filter(doc => doc.id !== id));
                console.log(`Refused doctorant with ID: ${id}`);
            })
            .catch(error => console.error(`Failed to refuse doctorant with ID ${id}:`, error));
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h6" gutterBottom>
                Doctorant Sign-up Requests
            </Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <List>
                    {doctorants.map((doc) => (
                        <ListItem key={doc.id} divider>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText
                                        primary={`Name: ${doc.nom} ${doc.prenom}`}
                                        secondary={`Email: ${doc.email}`}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText
                                        primary={`Number: ${doc.numero}`}
                                        secondary={`Encadrant: ${encadrants[doc.idencadrant] || 'Fetching...'}`}
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={() => handleOpenDialog(doc.id, 'accept')}>Accept</Button>
                            <Button onClick={() => handleOpenDialog(doc.id, 'refuse')}>Refuse</Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to {currentDoctorant.action} the doctorant sign-up request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={confirmAction} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DoctorantSignUpRequests;
