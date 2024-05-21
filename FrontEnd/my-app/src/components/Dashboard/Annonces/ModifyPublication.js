import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, Box, Alert } from '@mui/material';
import axiosInstance from '../../login/interceptor';

const ModifyPublication = ({ publicationId, onBack }) => {
    const [publication, setPublication] = useState({
        content: '',
        datePublished: new Date().toISOString().split('T')[0],
        local: ''
    });

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axiosInstance.get(`/publications/getById/${publicationId}`);
                const data = response.data;
                setPublication({
                    content: data.content,
                    datePublished: data.datePublished,
                    local: data.local
                });
                if (data.photo) {
                    setImagePreview(`data:image/jpeg;base64,${data.photo}`);
                }
            } catch (error) {
                console.error('Error fetching publication:', error);
            }
        };

        fetchPublication();
    }, [publicationId]);

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
            const response = await axiosInstance.put(`/publications/update/${publicationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Publication updated:', response.data);
            setSuccess(true);
            setError(null);
        } catch (error) {
            console.error('Error updating publication:', error);
            setError('There was an error updating the publication.');
            setSuccess(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Modify Publication
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
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Update
                            </Button>
                        </CardActions>
                    </form>
                    {success && <Alert severity="success" sx={{ mt: 2 }}>Publication updated successfully!</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth onClick={onBack}>
                        Back to List
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default ModifyPublication;
