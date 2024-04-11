import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Box, Grid, CircularProgress, Avatar, Chip, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Badge from '@mui/icons-material/Badge';

// Import theme configuration
import theme from '../../../theme/theme';

const ProfileSettings = ({ professorId = 60 }) => {
    const [professorDetails, setProfessorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        axios.get(`http://localhost:8080/professeur/ProfesseursId2/${professorId}`)
            .then(response => {
                setProfessorDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching professor details:', error);
                setLoading(false);
            });
    }, [professorId]);

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
            <Paper elevation={6} sx={{ p: theme.spacing(4), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar
                    sx={{ bgcolor: theme.palette.primary.light, width: 120, height: 120 }}
                    src="https://via.placeholder.com/150" // Placeholder or actual image URL
                    alt={`${professorDetails.nom} ${professorDetails.prenom}`}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    {professorDetails.nom} {professorDetails.prenom}
                </Typography>
                <Chip icon={<EmailIcon />} label={professorDetails.email} variant="outlined" />
                <Chip icon={<PhoneIcon />} label={professorDetails.numero} variant="outlined" />
                <Chip
                    icon={<Badge />}
                    label={`${professorDetails.status} ${professorDetails.ischef ? '| Chef d\'équipe' : ''}`}
                    color="primary"
                    variant="outlined"
                />
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>Equipe Details:</Typography>
                    <Typography><strong>Equipe Nom:</strong> {professorDetails.equipe.nom}</Typography>
                    <Typography><strong>Axe de recherche:</strong> {professorDetails.equipe.axederecherche}</Typography>
                    <Typography><strong>Description:</strong> {professorDetails.equipe.description}</Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileSettings;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Box, Grid, CircularProgress, Avatar, Chip, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import Badge from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DescriptionIcon from '@mui/icons-material/Description';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import KeyIcon from '@mui/icons-material/Key';

// Assuming theme is properly set up and exported in '../../../theme/theme'
import theme from '../../../theme/theme';

const ProfileSettings = ({ professorId = 60 }) => {
    const [professorDetails, setProfessorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        axios.get(`http://localhost:8080/professeur/ProfesseursId2/${professorId}`)
            .then(response => {
                setProfessorDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching professor details:', error);
                setLoading(false);
            });
    }, [professorId]);

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
            <Paper elevation={6} sx={{ p: theme.spacing(4), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, backgroundColor: theme.palette.background.default }}>
                <Avatar
                    sx={{ bgcolor: theme.palette.secondary.main, width: 120, height: 120 }}
                    src="https://via.placeholder.com/150"
                    alt={`${professorDetails.nom} ${professorDetails.prenom}`}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    {`${professorDetails.nom} ${professorDetails.prenom}`}
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <Chip icon={<EmailIcon />} label={professorDetails.email} variant="outlined" />
                        <Chip icon={<PhoneIcon />} label={professorDetails.numero} sx={{ ml: 1 }} variant="outlined" />
                        <Chip
                            icon={<Badge />}
                            label={`${professorDetails.status} ${professorDetails.ischef ? '| Chef d\'équipe' : ''}`}
                            color="primary"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <List sx={{ width: '100%', bgcolor: theme.palette.background.paper }}>
                    <ListItem>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Administrator: ${professorDetails.isadmin ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <VerifiedUserIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Chef d'équipe: ${professorDetails.ischef ? 'Yes' : 'No'}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Equipe: ${professorDetails.equipe.nom}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <WorkIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Axe de recherche: ${professorDetails.equipe.axederecherche}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Description: ${professorDetails.equipe.description}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <KeyIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={`Password: ${professorDetails.password}`} />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
};

export default ProfileSettings;
