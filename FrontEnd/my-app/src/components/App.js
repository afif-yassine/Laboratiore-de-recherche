// App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme'; // Correct the import path to theme.js

// Component imports
import TeamPage from './Home/TeamPage';
import Header from './common/Header'; // Correct the import path to Header.js
import Footer from './common/Footer';
import AboutUs from './Home/AboutUs'; // Correct the import path to AboutUs.js
import ContactUs  from './Home/ContactUs'; // Correct the import path to ContactUs.js
import RegistrationForm  from './Home/RegistrationForm'; // Correct the import path to ContactUs.js
import SignIn  from './Home/SignIn';
import Dashboard from "./Dashboard/Dashboard";
import ProfDashboard from "./ProfDashboard/ProfDashboard";
import {jwtDecode} from "jwt-decode";




function App() {
    const isAuthenticated = localStorage.getItem('token');
    // TO DO use http cookie instead of local storage
    // get roles from token,
    // menu for each role
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
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header /> {/* Header will appear on all pages */}
                <Routes>
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/team" element={<TeamPage />} /> {/* Add this line */}
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/signup" element={<RegistrationForm />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/dashboard" element={isAdmin() ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/profDashboard" element={(isProfesseur() || isChef()) ? <ProfDashboard /> : <Navigate to="/login" />} />
                    {/* Add additional routes for other pages */}
                </Routes>
                <Footer />
                {/* Place other components that should render on all pages here */}
            </Router>
        </ThemeProvider>
    );
}

export default App;
