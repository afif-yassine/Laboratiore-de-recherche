import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container } from '@mui/material';
import axiosInstance from '../../login/interceptor';
import ModifyPublication from './ModifyPublication';
import DeletePublication from './DeletePublication';

const PublicationList = () => {
    const [publications, setPublications] = useState([]);
    const [selectedPublicationId, setSelectedPublicationId] = useState(null);
    const [action, setAction] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axiosInstance.get('/publications/getAll');
                setPublications(response.data);
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };

        fetchPublications();
    }, []);

    const handleBack = () => {
        setSelectedPublicationId(null);
        setAction(null);
    };

    return (
        <Container>
            {selectedPublicationId && action === 'modify' && (
                <ModifyPublication publicationId={selectedPublicationId} onBack={handleBack} />
            )}
            {selectedPublicationId && action === 'delete' && (
                <DeletePublication publicationId={selectedPublicationId} onBack={handleBack} />
            )}
            {!selectedPublicationId && (
                <Grid container spacing={4}>
                    {publications.map(publication => (
                        <Grid item key={publication.id} xs={12} sm={6} md={4}>
                            <Card>
                                {publication.photo && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`data:image/jpeg;base64,${publication.photo}`}
                                        alt="Publication Photo"
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {publication.content}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {publication.local}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(publication.datePublished).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        setSelectedPublicationId(publication.id);
                                        setAction('modify');
                                    }}
                                >
                                    Modify
                                </Button>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                        setSelectedPublicationId(publication.id);
                                        setAction('delete');
                                    }}
                                >
                                    Delete
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default PublicationList;
