import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../login/interceptor";

const CreateTeam = () => {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://localhost:8080/professeur/allProfPESandPH')
            .then(response => {
                setProfessors(response.data);
            })
            .catch(error => {
                 console.error('Failed to fetch professors:', error);
                // if (error.response && error.response.status === 401) {
                //     localStorage.removeItem('token');
                //     window.location.href = '/login';
                // }
            })
            .finally(() => setLoading(false));
    }, []);

    const formik = useFormik({
        initialValues: {
            nom: '',
            axederecherche: '',
            description: '',
            idchefequipe: '',
        },
        validationSchema: Yup.object({
            nom: Yup.string().required('Required'),
            axederecherche: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            idchefequipe: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            setSubmitting(true);
            axiosInstance.post('http://localhost:8080/equipe/create', values)
                .then(response => {
                    alert('Team created successfully!');
                    console.log(response.data); // Handling the response data
                })
                .catch(error => {
                    console.error('Failed to create team', error);
                    // if (error.response && error.response.status === 401) {
                    //     localStorage.removeItem('token');
                    //     window.location.href = '/login';
                    // }
                })
                .finally(() => setSubmitting(false));
        },
    });

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Create Team</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="nom"
                    name="nom"
                    label="Team Name"
                    value={formik.values.nom}
                    onChange={formik.handleChange}
                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                    helperText={formik.touched.nom && formik.errors.nom}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="axederecherche"
                    name="axederecherche"
                    label="Research Axis"
                    value={formik.values.axederecherche}
                    onChange={formik.handleChange}
                    error={formik.touched.axederecherche && Boolean(formik.errors.axederecherche)}
                    helperText={formik.touched.axederecherche && formik.errors.axederecherche}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    select
                    id="idchefequipe"
                    name="idchefequipe"
                    label="Team Leader"
                    value={formik.values.idchefequipe}
                    onChange={formik.handleChange}
                    //error={formik.touched.idchefequipe && Boolean(formik.errors.idchefequipe)}
                    //helperText={formik.touched.idchefequipe && formik.errors.idchefequipe}
                    margin="normal"
                >
                    {professors.map((professor) => (
                        <MenuItem key={professor.id} value={professor.id}>
                            {professor.nom} {professor.prenom}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    sx={{ mt: 3 }}
                >
                    Create Team
                </Button>
            </form>
        </Box>
    );
};

export default CreateTeam;