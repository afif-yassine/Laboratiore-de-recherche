import { useEffect } from 'react';

const HandleLogout = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        // sessionStorage.removeItem('token');

        // Redirect to login page or home page as needed
        window.location.href = '/login';
    }, []); // The empty array ensures this effect runs once on mount

    return null; // This component doesn't render anything
};

export default HandleLogout;
