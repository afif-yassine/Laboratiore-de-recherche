import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axiosInstance from "../../login/interceptor";

const ProfesseurSignUpRequests = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const [equipes, setEquipes] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [currentProfesseur, setCurrentProfesseur] = useState({ id: null, action: '' });

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/admin/NoActiveProf')
            .then(response => {
                const professeursData = response.data;
                setProfesseurs(professeursData);
                professeursData.forEach(prof => {
                    if (prof.idequipe) {
                        axiosInstance.get(`http://localhost:8080/equipe/${prof.idequipe}`)
                            .then(resp => {
                                setEquipes(prev => ({ ...prev, [prof.idequipe]: resp.data.nom }));
                            })
                            .catch(error => console.error(`Failed to fetch equipe ${prof.idequipe}:`, error));
                    }
                });
            })
            .catch(error => console.error('Failed to fetch professeurs:', error));
    }, []);

    const handleOpenDialog = (id, action) => {
        setCurrentProfesseur({ id, action });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const confirmAction = () => {
        if (currentProfesseur.action === 'accept') {
            handleAcceptRequest(currentProfesseur.id);
        } else if (currentProfesseur.action === 'refuse') {
            handleRefuseRequest(currentProfesseur.id);
        }
        handleCloseDialog();
    };

    const handleAcceptRequest = (id) => {
        axiosInstance.put(`http://localhost:8080/admin/accepteProf/${id}`)
            .then(() => {
                setProfesseurs(professeurs.filter(prof => prof.id !== id));
                console.log(`Accepted professeur with ID: ${id}`);
            })
            .catch(error => console.error(`Failed to accept professeur with ID ${id}:`, error));
    };

    const handleRefuseRequest = (id) => {
        axiosInstance.delete(`http://localhost:8080/admin/refuseProf/${id}`)
            .then(() => {
                setProfesseurs(professeurs.filter(prof => prof.id !== id));
                console.log(`Refused professeur with ID: ${id}`);
            })
            .catch(error => console.error(`Failed to refuse professeur with ID ${id}:`, error));
    };

    return (
        <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6">Professeur Sign-up Requests</Typography>
            <List>
                {professeurs.map((prof) => (
                    <ListItem key={prof.id} divider>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <ListItemText
                                    primary={`Name: ${prof.nom} ${prof.prenom}`}
                                    secondary={`Email: ${prof.email}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ListItemText
                                    primary={`Number: ${prof.numero}`}
                                    secondary={`Equipe: ${equipes[prof.idequipe] || 'Fetching...'}`}
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={() => handleOpenDialog(prof.id, 'accept')}>Accept</Button>
                        <Button onClick={() => handleOpenDialog(prof.id, 'refuse')}>Refuse</Button>
                    </ListItem>
                ))}
            </List>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to {currentProfesseur.action} the professeur sign-up request?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={confirmAction} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ProfesseurSignUpRequests;
