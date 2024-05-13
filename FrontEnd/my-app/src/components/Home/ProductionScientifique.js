import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Container, Paper, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import FeaturedArticles from "../entity/FeaturedArticles";

const ProductionScientifique = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/admin/allArticle')
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <HeroSection />
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <FeaturedArticles articles={articles} />
                )}
                <ExploreMore />
            </Box>
        </Container>
    );
};

const HeroSection = () => (
    <Paper
        sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 6,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: 'url(https://source.unsplash.com/random/?science)',
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
        }}
    >
        <Typography component="h1" variant="h3" align="center" color="inherit" gutterBottom>
            Welcome to Production Scientifique
        </Typography>
        <Typography variant="h5" align="center" color="inherit" paragraph>
            Discover cutting-edge scientific research and insights from leading scholars.
        </Typography>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
            Learn More
        </Button>
    </Paper>
);

const ExploreMore = () => (
    <Box mt={4} textAlign="center">
        <Button variant="outlined" startIcon={<SearchIcon />}>
            Explore Topics
        </Button>
        <Button variant="outlined" startIcon={<ScienceIcon />} sx={{ ml: 2 }}>
            Advanced Search
        </Button>
    </Box>
);

export default ProductionScientifique;
