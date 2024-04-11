import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Box, Button, Grid } from '@mui/material';



const ProfesseurChangeTeamRequests = () => {
    const [changeRequests, setChangeRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/admin/NoChangeEquipe')
            .then(response => {
                const requests = response.data.map(request => ({
                    ...request,
                    profName: 'Fetching...',
                    equipeName: 'Fetching...'
                }));
                setChangeRequests(requests);

                requests.forEach(request => {
                    axios.get(`http://localhost:8080/professeur/ProfesseursId/${request.profID}`)
                        .then(resp => {
                            setChangeRequests(currentRequests => currentRequests.map(cr => cr.id === request.id ? { ...cr, profName: `${resp.data.nom} ${resp.data.prenom}` } : cr));
                        })
                        .catch(error => console.error(`Failed to fetch professor ${request.profID}:`, error));

                    axios.get(`http://localhost:8080/equipe/${request.newEquipe}`)
                        .then(resp => {
                            setChangeRequests(currentRequests => currentRequests.map(cr => cr.id === request.id ? { ...cr, equipeName: resp.data.nom } : cr));
                        })
                        .catch(error => console.error(`Failed to fetch new equipe ${request.newEquipe}:`, error));
                });
            })
            .catch(error => console.error('Failed to fetch change team requests:', error));
    }, []);

    const handleAcceptRequest = (id) => {
        console.log(`Accepting change team request for Professeur ID: ${id}`);
        // Implement accept request logic here
    };

    const handleRefuseRequest = (id) => {
        console.log(`Refusing change team request for Professeur ID: ${id}`);
        // Implement refuse request logic here
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Professeur Change Team Requests</Typography>
                <List>
                    {changeRequests.map(request => (
                        <ListItem key={request.id} divider>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={6}>
                                    <ListItemText
                                        primary={`Professor: ${request.profName}`}
                                        secondary={`email: ${request.email}`}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ListItemText
                                        primary={`New Team Requested : ${request.equipeName}`}
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={() => handleAcceptRequest(request.id)} color="primary">Accept</Button>
                            <Button onClick={() => handleRefuseRequest(request.id)} color="secondary">Refuse</Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default ProfesseurChangeTeamRequests;
