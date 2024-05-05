import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, CircularProgress, useTheme } from '@mui/material';
import axios from 'axios';
import ProfessorsList from '../entity/ProfessorsList';
import TeamMemberCard from '../entity/TeamMemberCard';
import axiosInstance from "../login/interceptor";

const TeamPage = () => {
    const theme = useTheme();
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://localhost:8080/equipe/all')
            .then(response => {
                setTeams(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching teams data:", error);
                setLoading(false);
            });
    }, []);

    const handleTeamClick = (id) => {
        setSelectedTeamId(id);
        // Fetch professors for the selected team
        axiosInstance.get(`http://localhost:8080/professeur/equipe/${id}`)
            .then(response => {
                setProfessors(response.data);
            })
            .catch(error => {
                console.error("Error fetching professors data:", error);
            });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/chercheurs.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: theme.spacing(14, 2),
                    color: theme.palette.common.white,
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
                <Typography variant="h2" component="h1" gutterBottom>
                    Notre Laboratoire
                </Typography>
                <Typography variant="h5">
                    Découvrez qui nous sommes et notre équipe
                </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ py: theme.spacing(8) }}>
                <Typography variant="h4" gutterBottom>
                    Nos Équipes
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={0}>
                        {teams.map(member => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                onClick={handleTeamClick}
                                selected={member.id === selectedTeamId}
                            />
                        ))}
                    </Grid>
                )}
                {selectedTeamId && (
                    <Box sx={{ mt: theme.spacing(4) }}>
                        <Typography variant="h4" gutterBottom component="div">
                            Professeurs de l'Équipe
                        </Typography>
                        <ProfessorsList professors={professors} />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default TeamPage;
