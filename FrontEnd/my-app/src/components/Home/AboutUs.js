import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    Paper,
    Card,
    CardContent,
    CardActions,
    CardMedia
} from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axiosInstance from "../login/interceptor";

const AboutUs = () => {
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/equipe/all')
            .then((response) => {
                setEquipes(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the team data:", error);
            });
    }, []);

    return (
        <div>
            {/* Hero section */}
            <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/chercheurs.png'})`,
                    padding: '11rem 0',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: -1,
                    },
                }}
            >
                <Typography variant="h2" sx={{ color: 'rgba(227, 64, 4, 1)', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    Notre Laboratoire
                </Typography>
                <Typography variant="subtitle1" sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    Learn about who we are
                </Typography>
            </Box>

            {/* Intro section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>Qui sommes-nous ?</Typography>
                <Typography paragraph>
                    Detailed information about the laboratory's mission, vision, and history...
                </Typography>
                <Button variant="contained" color="primary">En savoir plus</Button>
            </Container>

            {/* Values section */}
            <Box sx={{ backgroundColor: '#eee', py: 4 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom>Nos valeurs</Typography>
                    {/* Values could be a list or a set of cards */}
                    <Grid container spacing={2}>
                        {/* Values are listed here */}
                    </Grid>
                </Container>
            </Box>

            {/* Team section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>Nos équipes</Typography>
                <Grid container spacing={2}>
                    {equipes.map((equipe) => (
                        <Grid item xs={12} sm={6} md={4} key={equipe.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/chercheurs.png" // Replace with your image path
                                    alt={equipe.nom}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" component="p" sx={{ textTransform: 'uppercase', fontWeight: 'bold', }}>
                                        {equipe.nom}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>{equipe.axederecherche}</Typography>
                                    <Typography variant="body2">{equipe.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Location section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Card sx={{ p: 2 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>Localisation</Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Laboratoire de Recherche Informatique, Université Ibn Zohr
                        </Typography>
                        <Typography>Agadir, Maroc</Typography>
                        <Typography paragraph sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <LocationOnIcon sx={{ mr: 1 }} />
                            Accédez à notre laboratoire sur le campus pour en savoir plus sur nos activités et nos recherches.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" href="https://maps.google.com/?q=Université+Ibn+Zohr">
                            Voir sur la carte
                        </Button>
                    </CardActions>
                </Card>
            </Container>

            {/* Additional information section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>À propos du laboratoire</Typography>
                <Typography paragraph>
                    Fondé en [Year], le Laboratoire de Recherche Informatique a constamment été à la frontière des découvertes informatiques. Avec des projets allant de l'intelligence artificielle à la sécurité des données, nous cherchons non seulement à innover mais aussi à préparer la prochaine génération de chercheurs à avoir un impact positif sur le monde.
                </Typography>
                <Typography paragraph>
                    Nos infrastructures comprennent [describe labs, computing resources, etc.], permettant à nos chercheurs et étudiants de pousser les limites de la science et de la technologie.
                </Typography>
                {/* Any additional paragraphs or information */}
            </Container>

            {/* Contact or call-to-action section */}
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Contactez-nous</Typography>
                <Typography paragraph>
                    Descriptions or call-to-action related to inquiries and getting in touch.
                </Typography>
                <Button variant="contained" color="secondary">Nous joindre</Button>
            </Box>
        </div>
    );
};

export default AboutUs;
