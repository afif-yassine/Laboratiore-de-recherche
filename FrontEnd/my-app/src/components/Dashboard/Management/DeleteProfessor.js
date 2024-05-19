import React, { useState, useEffect } from 'react';
import {
    Box, Button, Typography, Paper, CircularProgress, MenuItem, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axiosInstance from "../../login/interceptor";

const DeleteProfessor = () => {
    const [professors, setProfessors] = useState([]);
    const [selectedProfessorId, setSelectedProfessorId] = useState('');
    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // State for handling the dialog visibility

    useEffect(() => {
        fetchAllProfessors();
    }, []);

    const fetchAllProfessors = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/professeur/all');
            setProfessors(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch professors');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProfessorId) {
            fetchProfessorDetails(selectedProfessorId);
        }
    }, [selectedProfessorId]);

    const fetchProfessorDetails = async (professorId) => {
        setError('');
        try {
            const response = await axiosInstance.get(`/professeur/ProfesseursId2/${professorId}`);
            setProfessor(response.data);
        } catch (error) {
            setError('Failed to fetch professor details');
            console.error(error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/professeur/remove/${professor.id}`);
            alert('Professor successfully deleted');
            setProfessors(professors.filter(p => p.id !== professor.id));
            setProfessor(null);
            setSelectedProfessorId('');
        } catch (error) {
            alert('Failed to delete professor');
            console.error(error);
        }
        handleCloseDialog();
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Delete Professor</Typography>
            <TextField
                select
                fullWidth
                label="Select Professor"
                value={selectedProfessorId}
                onChange={e => setSelectedProfessorId(e.target.value)}
                helperText="Please select a professor"
                sx={{ mb: 3 }}
            >
                {professors.map((prof) => (
                    <MenuItem key={prof.id} value={prof.id}>
                        {prof.nom} {prof.prenom} - {prof.email}
                    </MenuItem>
                ))}
            </TextField>

            {professor && (
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">{professor.nom} {professor.prenom}</Typography>
                    <Typography variant="subtitle1">Email: {professor.email}</Typography>
                    <Typography variant="body2">Phone: {professor.numero}</Typography>
                    <Typography variant="body2">Status: {professor.status}</Typography>
                    <Typography variant="body2">Is Admin: {professor.isadmin ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body2">Is Chef: {professor.ischef ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body2">Team: {professor.equipe ? professor.equipe.nom : 'No Team'}</Typography>
                    <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleOpenDialog}>
                        Delete Professor
                    </Button>
                </Paper>
            )}

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this professor? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default DeleteProfessor;
