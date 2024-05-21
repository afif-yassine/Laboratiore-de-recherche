
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Container,
    Paper, CircularProgress, MenuItem, FormControl, InputLabel, Select, OutlinedInput,
    TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FeaturedArticles from "../../entity/FeaturedArticles";  // Ensure the import path is correct based on your project structure
import FilterControls from '../../entity/FilterControls';
import axiosInstance from "../../login/interceptor";  // Ensure the import path is correct

function AllArticle() {
    const [articles, setArticles] = useState([]);
    const [displayedArticles, setDisplayedArticles] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [selectedEquipe, setSelectedEquipe] = useState('');
    const [selectedProfesseur, setSelectedProfesseur] = useState('');
    const [titreFilter, setTitreFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [authorDetails, setAuthorDetails] = useState([]);


    useEffect(() => {
        fetchAllArticles();
        fetchEquipes();
        fetchProfesseurs();
    }, []);

    const fetchAllArticles = () => {
        axios.get('http://localhost:8080/admin/allArticle')
            .then(response => {
                setArticles(response.data);
                setDisplayedArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setLoading(false);
            });
    };

    const fetchEquipes = () => {
        axios.get('http://localhost:8080/equipe/all')
            .then(response => {
                setEquipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching equipes:', error);
            });
    };

    const fetchProfesseurs = () => {
        axios.get('http://localhost:8080/professeur/all')
            .then(response => {
                setProfesseurs(response.data);
            })
            .catch(error => {
                console.error('Error fetching professeurs:', error);
            });
    };

    const handleArticleClick = async (article) => {
        const authorIds = article.authorIds;
        const authors = [];
        for (const id of authorIds) {
            const response = await axiosInstance.get(`http://localhost:8080/admin/membre/${id}`);
            authors.push(response.data);
        }
        setAuthorDetails(authors);
        setSelectedArticle(article);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedArticle(null);
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'equipe' || filterType === 'professeur') {
            const apiURL = filterType === 'equipe' ? `http://localhost:8080/Article/getArticlesByEquipeId/${value}` : `http://localhost:8080/Article/MesArticles/${value}`;
            if (value) {
                axios.get(apiURL)
                    .then(response => {
                        setArticles(response.data);
                        filterArticles(titreFilter, response.data);
                    });
            } else {
                fetchAllArticles();
            }
            if (filterType === 'equipe') setSelectedProfesseur('');
            if (filterType === 'professeur') setSelectedEquipe('');
        } else if (filterType === 'titre') {
            setTitreFilter(value);
            filterArticles(value, articles);
        }
    };

    const filterArticles = (filterText, articlesArray) => {
        const filtered = !filterText ? articlesArray : articlesArray.filter(article => article.titre.toLowerCase().includes(filterText.toLowerCase()));
        setDisplayedArticles(filtered);
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h5" gutterBottom>
                    Explore Articles
                </Typography>
                <FilterControls
                    equipes={equipes}
                    professeurs={professeurs}
                    selectedEquipe={selectedEquipe}
                    selectedProfesseur={selectedProfesseur}
                    titreFilter={titreFilter}
                    handleFilterChange={handleFilterChange}
                />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <FeaturedArticles
                        articles={displayedArticles}
                        handleArticleClick={handleArticleClick}
                        selectedArticle={selectedArticle}
                        authorDetails={authorDetails}
                        openDialog={openDialog}
                        handleCloseDialog={handleCloseDialog}
                    />
                )}
            </Box>
        </Container>
    );
}

export default AllArticle;
