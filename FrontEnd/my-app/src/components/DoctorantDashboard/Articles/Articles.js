import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Paper, Snackbar } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';
import axiosInstance from "../../login/interceptor";
import { jwtDecode } from 'jwt-decode';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function getID() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

const Articles = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [professeurIds, setProfesseurIds] = useState([]);
    const [doctorantIds, setDoctorantIds] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [doctorants, setDoctorants] = useState([]);
    const [publisher, setPublisher] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/professeur/all')
            .then(response => {
                setProfesseurs(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch professeurs:', error);
            });
    }, []);

    useEffect(() => {
        setDoctorants([]);
        setDoctorantIds([]);
        professeurIds.forEach(prof => {
            axiosInstance.get(`http://localhost:8080/professeur/DoctoransOfProfesseur/${prof.id}`)
                .then(response => {
                    setDoctorants(prev => [...prev, ...response.data]);
                })
                .catch(error => {
                    console.error(`Failed to fetch doctorants for professeur ${prof.id}:`, error);
                });
        });
    }, [professeurIds]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('titre', title);
        formData.append('description', content);
        formData.append('publicationDate', new Date());
        formData.append('isActive', isActive);
        formData.append('publisher', getID());
        formData.append('pdf', pdfFile);
        professeurIds.forEach(id => formData.append('authorIds', id));
        doctorantIds.forEach(id => formData.append('authorIds', id));

        axiosInstance.post('http://localhost:8080/Article/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setSnackbarMessage('Article created successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTitle('');
                setContent('');
                setProfesseurIds([]);
                setDoctorantIds([]);
                setIsActive(false);
                setPublisher(getID());
                setPdfFile(null);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                console.error('Failed to create article:', error);
                setSnackbarMessage('Failed to create article.');
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
        <Paper elevation={3} sx={{ padding: 4, margin: 4 }}>
            <Typography variant="h6" gutterBottom>Create New Article</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    label="Title"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Content"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <TextField
                    type="file"
                    accept="application/pdf"
                    label="Upload PDF"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    sx={{ mt: 2 }}
                />
                <Autocomplete
                    multiple
                    options={professeurs}
                    getOptionLabel={(option) => option.nom}
                    value={professeurIds}
                    onChange={(event, newValue) => {
                        setProfesseurIds(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Professeurs"
                            placeholder="Select professeurs"
                        />
                    )}
                    sx={{ mt: 2, mb: 2 }}
                />
                <Autocomplete
                    multiple
                    options={doctorants}
                    getOptionLabel={(option) => `${option.nom} ${option.prenom}`}
                    value={doctorantIds}
                    onChange={(event, newValue) => {
                        setDoctorantIds(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Doctorants"
                            placeholder="Select doctorants"
                        />
                    )}
                    sx={{ mt: 2, mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Create Article
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default Articles;
