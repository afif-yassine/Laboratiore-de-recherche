import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Notifications = ({ selectedNotification}) => {
    const [doctorants, setDoctorants] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [encadrants, setEncadrants] = useState({});
    const [equipes, setEquipes] = useState({});
    const [changementEquipes, setChangementEquipes] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [actionType, setActionType] = useState('');

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

        // Fetch Professeur sign-up requests and their equipes
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

        // Fetch Professeur change team requests
        axios.get('http://localhost:8080/admin/NoChangeEquipe')
            .then(response => {
                setChangementEquipes(response.data);
                response.data.forEach(change => {
                    axios.get(`http://localhost:8080/professeur/ProfesseursId/${change.profID}`)
                        .then(resp => {
                            setChangementEquipes(prev => prev.map(item => {
                                if (item.id === change.id) {
                                    return { ...item, profName: `${resp.data.nom} ${resp.data.prenom}` };
                                }
                                return item;
                            }));
                        })
                        .catch(error => console.error(`Failed to fetch professor ${change.profID}:`, error));

                    axios.get(`http://localhost:8080/equipe/${change.newEquipe}`)
                        .then(resp => {
                            setChangementEquipes(prev => prev.map(item => {
                                if (item.id === change.id) {
                                    return { ...item, equipeName: resp.data.nom };
                                }
                                return item;
                            }));
                        })
                        .catch(error => console.error(`Failed to fetch equipe ${change.newEquipe}:`, error));
                });
            })
            .catch(error => console.error('Failed to fetch changement equipes:', error));
    }, []);


    const handleAcceptRequest = (id, requestType) => {
        setOpenConfirmation(true);
        setSelectedRequestId(id);
        setActionType('accept');
    };

    const handleRefuseRequest = (id, requestType) => {
        setOpenConfirmation(true);
        setSelectedRequestId(id);
        setActionType('refuse');
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        setSelectedRequestId(null);
        setActionType('');
    };

    const handleConfirmAction = () => {
        if (actionType === 'accept') {
            // Implement accept request logic
            switch (selectedNotification) {
                case 'Doctorant Sign-up Requests':
                    axios.put(`http://localhost:8080/admin/accepteDoctorant/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Doctorant request accepted successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to accept doctorant request:', error);
                        });
                    break;
                case 'Professeur Sign-up Requests':
                    axios.put(`http://localhost:8080/admin/accepteProf/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Professeur request accepted successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to accept professeur request:', error);
                        });
                    break;
                case 'Professeur Change Team Requests':
                    axios.put(`http://localhost:8080/admin/accepteChangement/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Professeur change team request accepted successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to accept professeur change team request:', error);
                        });
                    break;
                default:
                    console.error('Invalid notification type');
            }
        } else if (actionType === 'refuse') {
            // Implement refuse request logic
            switch (selectedNotification) {
                case 'Doctorant Sign-up Requests':
                    axios.delete(`http://localhost:8080/admin/refuseDoctorant/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Doctorant request refused successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to refuse doctorant request:', error);
                        });
                    break;
                case 'Professeur Sign-up Requests':
                    axios.delete(`http://localhost:8080/admin/refuseProf/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Professeur request refused successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to refuse professeur request:', error);
                        });
                    break;
                case 'Professeur Change Team Requests':
                    axios.delete(`http://localhost:8080/admin/refuseChangement/${selectedRequestId}`)
                        .then(response => {
                            // Handle success
                            console.log('Professeur change team request refused successfully');
                            // Fetch updated data
                            fetchData();
                            // Close confirmation dialog
                            setOpenConfirmation(false);
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Failed to refuse professeur change team request:', error);
                        });
                    break;
                default:
                    console.error('Invalid notification type');
            }
        }
        setSelectedRequestId(null);
        setActionType('');
    };


// Function to fetch updated data
    const fetchData = () => {
        // Add logic here to fetch updated data and update state variables accordingly
    };



    const renderDoctorantDetails = () => (
        <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6">Doctorant Sign-up Requests</Typography>
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
                        <Button onClick={() => handleAcceptRequest(doc.id, 'doctorant')}>Accept</Button>
                        <Button onClick={() => handleRefuseRequest(doc.id, 'doctorant')}>Refuse</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );

    const renderProfesseurDetails = () => (
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
                        <Button onClick={() => handleAcceptRequest(prof.id, 'professeur')}>Accept</Button>
                        <Button onClick={() => handleRefuseRequest(prof.id, 'professeur')}>Refuse</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );

    const renderChangementEquipeDetails = () => (
        <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6">Professeur Change Team Requests</Typography>
            <List>
                {changementEquipes.map((change) => (
                    <ListItem key={change.id} divider>
                        <ListItemText
                            primary={`Prof: ${change.profName || 'Fetching...'}`}
                            secondary={`Date: ${change.date}`}
                        />
                        <ListItemText
                            primary={`New Equipe: ${change.equipeName || 'Fetching...'}`}
                        />
                        <Button onClick={() => handleAcceptRequest(change.id, 'changement')}>Accept</Button>
                        <Button onClick={() => handleRefuseRequest(change.id, 'changement')}>Refuse</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );

    const renderNotificationDetails = () => {
        switch (selectedNotification) {
            case 'Doctorant Sign-up Requests':
                return renderDoctorantDetails();
            case 'Professeur Sign-up Requests':
                return renderProfesseurDetails();
            case 'Professeur Change Team Requests':
                return renderChangementEquipeDetails();
            default:
                return <Typography>Select a notification type to see details.</Typography>;
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Notifications
            </Typography>
            <List>
                {['Doctorant Sign-up Requests', 'Professeur Sign-up Requests', 'Professeur Change Team Requests'].map((notificationType) => (
                    <ListItem
                        key={notificationType}
                        button

                    >
                        <ListItemText primary={notificationType} />
                    </ListItem>
                ))}
            </List>
            {renderNotificationDetails()}
            <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with this action?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Cancel</Button>
                    <Button onClick={handleConfirmAction}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Notifications;
