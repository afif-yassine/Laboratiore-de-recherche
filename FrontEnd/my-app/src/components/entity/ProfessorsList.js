import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Avatar, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    marginBottom: theme.spacing(4),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(2),
}));

const InfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
}));

export const ProfessorsList = ({ professors }) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {professors.map((prof) => (
                <Grid item xs={12} sm={6} md={4} key={prof.id}>
                    <StyledCard>
                        <CardContent>
                            <StyledAvatar src={prof.imageUrl || "/images/2.jpg"} alt={`${prof.prenom} ${prof.nom}`} />
                            <InfoBox>
                                <Typography gutterBottom variant="h5" component="div">
                                     {prof.nom.toUpperCase()} {prof.prenom}
                                </Typography>

                                {prof.ischef && (
                                    <Typography variant="body2" color="primary">
                                        chef d'equipe
                                    </Typography>
                                )}

                                <Typography variant="body2" color="text.secondary">
                                    Équipe: {prof.nomEquipe || "Non spécifié"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {prof.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Numéro: {prof.numero}
                                </Typography>
                                {prof.isadmin && (
                                    <Typography variant="body2" color="primary">
                                        Administrateur du laboratoire
                                    </Typography>
                                )}
                            </InfoBox>
                        </CardContent>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProfessorsList;
