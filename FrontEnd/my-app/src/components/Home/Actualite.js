import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Box, CircularProgress, CssBaseline, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import axiosInstance from "../login/interceptor";

// Styled components
const BackgroundBox = styled(Box)({
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?technology,laboratory)', // Replace with your desired background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '450px',
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
    marginBottom: '20px',
});

const TitleContainer = styled(Box)({
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
});

const Title = styled(Typography)({
    fontSize: '2.5rem',
    fontWeight: 'bold',
});

const Subtitle = styled(Typography)({
    fontSize: '1.25rem',
});

const PublicationCard = styled(Card)({
    marginBottom: '20px',
    width: '100%',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const PublicationContent = styled(CardContent)({
    padding: '16px',
});

const Actualite = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axiosInstance.get('/publications/getAll');
                const sortedPublications = response.data.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
                setPublications(sortedPublications);
            } catch (error) {
                console.error('Error fetching publications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <BackgroundBox>
                <TitleContainer>
                    <Title>Laboratoire Informatique Ibn Zohr</Title>
                    <Subtitle>Actualité</Subtitle>
                </TitleContainer>
            </BackgroundBox>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                {publications.map((publication) => (
                    <PublicationCard key={publication.id}>
                        <PublicationContent>
                            <Typography variant="h6" gutterBottom>
                                {publication.content}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Published on: {new Date(publication.datePublished).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Location: {publication.local}
                            </Typography>
                            {publication.photo && (
                                <CardMedia
                                    component="img"
                                    image={`data:image/jpeg;base64,${publication.photo}`}
                                    alt="Publication"
                                    sx={{ marginTop: 2, borderRadius: '8px' }}
                                />
                            )}
                        </PublicationContent>
                    </PublicationCard>
                ))}
            </Container>
        </React.Fragment>
    );
};

export default Actualite;
