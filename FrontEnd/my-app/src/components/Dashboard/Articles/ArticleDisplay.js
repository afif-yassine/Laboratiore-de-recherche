import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../login/interceptor";

function getID() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}

const ArticleDisplay = ({ articleId = getID() }) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPDF, setNewPDF] = useState(null);

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

    const handleOpenEditDialog = (article) => {
        setCurrentArticle(article);
        setNewTitle(article.titre);
        setNewDescription(article.description);
        setEditDialogOpen(true);
    };

    const handleUpdateArticle = () => {
        const formData = new FormData();
        formData.append("id", currentArticle.id);
        formData.append("titre", newTitle);
        formData.append("description", newDescription);
        if (newPDF) formData.append("pdf", newPDF);

        axiosInstance.put('http://localhost:8080/Article/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const updatedArticles = articles.map(art => art.id === response.data.id ? response.data : art);
            setArticles(updatedArticles);
            setEditDialogOpen(false);
        }).catch(error => {
            console.error('Error updating article:', error);
            setError(error.toString());
        });
    };

    const handlePDFUpload = event => {
        setNewPDF(event.target.files[0]);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!articles.length) return <Typography>No articles found</Typography>;

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 3, p: 2 }}>
            <Typography variant="h6" color="primary" sx={{ textAlign: 'center', mt: 1 }}>
                Articles ({articles.length})
            </Typography>
            {articles.map(article => (
                <Card key={article.id} sx={{ mb: 2 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={article.imageUrl || 'https://source.unsplash.com/random/?book,science'}
                        alt={article.titre}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {article.titre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {article.description}
                        </Typography>
                        <IconButton onClick={() => handleOpenEditDialog(article)}>
                            <EditIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}

            {editDialogOpen && (
                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                    <DialogTitle>Edit Article</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Upload PDF
                            <input
                                type="file"
                                hidden
                                onChange={handlePDFUpload}
                            />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdateArticle}>Save</Button>
                        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ArticleDisplay;
