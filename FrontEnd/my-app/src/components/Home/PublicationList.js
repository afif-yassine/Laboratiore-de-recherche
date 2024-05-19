// src/components/PublicationList.js
import React, { useEffect, useState } from 'react';
import PublicationCard from '../entity/PublicationCard';
import { Grid, Container, Typography } from '@mui/material';
import axiosInstance from "../login/interceptor";

const API_URL = 'http://localhost:8080/publications/getAll';

 const getAllPublications = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching publications', error);
        throw error;
    }
};

const PublicationList = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getAllPublications();
                setPublications(data);
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };

        fetchPublications();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Laboratoire Recherche Informatique
            </Typography>
            <Grid container spacing={3}>
                {publications.map((publication) => (
                    <Grid item xs={12} sm={6} md={4} key={publication.id}>
                        <PublicationCard publication={publication} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PublicationList;
