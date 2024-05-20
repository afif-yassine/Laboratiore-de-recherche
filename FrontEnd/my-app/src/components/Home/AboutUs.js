import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    Card,
    CardContent,
    CardActions,
    CardMedia, Stack
} from '@mui/material';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axiosInstance from "../login/interceptor";


const AboutUs = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/equipe/all')
            .then((response) => {
                setTeams(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the team data:", error);
            });
    }, []);

    return (
        <div>
            {/* Hero section with large background image */}
            <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/hero.png'})`,
                    padding: '12rem 0',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundSize: 'cover',  // Ensures the image covers the full area
                    backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: -1,
                    },
                }}
            >

                <Typography variant="h2" sx={{fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                    Explore Our Lab
                </Typography>
                <Typography variant="subtitle1" sx={{fontSize: '1.5rem', textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                    Where Innovation Meets Tradition
                </Typography>
            </Box>

            {/* About the Lab section with images */}
            <Container maxWidth="lg" sx={{py: 4}}>
                <Typography variant="h4" gutterBottom>About the Lab</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography paragraph>
                            The Systems and Computer Vision Laboratory (LabSIV) at Ibn Zohr University in Agadir focuses on research in mathematics and computer science. It's part of the Faculty of Sciences and the Ibn Zohr Doctoral Studies Center. The lab, led by Professor K. AFDEL, explores advanced areas in computer vision and systems, contributing significantly to the academic and practical understanding of these fields                        </Typography>
                        <Button variant="contained" color="primary" href="http://www.fsa.ac.ma/">Learn More</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={`${process.env.PUBLIC_URL + '/images/Departement.JPG'}`} // Ensure you have a suitable image
                                alt="Lab Activities"
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Core Values with images */}
            <Box sx={{backgroundColor: '#f5f5f5', py: 4}}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>Our Values</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${process.env.PUBLIC_URL + '/images/Innovation.png'}`} // Update with a relevant image
                                    alt="Innovation"
                                />
                                <CardContent>
                                    <Typography variant="h5">Innovation</Typography>
                                    <Typography>
                                        Driving forward with creativity and pioneering research, our lab explores the
                                        unknown, paving the way for new technologies.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${process.env.PUBLIC_URL + '/images/Integrity.webp'}`} // Update with a relevant image
                                    alt="Integrity"
                                />
                                <CardContent>
                                    <Typography variant="h5">Integrity</Typography>
                                    <Typography>
                                        Adherence to the highest ethical standards guides all our research and
                                        professional conduct.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${process.env.PUBLIC_URL + '/images/Collaboration.png'}`} // Update with a relevant image
                                    alt="Collaboration"
                                />
                                <CardContent>
                                    <Typography variant="h5">Collaboration</Typography>
                                    <Typography>
                                        We promote a collaborative environment that enhances our collective expertise
                                        and achieves common goals.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Our Team with images */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>Research Focus</Typography>
                <Grid container spacing={2}>
                    {teams.map((team) => (
                        <Grid item xs={12} sm={6} md={4} key={team.id}>
                            <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={team.imageUrl || `https://source.unsplash.com/random/?programation,${team.axederecherche}`}
                                    alt={team.axederecherche}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {team.axederecherche}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                                        By Equipe : {team.nom}
                                    </Typography>
                                    <Typography>{team.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box sx={{backgroundColor: '#f5f5f5', py: 8}}>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined" image={process.env.PUBLIC_URL +'./images/pictoEMPLOISTAGES.a30d32beeeee.svg'}>
                        Jobs / Internships
                    </Button>
                    <Button variant="outlined" image={process.env.PUBLIC_URL +'./images/pictoMEDIATHEQUE.03dd756115f7.svg'}>
                        Media Library
                    </Button>
                    <Button variant="outlined" image={process.env.PUBLIC_URL +'./images/pictoMEDIATHEQUE.03dd756115f7.svg'}>
                        People
                    </Button>
                    <Button variant="outlined" image={process.env.PUBLIC_URL +'./images/pictoScolaires.8c3c945d2b65.svg'}>
                        Schools
                    </Button>
                </Stack>
            </Box>

            {/* Location and Contact with map image */}
            <Container maxWidth="lg" sx={{py: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{height: '100%', p: 2}}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Location</Typography>
                                <Typography variant="subtitle1">
                                    Faculté des Sciences, Université Ibn Zohr
                                </Typography>
                                <Typography>Agadir, Morocco</Typography>
                                <Typography sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                                    <LocationOnIcon sx={{mr: 1}}/>
                                    Visit our campus to learn more about our research and activities.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary"
                                        href="https://maps.google.com/?q=Université+Ibn+Zohr">
                                    View on Map
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{height: '100%', p: 2}}>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Contact Us</Typography>
                                <Typography>
                                    For inquiries, collaborations, or more information, feel free to reach out to our
                                    administration.
                                </Typography>
                                <Button variant="contained" color="secondary" sx={{mt: 2}}>
                                    Get in Touch
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AboutUs;
