import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axiosInstance from "../../login/interceptor";

const ProfesseurChangeTeamRequests = () => {
    const [changeRequests, setChangeRequests] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentRequest, setCurrentRequest] = useState({ id: null, action: '' });

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/admin/NoChangeEquipe')
            .then(response => {
                const requests = response.data.map(request => ({
                    ...request,
                    profName: 'Fetching...',
                    equipeName: 'Fetching...'
                }));
                setChangeRequests(requests);

                requests.forEach(request => {
                    axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId/${request.profID}`)
                        .then(resp => {
                            setChangeRequests(currentRequests => currentRequests.map(cr => cr.id === request.id ? { ...cr, profName: `${resp.data.nom} ${resp.data.prenom}` } : cr));
                        })
                        .catch(error => console.error(`Failed to fetch professor ${request.profID}:`, error));

                    axiosInstance.get(`http://localhost:8080/equipe/${request.newEquipe}`)
                        .then(resp => {
                            setChangeRequests(currentRequests => currentRequests.map(cr => cr.id === request.id ? { ...cr, equipeName: resp.data.nom } : cr));
                        })
                        .catch(error => console.error(`Failed to fetch new equipe ${request.newEquipe}:`, error));
                });
            })
            .catch(error => console.error('Failed to fetch change team requests:', error));
    }, []);

    const handleOpenDialog = (id, action) => {
        setCurrentRequest({ id, action });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const confirmAction = () => {
        if (currentRequest.action === 'accept') {
            handleAcceptRequest(currentRequest.id);
        } else if (currentRequest.action === 'refuse') {
            handleRefuseRequest(currentRequest.id);
        }
        handleCloseDialog();
    };

    const handleAcceptRequest = (id) => {
        axiosInstance.put(`http://localhost:8080/admin/accepteChangement/${id}`)
            .then(() => {
                setChangeRequests(changeRequests.filter(request => request.id !== id));
                console.log(`Accepted change team request for Professeur ID: ${id}`);
            })
            .catch(error => console.error(`Failed to accept change team request for Professeur ID ${id}:`, error));
    };

    const handleRefuseRequest = (id) => {
        axiosInstance.delete(`http://localhost:8080/admin/refuseChangement/${id}`)
            .then(() => {
                setChangeRequests(changeRequests.filter(request => request.id !== id));
                console.log(`Refused change team request for Professeur ID: ${id}`);
            })
            .catch(error => console.error(`Failed to refuse change team request for Professeur ID ${id}:`, error));
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Professeur Change Team Requests</Typography>
                <List>
                    {changeRequests.map(request => (
                        <ListItem key={request.id} divider>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <ListItemText
                                        primary={`Professor: ${request.profName}`}
                                        secondary={`Email: ${request.email}`}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ListItemText
                                        primary={`New Team Requested: ${request.equipeName}`}
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={() => handleOpenDialog(request.id, 'accept')} color="primary">Accept</Button>
                            <Button onClick={() => handleOpenDialog(request.id, 'refuse')} color="secondary">Refuse</Button>
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
                        Are you sure you want to {currentRequest.action} the change team request?
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

export default ProfesseurChangeTeamRequests;
