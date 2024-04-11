import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Grid, Button } from '@mui/material';

const ProfesseurSignUpRequests = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const [equipes, setEquipes] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/admin/NoActiveProf')
            .then(response => {
                const professeursData = response.data;
                setProfesseurs(professeursData);
                professeursData.forEach(prof => {
                    if (prof.idequipe) {
                        axios.get(`http://localhost:8080/equipe/${prof.idequipe}`)
                            .then(resp => {
                                setEquipes(prev => ({ ...prev, [prof.idequipe]: resp.data.nom }));
                            })
                            .catch(error => console.error(`Failed to fetch equipe ${prof.idequipe}:`, error));
                    }
                });
            })
            .catch(error => console.error('Failed to fetch professeurs:', error));
    }, []);

    const handleAcceptRequest = (id) => {
        // Implement accept request logic here
        console.log('Accept request for Professeur with ID:', id);
    };

    const handleRefuseRequest = (id) => {
        // Implement refuse request logic here
        console.log('Refuse request for Professeur with ID:', id);
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
                        <Button onClick={() => handleAcceptRequest(prof.id)}>Accept</Button>
                        <Button onClick={() => handleRefuseRequest(prof.id)}>Refuse</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ProfesseurSignUpRequests;
