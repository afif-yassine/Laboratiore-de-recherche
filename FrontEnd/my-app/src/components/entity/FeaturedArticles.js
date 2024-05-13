import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Collapse } from '@mui/material';

const FeaturedArticles = ({ articles }) => {
    const [expandedId, setExpandedId] = useState(null);

    const handleExpandClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const isExpanded = (id) => {
        return expandedId === id;
    };

    const truncate = (str, num) => {
        if (str.length <= num) return str;
        return str.slice(0, num) + '...';
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" align="left" color="text.primary" gutterBottom>
                Featured Articles
            </Typography>
            <Grid container spacing={4}>
                {articles.map((article) => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
                        <Card raised sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 140 }}
                                image={article.pdfUrl || 'https://source.unsplash.com/random/?science'}
                                alt={article.titre}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {article.titre}
                                </Typography>
                                <Typography>
                                    {isExpanded(article.id) ? article.description : truncate(article.description, 100)}
                                </Typography>
                                <Collapse in={isExpanded(article.id)} timeout="auto" unmountOnExit>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        DOI: {article.doi}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Publisher: {article.publisher ? article.publisher : "N/A"}
                                    </Typography>
                                    {article.pdfUrl && (
                                        <Button component="a" href={article.pdfUrl} target="_blank" size="small">
                                            View PDF
                                        </Button>
                                    )}
                                </Collapse>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleExpandClick(article.id)}>
                                    {isExpanded(article.id) ? 'Less' : 'View More'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeaturedArticles;
