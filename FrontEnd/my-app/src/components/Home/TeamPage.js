import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Box, CircularProgress, useTheme, IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import axiosInstance from "../login/interceptor";
import ProfessorsList from '../entity/ProfessorsList';
import MemberCard from '../entity/MemberCard';
import axios from "axios";
import TeamMemberCard from "../entity/TeamMemberCard";
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
                        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/back.svg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: theme.spacing(25, 2),
                        color: theme.palette.common.white,
                        textAlign: 'center',
                        position: 'relative',
                        animation: `${fadeIn} 1s ease-out`,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            zIndex: -1,
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            animation: `${fadeIn} 2s ease-out`,
                        }}
                    >
                        <Typography variant="h2" component="h1" gutterBottom sx={{ fontblack: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                            Meet Our Team
                        </Typography>
                        <Typography variant="h5" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Discover the Faces Behind Our Success
                            Meet our Team                        </Typography>
                    </Box>
                </Box>

            <Container maxWidth="lg" sx={{ py: theme.spacing(8) }}>
                <Typography variant="h4" gutterBottom>
                    Le Bureau
                </Typography>
                <Grid container spacing={3}>
                    {bureau.map(member => (
                        <Grid item xs={12} sm={6} md={4} key={member.id}>
                            <MemberCard
                                member={member}
                                onClick={() => handleTeamClick(member.id)}
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
                            <Grid item xs={12} sm={6} md={4} key={team.id}>
                                <TeamMemberCard
                                    member={team}
                                    onClick={() => handleTeamClick(team.id)}
                                    selected={team.id === selectedTeamId}
                                    icon={<IconButton><GroupIcon /></IconButton>}
                                    sx={{
                                        animation: `${fadeIn} 0.5s ease-out`,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {selectedTeamId && (
                    <Box sx={{ mt: theme.spacing(4) }}>
                        <Typography variant="h4" gutterBottom component="div">
                            Professeurs de l'Équipe
                        </Typography>
                        <ProfessorsList professors={professors} handleTeamClick={handleTeamClick} selectedTeamId={selectedTeamId} />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default TeamPage;
