// src/components/Dashboard/Notifications/DoctorantSignUpRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Box, Grid, Button } from '@mui/material';

const DoctorantSignUpRequests = () => {
    const [doctorants, setDoctorants] = useState([]);
    const [encadrants, setEncadrants] = useState({});

    useEffect(() => {
        // Fetch Doctorant sign-up requests and their encadrants
        axios.get('http://localhost:8080/admin/NoValideDoctoran')
            .then(response => {
                const doctorantsData = response.data;
                setDoctorants(doctorantsData);
                doctorantsData.forEach(doc => {
                    if (doc.idencadrant) {
                        axios.get(`http://localhost:8080/professeur/ProfesseursId/${doc.idencadrant}`)
                            .then(resp => {
                                setEncadrants(prev => ({ ...prev, [doc.idencadrant]: `${resp.data.nom} ${resp.data.prenom}` }));
                            })
                            .catch(error => console.error(`Failed to fetch encadrant ${doc.idencadrant}:`, error));
                    }
                });
            })
            .catch(error => console.error('Failed to fetch doctorants:', error));
    }, []);

    const handleAcceptRequest = (id) => {
        // Implement the logic to accept a doctorant sign-up request
        console.log(`Accept request for doctorant with ID: ${id}`);
    };

    const handleRefuseRequest = (id) => {
        // Implement the logic to refuse a doctorant sign-up request
        console.log(`Refuse request for doctorant with ID: ${id}`);
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
                            <Button onClick={() => handleAcceptRequest(doc.id)}>Accept</Button>
                            <Button onClick={() => handleRefuseRequest(doc.id)}>Refuse</Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default DoctorantSignUpRequests;
