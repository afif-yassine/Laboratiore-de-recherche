import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme/theme"; // Adjusted import path for theme

// Corrected component imports
import TeamPage from './Home/TeamPage';
import Header from './common/Header';
import Footer from './common/Footer';
import AboutUs from './Home/AboutUs';
import ContactUs from './Home/ContactUs';
import RegistrationForm from './Home/RegistrationForm';
import SignIn from './Home/SignIn';
import Dashboard from "./Dashboard/Dashboard";
import ProfDashboard from "./ProfDashboard/ProfDashboard";
import {jwtDecode} from "jwt-decode";
import DoctorantDashboard from "./DoctorantDashboard/DoctorantDashboard";
import ProductionScientifique from "./Home/ProductionScientifique"; // Corrected import statement
import PublicationList from "./Home/Actualite";

function App() {
    //const isAuthenticated = localStorage.getItem('token');
    // Consider using an HTTP cookie instead of local storage

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

    function isDoctorant() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {

            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.role && decoded.role.includes('Doctorant');
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

    // Define other role checks here

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header /> {/* Header will appear on all pages */}
                <Routes>
                    <Route path="/" element={<Navigate replace to="/about-us" />} /> {/* Redirects root to About Us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/productionScientifique" element={<ProductionScientifique />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/news" element={<PublicationList />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/signup" element={<RegistrationForm />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/dashboard" element={isAdmin() ? <Dashboard /> : <Navigate replace to="/login" />} />
                    <Route path="/doctorantDashboard" element={isDoctorant() ? <DoctorantDashboard /> : <Navigate replace to="/login" />} />
                    <Route path="/profDashboard" element={(isProfesseur() || isChef()) ? <ProfDashboard /> : <Navigate replace to="/login" />} />
                    {/* Define additional routes if necessary */}
                </Routes>
                <Footer />
                {/* Place other components that should render on all pages here */}
            </Router>
        </ThemeProvider>
    );
}

export default App;