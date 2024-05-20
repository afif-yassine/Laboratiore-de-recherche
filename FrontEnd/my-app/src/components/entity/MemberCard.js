import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme, selected }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    transition: '0.3s',
    backgroundColor: selected ? theme.palette.action.selected : '',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[5],
    },
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

const MemberCard = ({ member, onClick, selected, icon }) => {
    return (
        <StyledCard >
            <CardContent>
                <StyledAvatar src={process.env.PUBLIC_URL + '/images/profile.png' || "https://source.unsplash.com/random/?person"} alt={`${member.prenom} ${member.nom}`} />
                <InfoBox>
                    <Typography gutterBottom variant="h5" component="div">
                        {member.nom.toUpperCase()} {member.prenom}
                    </Typography>
                    {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
                    {member.ischef && (
                        <Typography variant="body2" color="primary">
                            Chef d'équipe
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        Équipe: {member.nomEquipe || "Non spécifié"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Email: {member.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Numéro: {member.numero}
                    </Typography>
                    {member.isadmin && (
                        <Typography variant="body2" color="primary">
                            Administrateur du laboratoire
                        </Typography>
                    )}
                </InfoBox>
            </CardContent>
        </StyledCard>
    );
};

export default MemberCard;
