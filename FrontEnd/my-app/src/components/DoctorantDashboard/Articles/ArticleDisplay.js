import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Snackbar } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from "../../login/interceptor";
import {jwtDecode} from "jwt-decode";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [authorDetails, setAuthorDetails] = useState({});
    const [allAuthors, setAllAuthors] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newAuthors, setNewAuthors] = useState([]);
    const [newPDF, setNewPDF] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        fetchArticles();
        fetchAllAuthors();
    }, [articleId]);

    const fetchArticles = () => {
        setLoading(true);
        axiosInstance.get(`http://localhost:8080/Article/MesArticles/${articleId}`)
            .then(response => {
                const articles = response.data;
                setArticles(articles);
                fetchAuthors(articles);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError(error.toString());
                setLoading(false);
            });
    };

    const fetchAllAuthors = () => {
        axiosInstance.get('http://localhost:8080/professeur/all')
            .then(response => {
                setAllAuthors(response.data);
            })
            .catch(error => {
                console.error('Error fetching all authors:', error);
            });
    };

    const fetchAuthors = async (articles) => {
        const authorDetails = {};
        const authorIds = [...new Set(articles.flatMap(article => article.authorIds))];

        await Promise.all(authorIds.map(async id => {
            try {
                // Assuming there's a way to determine if an ID is for a "professeur" or a "doctorant".
                // This could be an attribute in the article data, or you might have to call both APIs.
                const isProfesseur = true;  // Replace this with the actual check
                let response;
                if (isProfesseur) {
                    response = await axiosInstance.get(`http://localhost:8080/professeur/ProfesseursId2/${id}`);
                } else {
                    response = await axiosInstance.get(`http://localhost:8080/doctorant/${id}`);
                }
                authorDetails[id] = response.data;
            } catch (error) {
                console.error(`Error fetching author ${id}:`, error);
            }
        }));

        setAuthorDetails(authorDetails);
    };

    const handleOpenEditDialog = (article) => {
        setCurrentArticle(article);
        setNewTitle(article.titre);
        setNewDescription(article.description);
        setNewAuthors(article.authorIds.map(id => authorDetails[id]).filter(Boolean));
        setEditDialogOpen(true);
    };

    const handleUpdateArticle = () => {
        const authorIds = newAuthors.map(author => author.id);

        const formData = new FormData();
        formData.append("article", new Blob([JSON.stringify({
            id: currentArticle.id,
            titre: newTitle,
            description: newDescription,
            authorIds: authorIds,
            publisher: currentArticle.publisher
        })], {
            type: "application/json"
        }));
        if (newPDF) formData.append("file", newPDF);

        const headers = newPDF ? { 'Content-Type': 'multipart/form-data' } : {};

        axiosInstance.put('http://localhost:8080/Article/update', formData, { headers })
            .then(response => {
                const updatedArticles = articles.map(art => art.id === response.data.id ? response.data : art);
                setArticles(updatedArticles);
                setEditDialogOpen(false);
                setSnackbarMessage('Article updated successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            })
            .catch(error => {
                console.error('Error updating article:', error);
                setSnackbarMessage('Failed to update article.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    };

    const handlePDFUpload = event => {
        setNewPDF(event.target.files[0]);
    };

    const handleAuthorsChange = (event, newValue) => {
        setNewAuthors(newValue);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
                        <Typography variant="body2" color="text.secondary">
                            Authors: {article.authorIds.map(id => authorDetails[id]?.name).join(', ')}
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
                        <Autocomplete
                            multiple
                            options={allAuthors}
                            getOptionLabel={(option) => option.nom}
                            value={newAuthors}
                            onChange={handleAuthorsChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Authors"
                                    placeholder="Select authors"
                                />
                            )}
                            sx={{ mt: 2, mb: 2 }}
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
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ArticleDisplay;
