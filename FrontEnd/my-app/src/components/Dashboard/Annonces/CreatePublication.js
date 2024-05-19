import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, Box, CardMedia } from '@mui/material';
import axios from "axios";

const CreatePublication = () => {
    const [publication, setPublication] = useState({
        content: '',
        datePublished: new Date().toISOString().split('T')[0], // Automatically generated date
        photoBase64: '',
        local: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setPublication({ ...publication, photoBase64: reader.result.split(',')[1] });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/publications/create', publication);
            console.log('Publication created:', response.data);
        } catch (error) {
            console.error('There was an error creating the publication!', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Create Publication</Typography>
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
                </CardContent>
            </Card>
        </Container>
    );
};

export default CreatePublication;
