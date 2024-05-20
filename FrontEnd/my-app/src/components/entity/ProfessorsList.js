import React from 'react';
import { Grid } from '@mui/material';
import MemberCard from './MemberCard';

const ProfessorsList = ({ professors, handleTeamClick, selectedTeamId }) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {professors.map((prof) => (
                <Grid item xs={12} sm={6} md={4} key={prof.id}>
                    <MemberCard
                        member={prof}
                        onClick={handleTeamClick}
                        selected={prof.id === selectedTeamId}
                        icon={null} // No additional icon for professors
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProfessorsList;
