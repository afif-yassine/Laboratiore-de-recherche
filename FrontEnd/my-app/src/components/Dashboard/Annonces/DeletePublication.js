import React, { useState } from 'react';
import { Button, Container, Typography, Card, CardContent, CardActions, Alert } from '@mui/material';
import axiosInstance from '../../login/interceptor';

const DeletePublication = ({ publicationId, onBack }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/publications/delete/${publicationId}`);
            console.log('Publication deleted');
            setSuccess(true);
            setError(null);
        } catch (error) {
            console.error('Error deleting publication:', error);
            setError('There was an error deleting the publication.');
            setSuccess(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Delete Publication
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to delete this publication?
                    </Typography>
                    <CardActions>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </CardActions>
                    {success && <Alert severity="success" sx={{ mt: 2 }}>Publication deleted successfully!</Alert>}
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

export default DeletePublication;
