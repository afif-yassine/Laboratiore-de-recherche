import React from 'react';
import { Grid, FormControl, InputLabel, Select, OutlinedInput, MenuItem, TextField } from '@mui/material';

function FilterControls({ equipes, professeurs, selectedEquipe, selectedProfesseur, titreFilter, handleFilterChange }) {
    return (
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Filter by Team</InputLabel>
                    <Select
                        value={selectedEquipe}
                        onChange={(e) => handleFilterChange('equipe', e.target.value)}
                        input={<OutlinedInput label="Filter by Team" />}
                    >
                        {equipes.map(equipe => (
                            <MenuItem key={equipe.id} value={equipe.id}>{equipe.nom}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Filter by Professor</InputLabel>
                    <Select
                        value={selectedProfesseur}
                        onChange={(e) => handleFilterChange('professeur', e.target.value)}
                        input={<OutlinedInput label="Filter by Professor" />}
                    >
                        {professeurs.map(prof => (
                            <MenuItem key={prof.id} value={prof.id}>{`${prof.nom} ${prof.prenom}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Filter by Title"
                    value={titreFilter}
                    onChange={(e) => handleFilterChange('titre', e.target.value)}
                />
            </Grid>
        </Grid>
    );
}

export default FilterControls;
