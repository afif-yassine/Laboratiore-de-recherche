import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../../login/interceptor";
import { jwtDecode } from 'jwt-decode';
import {
    Card, CardContent, Typography, Avatar, Box, CircularProgress, Chip,
    List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails, Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import UpdateProfile from './UpdateProfile';

function ProfileDoctorantSettings() {
    const { id } = useParams();
    const [doctorant, setDoctorant] = useState(null);
    const [encadrant, setEncadrant] = useState(null);
    const [coEncadrant, setCoEncadrant] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const handleOpenUpdateDialog = () => setOpenUpdateDialog(true);
    const handleCloseUpdateDialog = () => setOpenUpdateDialog(false);

    async function fetchProfessorDetails(professorId) {
        if (!professorId) return null;
        try {
            const response = await axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId2/${professorId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch professor data:', error);
        }
        return null;
    }

    async function fetchDoctorant() {
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const decoded = jwtDecode(token);
            if (!decoded.id) throw new Error('Invalid token data');

            const response = await axiosInstance.get(`http://localhost:8080/doctorant/${decoded.id}`);
            const doctorantData = response.data;
            setDoctorant(doctorantData);
            const encadrantData = await fetchProfessorDetails(doctorantData.idencadrant);
            setEncadrant(encadrantData);
            const coEncadrantData = await fetchProfessorDetails(doctorantData.coEncadrant);
            setCoEncadrant(coEncadrantData);
        } catch (error) {
            console.error('Failed to fetch doctorant data:', error);
            setError(error.message || 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctorant();
    }, []);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!doctorant) {
        return <Typography variant="h6" color="error">Doctorant not found</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 800, m: 3, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                    <Avatar sx={{ bgcolor: "secondary.main", width: 90, height: 90, mb: 2 }}>
                        <AccountCircleIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Typography variant="h4" gutterBottom>
                        {doctorant.nom} {doctorant.prenom}
                    </Typography>
                    <Chip label="Doctorant Profile" color="primary" />
                </Box>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Email" secondary={doctorant.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            {doctorant.active ? <ToggleOnIcon color="success" /> : <ToggleOffIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary="Status" secondary={doctorant.active ? 'Active' : 'Inactive'} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Phone Number" secondary={doctorant.numero} />
                    </ListItem>
                    {renderProfessorDetails("Encadrant", encadrant)}
                    {renderProfessorDetails("Co-Encadrant", coEncadrant)}
                </List>
                <Button color="primary" onClick={handleOpenUpdateDialog}>
                    Update Profile
                </Button>
                <UpdateProfile
                    professorDetails={doctorant}
                    open={openUpdateDialog}
                    handleClose={handleCloseUpdateDialog}
                    refreshProfile={fetchDoctorant}
                />
            </CardContent>
        </Card>
    );

    function renderProfessorDetails(title, professor) {
        if (!professor) return null;

        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}: {professor.nom} {professor.prenom}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Email" secondary={professor.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Phone Number" secondary={professor.numero} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Team Name" secondary={professor.equipe.nom} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Research Axis" secondary={professor.equipe.axederecherche} />
                    </ListItem>
                </List>
            </AccordionDetails>
    </Accordion>
    );
    }
}

export default ProfileDoctorantSettings;
