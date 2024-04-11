// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme'; // Correct the import path to theme.js

// Component imports
import TeamPage from './Home/TeamPage';
import Header from './common/Header'; // Correct the import path to Header.js
import Footer from './common/Footer';
import AboutUs from './Home/AboutUs'; // Correct the import path to AboutUs.js
import ContactUs  from './Home/ContactUs'; // Correct the import path to ContactUs.js
import RegistrationForm  from './Home/RegistrationForm'; // Correct the import path to ContactUs.js
import SignUp  from './Home/SignUp';
import Dashboard from "./Dashboard/Dashboard";
import ProfDashboard from "./ProfDashboard/ProfDashboard";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header /> {/* Header will appear on all pages */}
                <Routes>
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/team" element={<TeamPage />} /> {/* Add this line */}
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/login" element={<RegistrationForm />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/ProfDashboard" element={<ProfDashboard />} />
                    {/* Add additional routes for other pages */}
                </Routes>
                <Footer />
                {/* Place other components that should render on all pages here */}
            </Router>
        </ThemeProvider>
    );
}

export default App;
