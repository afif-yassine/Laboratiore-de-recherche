import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axiosInstance from "../../login/interceptor";

const FalseActiveArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/admin/NoActiveArticle')
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch inactive articles:', error);
                setError('Failed to fetch articles');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Inactive Articles
            </Typography>
            <List>
                {articles.length > 0 ? articles.map((article, index) => (
                    <ListItem key={index} divider>
                        <ListItemText primary={article.title} secondary={`ID: ${article.id} - Published on: ${new Date(article.publicationDate).toLocaleDateString()}`} />
                    </ListItem>
                )) : (
                    <Typography variant="subtitle1" sx={{ margin: 2 }}>
                        No inactive articles found.
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default FalseActiveArticles;
