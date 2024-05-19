import React, { useState, useEffect } from 'react';
import {
    Box, TextField, Button, Typography, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton, CircularProgress
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axiosInstance from '../../login/interceptor';

const statuses = ['PA', 'PES', 'PH', 'Treasury'];

const ChangeProfessorRole = () => {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editedProfessor, setEditedProfessor] = useState({});

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/professeur/all');
            setProfessors(response.data);
        } catch (error) {
            console.error('Failed to fetch professors', error);
        }
        setLoading(false);
    };

    const handleEdit = (index) => {
        setEditedProfessor({ ...professors[index] });
        setEditIndex(index);
    };

    const handleCancel = () => {
        setEditIndex(-1);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.put('/professeur/updateInfo', editedProfessor);
            const updatedProfessors = [...professors];
            updatedProfessors[editIndex] = response.data;
            setProfessors(updatedProfessors);
            setEditIndex(-1);
        } catch (error) {
            console.error('Failed to update professor', error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfessor(prev => ({ ...prev, [name]: value }));
    };

    const filteredProfessors = professors.filter(prof =>
        prof.nom.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                fullWidth
                label="Filter by Name"
                variant="outlined"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Is Admin</TableCell>
                            <TableCell>Is Chef</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProfessors.map((prof, index) => (
                            <TableRow key={prof.id}>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            value={editedProfessor.nom}
                                            onChange={handleChange}
                                            name="nom"
                                        />
                                    ) : prof.nom}
                                </TableCell>
                                <TableCell>{prof.email}</TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            select
                                            value={editedProfessor.status}
                                            onChange={handleChange}
                                            name="status"
                                            sx={{ minWidth: 100 }}
                                        >
                                            {statuses.map(status => (
                                                <MenuItem key={status} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : prof.status}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            select
                                            value={editedProfessor.isadmin}
                                            onChange={handleChange}
                                            name="isadmin"
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </TextField>
                                    ) : prof.isadmin ? 'Yes' : 'No'}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <TextField
                                            select
                                            value={editedProfessor.ischef}
                                            onChange={handleChange}
                                            name="ischef"
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </TextField>
                                    ) : prof.ischef ? 'Yes' : 'No'}
                                </TableCell>
                                <TableCell>
                                    {editIndex === index ? (
                                        <Box>
                                            <Button onClick={handleSave} color="primary">Save</Button>
                                            <Button onClick={handleCancel} color="error">Cancel</Button>
                                        </Box>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ChangeProfessorRole;
