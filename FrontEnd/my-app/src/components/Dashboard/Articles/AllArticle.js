import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axiosInstance from "../../login/interceptor";
import {jwtDecode} from "jwt-decode"; // Corrected the import

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

const ArticleDisplay = ({ articleId = getID() }) => { // Corrected to call getID() as default
    const [article, setArticle] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfessorDetails();
    }, [articleId]);

    const fetchProfessorDetails = () => {
        setLoading(true);
        axiosInstance.get(`http://localhost:8080/Article/AllArticlesOfDashProf`) // Used articleId
            .then(response => {
                setArticle(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching professor details:', error);
                setError(error.toString());
                setLoading(false);
            });
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center">Error: {error}</Typography>;
    if (!article) return <Typography align="center">No article found</Typography>;

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                {article.map((article) => (
                    <Card key={article.id} sx={{ maxWidth: 600, mx: 'auto', mt: 3, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {article.titre || 'Untitled Article'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {article.description || 'No description available.'}
                            </Typography>
                            <Typography variant="overline" display="block" gutterBottom>
                                Published on: {article.publicationDate}
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
        </Card>
    );
};

export default ArticleDisplay;
