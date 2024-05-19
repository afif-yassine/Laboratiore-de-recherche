import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Box, CircularProgress, IconButton, useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import axiosInstance from "../login/interceptor";

import ProfessorsList from '../entity/ProfessorsList';
import TeamMemberCard from '../entity/TeamMemberCard';
import axios from "axios";

const TeamPage = () => {
    const theme = useTheme();
    const [teams, setTeams] = useState([]);
    const [bureau, setBureau] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = axiosInstance.get('http://localhost:8080/equipe/all');
        const fetchBureau = axios.get('http://localhost:8080/professeur/bureau');

        Promise.all([fetchTeams, fetchBureau]).then(([teamsResponse, bureauResponse]) => {
            setTeams(teamsResponse.data);
            setBureau(bureauResponse.data);
            setLoading(false);
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    }, []);

    const handleTeamClick = (id) => {
        setSelectedTeamId(id);
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
                    Le Bureau
                </Typography>
                <Grid container spacing={3}>
                    {bureau.map(member => (
                        <Grid item xs={12} sm={6} md={4} key={member.id}>
                            <TeamMemberCard
                                member={member}
                                onClick={handleTeamClick}
                                selected={member.id === selectedTeamId}
                                icon={member.ischef ? <PersonIcon /> : member.isadmin ? <BusinessCenterIcon /> : <GroupIcon />}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" sx={{ mt: theme.spacing(6) }} gutterBottom>
                    Nos Équipes
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {teams.map(team => (
                            <TeamMemberCard
                                key={team.id}
                                member={team}
                                onClick={handleTeamClick}
                                selected={team.id === selectedTeamId}
                                icon={<IconButton><GroupIcon /></IconButton>}
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
