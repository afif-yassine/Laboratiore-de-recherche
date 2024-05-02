import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, Paper, Snackbar } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Articles = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorIds, setAuthorIds] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        axios.get('http://localhost:8080/professeur/all')
            .then(response => setAuthors(response.data))
            .catch(error => console.error('Failed to fetch authors:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const articleData = {
            titre: title,
            description: content,
            publicationDate: new Date(), // Today's date
            authorIds: authorIds.map(author => author.id)
        };

        axios.post('http://localhost:8080/Article/create', articleData)
            .then(response => {
                setSnackbarMessage('Article created successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTitle('');
                setContent('');
                setAuthorIds([]);
            })
            .catch(error => {
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
                <Autocomplete
                    multiple
                    options={authors}
                    getOptionLabel={(option) => option.nom}
                    value={authorIds}
                    onChange={(event, newValue) => {
                        setAuthorIds(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Authors"
                            placeholder="Select authors"
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
