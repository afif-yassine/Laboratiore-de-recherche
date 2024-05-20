import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, Box, Alert } from '@mui/material';
import axiosInstance from "../../login/interceptor";

const CreatePublication = () => {
    const [publication, setPublication] = useState({
        content: '',
        datePublished: new Date().toISOString().split('T')[0], // Automatically generated date
        local: ''
    });

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [success, setSuccess] = useState(false); // New state to track success status
    const [error, setError] = useState(null); // New state to track error status

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('publicationDTO', new Blob([JSON.stringify(publication)], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axiosInstance.post('/publications/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Publication created:', response.data);
            setSuccess(true);
            setError(null); // Clear any previous error
            setPublication({
                content: '',
                datePublished: new Date().toISOString().split('T')[0], // Reset to current date
                local: ''
            });
            setFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('There was an error creating the publication!', error);
            setError('There was an error creating the publication.');
            setSuccess(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Create Publication
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Content"
                            name="content"
                            value={publication.content}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <TextField
                            label="Local"
                            name="local"
                            value={publication.local}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Upload Photo
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {imagePreview && (
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: 400,
                                    maxWidth: '100%',
                                    marginTop: 2,
                                }}
                                src={imagePreview}
                                alt="Preview"
                            />
                        )}
                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Create
                            </Button>
                        </CardActions>
                    </form>
                    {success && <Alert severity="success" sx={{ mt: 2 }}>Publication created successfully!</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default CreatePublication;
