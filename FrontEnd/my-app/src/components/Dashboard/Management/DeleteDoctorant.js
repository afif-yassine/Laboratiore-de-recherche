import React, { useState, useEffect } from 'react';
import {
    Box, Button, Typography, Paper, CircularProgress, MenuItem, TextField, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axiosInstance from '../../login/interceptor';

const DeleteDoctorant = () => {
    const [doctorants, setDoctorants] = useState([]);
    const [selectedDoctorantId, setSelectedDoctorantId] = useState('');
    const [doctorant, setDoctorant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [encadrant, setEncadrant] = useState(null);
    const [coEncadrant, setCoEncadrant] = useState(null);

    useEffect(() => {
        fetchAllDoctorants();
    }, []);

    const fetchAllDoctorants = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/doctorant/all');
            setDoctorants(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch doctorants');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDoctorantId) {
            fetchDoctorantDetails(selectedDoctorantId);
        }
    }, [selectedDoctorantId]);

    const fetchDoctorantDetails = async (doctorantId) => {
        setError('');
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/doctorant/${doctorantId}`);
            setDoctorant(response.data);
            if (response.data.idencadrant) {
                fetchEncadrant(response.data.idencadrant);
            }
            if (response.data.coEncadrant) {
                fetchCoEncadrant(response.data.coEncadrant);
            }
        } catch (error) {
            setError('Failed to fetch doctorant details');
            console.error(error);
        }
        setLoading(false);
    };

    const fetchEncadrant = async (encadrantId) => {
        try {
            const response = await axiosInstance.get(`/doctorant/encadrant/${encadrantId}`);
            setEncadrant(response.data);
        } catch (error) {
            console.error('Failed to fetch encadrant details', error);
        }
    };

    const fetchCoEncadrant = async (coEncadrantId) => {
        try {
            const response = await axiosInstance.get(`/professeur/ProfesseursId2/${coEncadrantId}`);
            setCoEncadrant(response.data);
        } catch (error) {
            console.error('Failed to fetch co-encadrant details', error);
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
            await axiosInstance.delete(`/equipe/delete/${doctorant.id}`);
            alert('Doctorant successfully deleted');
            setDoctorants(doctorants.filter(d => d.id !== doctorant.id));
            setDoctorant(null);
            setSelectedDoctorantId('');
        } catch (error) {
            alert('Failed to delete doctorant');
            console.error(error);
        }
        handleCloseDialog();
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Delete Doctorant</Typography>
            <TextField
                select
                fullWidth
                label="Select Doctorant"
                value={selectedDoctorantId}
                onChange={e => setSelectedDoctorantId(e.target.value)}
                helperText="Please select a doctorant"
                sx={{ mb: 3 }}
            >
                {doctorants.map((doc) => (
                    <MenuItem key={doc.id} value={doc.id}>
                        {doc.nom} {doc.prenom} - {doc.email}
                    </MenuItem>
                ))}
            </TextField>

            {doctorant && (
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">{doctorant.nom} {doctorant.prenom}</Typography>
                    <Typography variant="subtitle1">Email: {doctorant.email}</Typography>
                    <Typography variant="body2">Phone: {doctorant.numero}</Typography>
                    <Typography variant="body2">Encadrant: {encadrant ? `${encadrant.nom} ${encadrant.prenom}` : 'N/A'}</Typography>
                    <Typography variant="body2">Co-Encadrant: {coEncadrant ? `${coEncadrant.nom} ${coEncadrant.prenom}` : 'N/A'}</Typography>
                    <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleOpenDialog}>
                        Delete Doctorant
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
                        Are you sure you want to delete this doctorant? This action cannot be undone.
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

export default DeleteDoctorant;
