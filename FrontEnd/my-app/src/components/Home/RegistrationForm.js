import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress, Grid, FormControl, FormControlLabel, Checkbox, FormLabel, Radio, RadioGroup, Select, MenuItem, InputLabel, Alert } from '@mui/material';import axios from 'axios';
import axiosInstance from "../login/interceptor";

const RegistrationForm = () => {
    const [submissionStatus, setSubmissionStatus] = useState({
        submitted: false,
        error: false,
    });
    const [userType, setUserType] = useState('professeur');
    const [ischef, setIsChef] = useState(false);
    const [idequipe, setIdequipe] = useState('');
    const [status, setStatus] = useState('');
    const [teams, setTeams] = useState([]);
    const [Profs, setProfs] = useState([]);

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        numero: '',
        password: '',
        idencadrant: '',
        coEncadrant: '',
        active: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://localhost:8080/equipe/all')
            .then(response => {
                setTeams(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                console.error("Error fetching teams data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://localhost:8080/professeur/all')
            .then(response => {
                const filteredProfs = response.data.filter(prof => prof.status === 'PES' || prof.status === 'PH');
                setProfs(filteredProfs);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                console.error("Error fetching Profs data:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        let submissionData = { ...formData };
        const url = userType === 'professeur' ? 'http://localhost:8080/professeur/inscription' : 'http://localhost:8080/doctorant/inscription';

        if (userType === 'professeur') {
            submissionData = { ...submissionData, status, ischef, idequipe, isadmin: false };
        } else if (userType === 'doctorant') {
            submissionData = { ...submissionData, idencadrant: formData.idencadrant, coEncadrant: formData.coEncadrant || null }; // Adjust as per your backend needs
        }

        axiosInstance.post(url, submissionData)
            .then(response => {
                setLoading(false);
                setSubmissionStatus({ submitted: true, error: false });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                setLoading(false);
                console.error("Registration failed", error);
                setSubmissionStatus({ submitted: true, error: true });
            });
    };


    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Inscription
                </Typography>
                {/* Conditional rendering based on submission status */}
                {submissionStatus.submitted && !submissionStatus.error ? (
                    <Alert severity="success" sx={{ width: '100%', mt: 3 }}>
                        Inscription complétée avec succès. Veuillez attendre 24 heures pour obtenir une réponse.
                    </Alert>
                ) : submissionStatus.error ? (
                    <Alert severity="error" sx={{ width: '100%', mt: 3 }}>
                        Une erreur s'est produite lors de l'inscription. Veuillez réessayer.
                    </Alert>
                ) : (
                    // Render form if not yet submitted successfully
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Vous êtes</FormLabel>
                                    <RadioGroup row name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                        <FormControlLabel value="professeur" control={<Radio />} label="Professeur" />
                                        <FormControlLabel value="doctorant" control={<Radio />} label="Doctorant" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth name="nom" label="Nom" value={formData.nom} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth name="prenom" label="Prénom" value={formData.prenom} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="numero" label="Numéro" value={formData.numero} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Mot de passe" type="password" value={formData.password} onChange={handleChange} />
                            </Grid>
                            {userType === 'doctorant' && (
                                <>
                                    <Grid item xs={12}>
                                        <FormControl required fullWidth>
                                            <InputLabel id="idencadrant-label">Encadrant</InputLabel>
                                            <Select
                                                labelId="idencadrant-label"
                                                id="idencadrant"
                                                name="idencadrant"
                                                value={formData.idencadrant}
                                                label="Encadrant"
                                                onChange={handleChange}
                                            >
                                                {Profs.map((prof) => (
                                                    <MenuItem key={prof.id} value={prof.id}>{prof.nom} {prof.prenom}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="coEncadrant-label">Co-Encadrant (Optional)</InputLabel>
                                            <Select
                                                labelId="coEncadrant-label"
                                                id="coEncadrant"
                                                name="coEncadrant"
                                                value={formData.coEncadrant || ''}
                                                label="Co-Encadrant (Optional)"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {Profs.map((prof) => (
                                                    <MenuItem key={prof.id} value={prof.id}>{prof.nom} {prof.prenom}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            )}
                            {userType === 'professeur' && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="status-label">Status</InputLabel>
                                            <Select labelId="status-label" id="status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                                                <MenuItem value="PA">Professeur Assistant (PA)</MenuItem>
                                                <MenuItem value="PH">Professeur Habilité (PH)</MenuItem>
                                                <MenuItem value="PES">Professeur de l'Enseignement Supérieur (PES)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel control={<Checkbox checked={ischef} onChange={(e) => setIsChef(e.target.checked)} name="ischef" />} label="Chef d'équipe" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="equipe-label">Équipe</InputLabel>
                                            <Select labelId="equipe-label" id="idequipe" value={idequipe} label="Équipe" onChange={(e) => setIdequipe(e.target.value)}>
                                                {teams.map((team) => (
                                                    <MenuItem key={team.id} value={team.id}>{team.nom}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            )}
                            {loading && <CircularProgress />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            S'inscrire
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default RegistrationForm;
