import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import { Send as SendIcon, Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';

const ContactUs = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., sending data to an API
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contactez-nous
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Formulaire de contact
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Nom"
                                name="name"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={contact.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={contact.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Message"
                                name="message"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={contact.message}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{ mt: 3 }}
                            >
                                Envoyer
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={8} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Informations de contact
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneIcon sx={{ mr: 1 }} /> +212 698 75 68 41
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ mr: 1 }} /> labsive@uiz.ac.com
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon sx={{ mr: 1 }} /> B.P 8106, Agadir 80000
                        </Box>
                        {/* Here you can add a map or image */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Où nous trouver
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 300, // Set the height of the map
                                    borderRadius: '7px',
                                    overflow: 'hidden',
                                    mt: 2,
                                }}
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src="https://maps.google.com/maps?q=Université%20Ibn%20Zohr&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
