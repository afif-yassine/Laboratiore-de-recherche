import React from 'react';
import { Card, CardContent, CardMedia, Typography, styled } from '@mui/material';

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

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
    paddingBottom: `${theme.spacing(2)}px !important`,
}));

const TeamMemberCard = ({ member, onClick, selected, icon }) => {
    return (
        <StyledCard onClick={() => onClick(member.id)} selected={selected}>
            <CardMedia
                component="img"
                height="140"
                image={member.imageUrl || "https://source.unsplash.com/random/?team"}
                alt={member.nom}
            />
            <StyledCardContent>
                <Typography gutterBottom variant="h5">
                    {member.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {member.axederecherche}
                </Typography>
                <Typography variant="body2">
                    {member.description}
                </Typography>
                {icon}
            </StyledCardContent>
        </StyledCard>
    );
};

export default TeamMemberCard;
