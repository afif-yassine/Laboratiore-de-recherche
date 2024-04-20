import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangeTeamRequest = ({ profID = 58 }) => {
    const [newEquipe, setNewEquipe] = useState('');
    const [equipes, setEquipes] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        axios.get('http://localhost:8080/equipe/all')
            .then(response => setEquipes(response.data))
            .catch(error => console.error('Failed to fetch equipes:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate that a new team has been selected
        if (!newEquipe) {
            setSnackbarMessage('Please select a new team before submitting.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        axios.post('http://localhost:8080/ChangeEquipe/CreateChangement', { profID, newEquipe })
            .then(response => {
                setSnackbarMessage('Request to change team has been submitted successfully.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setNewEquipe(''); // Reset the selection
            })
            .catch(error => {
                console.error('Failed to submit change team request:', error);
                setSnackbarMessage('Failed to submit request.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
                <Typography variant="h6" gutterBottom>Request Team Change</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="new-equipe-label">New Team</InputLabel>
                        <Select
                            labelId="new-equipe-label"
                            id="new-equipe-select"
                            value={newEquipe}
                            label="New Team"
                            onChange={(e) => setNewEquipe(e.target.value)}
                            required
                        >
                            {equipes.map((equipe) => (
                                <MenuItem key={equipe.id} value={equipe.id}>{equipe.nom}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Submit Request
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ChangeTeamRequest;
