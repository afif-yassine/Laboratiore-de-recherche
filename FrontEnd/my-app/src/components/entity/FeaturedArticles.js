import React from 'react';
import {
    Grid, Card, CardMedia, CardContent, Typography, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, IconButton, Link, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoIcon from '@mui/icons-material/Info';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';

function FeaturedArticles({ articles, handleArticleClick, selectedArticle, openDialog,authorDetails, handleCloseDialog }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const getDescriptionPreview = (description) => {
        const maxLength = 100; // Max length of description preview
        return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
    };

    return (
        <>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
                        <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', "&:hover": { transform: "scale(1.05)" } }}
                              onClick={() => handleArticleClick(article)}>
                            <CardMedia
                                component="img"
                                sx={{ height: 160 }}
                                image={`https://source.unsplash.com/random/?science,${article.titre}`}
                                alt="Article Image"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {article.titre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {getDescriptionPreview(article.description)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedArticle && (
                <Dialog fullScreen={fullScreen} open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle>
                        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                            <InfoIcon />
                        </IconButton>
                        {selectedArticle.titre}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom variant="subtitle1">
                            <DescriptionIcon color="action" /> Description: {selectedArticle.description}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <DateRangeIcon color="action" /> Publication Date: {selectedArticle.publicationDate ? new Date(selectedArticle.publicationDate).toLocaleDateString() : "N/A"}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <PeopleIcon color="action" /> Authors: {authorDetails.map(author => `${author.prenom} ${author.nom}`).join(', ')}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            <PictureAsPdfIcon color="action" /> PDF: {selectedArticle.pdf ? "Available" : "Not available"}
                        </Typography>
                        {selectedArticle.pdf && (
                            <Link href={`data:application/pdf;base64,${selectedArticle.pdf}`} download="Article.pdf" underline="none">
                                <Button color="primary" startIcon={<PictureAsPdfIcon />}>
                                    Download PDF
                                </Button>
                            </Link>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary" startIcon={<InfoIcon />}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default FeaturedArticles;
