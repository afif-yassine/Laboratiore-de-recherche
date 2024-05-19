import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, CircularProgress, Box, CardMedia, Button
} from '@mui/material';
import axiosInstance from "../../login/interceptor"; // Ensure the path is correct
import { jwtDecode } from "jwt-decode";

function getID() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.id
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

const ArticleDisplay = ({ articleId = getID() }) => {
    const [articles, setArticles] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticles();
    }, [articleId]);

    const fetchArticles = () => {
        setLoading(true);
        axiosInstance.get(`http://localhost:8080/Article/MesArticles/${articleId}`)
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError(error.toString());
                setLoading(false);
            });
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>;
    }
    if (error) {
        return <Typography color="error" align="center">Error: {error}</Typography>;
    }
    if (!articles || articles.length === 0) {
        return (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align="center" variant="h5">No articles found.</Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={fetchArticles}>
                    Try Again
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 3, p: 2 }}>
            <Typography variant="h6" color="primary" sx={{ textAlign: 'center', mt: 1 }}>
                Articles ({articles.length})
            </Typography>
            {articles.map(article => (
                <Card key={article.id} sx={{ mb: 2, transition: '0.3s', "&:hover": { boxShadow: 6 } }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={article.imageUrl || 'https://source.unsplash.com/random/?book,science'} // Fallback to a random image related to books or science
                        alt={article.titre}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {article.titre || 'Untitled Article'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {article.description || 'No description available.'}
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom>
                            Published on: {new Date(article.publicationDate).toLocaleDateString()}
                        </Typography>
                        {article.authorIds.length > 0 ?
                            <Typography variant="caption" display="block" gutterBottom>
                                Author IDs: {article.authorIds.join(', ')}
                            </Typography>
                            : <Typography variant="caption" display="block" gutterBottom>
                                No authors listed.
                            </Typography>
                        }
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ArticleDisplay;
