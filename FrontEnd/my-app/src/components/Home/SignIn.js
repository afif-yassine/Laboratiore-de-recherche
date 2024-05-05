import * as React from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Avatar, CssBaseline, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled, ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from "../login/interceptor";
import {jwtDecode} from "jwt-decode";

const ImageSide = styled(Paper)(({ theme }) => ({
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: theme.palette.common.white,
}));

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [loginError, setLoginError] = useState('');

    function isAdmin() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {

            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.role && decoded.role.includes('Admin');
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    }
    function isProfesseur() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {

            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.role && decoded.role.includes('Professeur');
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    }
    function isChef() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {

            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.role && decoded.role.includes('Chef');
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { email, password };
        try {
            const response = await axiosInstance.post('http://localhost:8080/api/auth/login', userData);
            const { token } = response.data;
            setToken(token);
            localStorage.setItem('token', token);
            setLoginError('');
            if(isAdmin())
                window.location.href = '/Dashboard';
            if(isProfesseur())
                window.location.href = '/profDashboard';
            if(isChef())
                window.location.href = '/profDashboard';

        } catch (error) {
            console.error("Login failed:", error);
            setLoginError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}>
                    <ImageSide />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 14,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {loginError && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {loginError}
                                </Typography>
                            )}
                            <Grid container>
                                <Grid item>
                                    <RouterLink to="/signup" style={{ textDecoration: 'revert' }}>
                                        <Typography variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Typography>
                                    </RouterLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
