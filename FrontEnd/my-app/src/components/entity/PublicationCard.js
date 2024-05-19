// src/components/PublicationCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './PublicationCard.css';

const PublicationCard = ({ publication }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={`data:image/png;base64,${publication.photoBase64}`}
                alt="Publication"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {publication.local}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {publication.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {publication.datePublished}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PublicationCard;
