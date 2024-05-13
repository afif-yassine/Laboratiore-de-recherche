// ./ProfileProfSettings/ProfileProfSettings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, Paper, Box, CircularProgress, Avatar, Chip, Container, List, ListItem, Button, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DescriptionIcon from '@mui/icons-material/Description';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UpdateProfile from './UpdateProfile'; // Make sure to import the UpdateProfile component

// Assuming theme is configured in your project
import theme from '../../../theme/theme';
import axiosInstance from "../../login/interceptor";
import {jwtDecode} from "jwt-decode";

function getID() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {

        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.id
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

const ProfileProfSettings = ({ professorId = getID() }) => {
    const [professorDetails, setProfessorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // State to control dialog visibility


    useEffect(() => {
        fetchProfessorDetails();
    }, [professorId]);

    const fetchProfessorDetails = () => {
        setLoading(true);
        axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId2/${professorId}`)
            .then(response => {
                setProfessorDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                console.error('Error fetching professor details:', error);
                setLoading(false);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!professorDetails) {
        return <Typography variant="body1">Professor details not found.</Typography>;
    }

    return (
        <Container component={Box} py={5}>
            <Paper elevation={6} sx={{ p: theme.spacing(4), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                <Avatar
                    sx={{ bgcolor: theme.palette.secondary.main, width: 120, height: 120 }}
                    src="https://via.placeholder.com/150" // Placeholder or actual image URL
                    alt={`${professorDetails.nom} ${professorDetails.prenom}`}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    {professorDetails.nom} {professorDetails.prenom}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: theme.spacing(2) }}>
                    <Chip icon={<EmailIcon />} label={professorDetails.email} />
                    <Chip icon={<PhoneIcon />} label={professorDetails.numero} />
                    <Chip icon={<BadgeIcon />} label={professorDetails.status} color="primary" />
                    {professorDetails.isadmin && <Chip icon={<AdminPanelSettingsIcon />} label="Admin" color="success" />}
                    {professorDetails.ischef && <Chip icon={<GroupIcon />} label="Chef d'équipe" color="warning" />}
                </Box>
                <List sx={{ width: '100%' }}>
                    <ListItem sx={{ bgcolor: theme.palette.action.hover }}>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Equipe" secondary={professorDetails.equipe.nom} />
                    </ListItem>
                    <ListItem sx={{ bgcolor: 'rgba(79,75,75,0.15)' }}>
                        <ListItemIcon>
                            <LightbulbIcon />
                        </ListItemIcon>
                        <ListItemText primary="Axe de recherche" secondary={professorDetails.equipe.axederecherche} />
                    </ListItem>
                    <ListItem sx={{ bgcolor: theme.palette.action.hover }}>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Description" secondary={professorDetails.equipe.description} />
                    </ListItem>
                    <ListItem sx={{ bgcolor: 'rgba(79,75,75,0.15)' }}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Password" secondary={showPassword ? professorDetails.password : '***********'} />
                        <IconButton onClick={togglePasswordVisibility} edge="start">
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </ListItem>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setOpenUpdateDialog(true)}>
                        Modifier le profil
                    </Button>
                </List>
            </Paper>
            <UpdateProfile
                professorDetails={professorDetails}
                open={openUpdateDialog}
                handleClose={() => setOpenUpdateDialog(false)}
                refreshProfile={fetchProfessorDetails}
            />

        </Container>
    );
};

export default ProfileProfSettings;
